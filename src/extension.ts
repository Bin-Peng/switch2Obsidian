import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  console.log('插件 "switch2obsidian" 已激活');

  // 注册命令
  let disposable = vscode.commands.registerCommand('switch2obsidian.openInObsidian', async () => {
    try {
      // 获取当前编辑器
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('没有打开的文件');
        return;
      }

      // 获取当前文件路径
      const filePath = editor.document.uri.fsPath;
      
      // 获取当前光标位置
      const position = editor.selection.active;
      const line = position.line + 1; // VSCode是0索引，Obsidian是1索引
      const column = position.character + 1;

      // 获取配置的Obsidian仓库路径
      const config = vscode.workspace.getConfiguration('switch2obsidian');
      let vaultPath = config.get<string>('obsidianVaultPath');
      console.log('获取到的仓库路径:', vaultPath);

      // 如果没有配置仓库路径，提示用户配置
      if (!vaultPath || vaultPath.trim() === '') {
        console.log('仓库路径未配置，准备显示提示');
        const result = await vscode.window.showInformationMessage(
          '请先设置Obsidian仓库路径',
          { modal: true },
          '打开设置'
        );
        console.log('用户选择结果:', result);

        if (result === '打开设置') {
          await vscode.commands.executeCommand(
            'workbench.action.openSettings',
            'switch2obsidian.obsidianVaultPath'
          );
        }
        return;
      }

      // 确保路径末尾没有斜杠
      vaultPath = vaultPath.replace(/[\\/]$/, '');

      // 检查文件是否在Obsidian仓库内
      if (!filePath.startsWith(vaultPath)) {
        vscode.window.showErrorMessage('当前文件不在配置的Obsidian仓库路径内');
        return;
      }

      // 检查文件是否存在
      if (!fs.existsSync(filePath)) {
        vscode.window.showErrorMessage('文件不存在');
        return;
      }

      // 计算相对路径
      const relativePath = filePath.substring(vaultPath.length + 1);

      // 构建Obsidian URI
      // 格式: obsidian://open?vault=VaultName&file=FilePath&line=LineNumber&column=ColumnNumber
      const vaultName = path.basename(vaultPath);
      const encodedPath = encodeURIComponent(relativePath);
      const obsidianUri = `obsidian://open?vault=${encodeURIComponent(vaultName)}&file=${encodedPath}&line=${line}&column=${column}`;

      // 打开Obsidian
      const platform = process.platform;
      let openCommand;

      if (platform === 'win32') {
        openCommand = `start "" "${obsidianUri}"`;
      } else if (platform === 'darwin') {
        openCommand = `open "${obsidianUri}"`;
      } else {
        openCommand = `xdg-open "${obsidianUri}"`;
      }

      cp.exec(openCommand, (error) => {
        if (error) {
          vscode.window.showErrorMessage(`无法打开Obsidian: ${error.message}`);
        }
      });

    } catch (error) {
      vscode.window.showErrorMessage(`发生错误: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}