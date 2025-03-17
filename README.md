# Switch to Obsidian

一个VSCode插件，允许你通过快捷键快速从VSCode跳转到Obsidian并打开相同的文件，光标位置也会保持一致。

## 功能

- 通过快捷键从VSCode跳转到Obsidian
- 在Obsidian中打开当前正在VSCode中编辑的文件
- 保持光标位置一致，方便继续编辑
- 支持Windows、macOS和Linux系统

## 安装

### 从VSCode扩展市场安装

1. 打开VSCode
2. 转到扩展视图（`Ctrl+Shift+X` 或 `Cmd+Shift+X`）
3. 搜索 "Switch to Obsidian"
4. 点击安装

### 手动安装

1. 下载最新的 `.vsix` 文件
2. 在VSCode中，转到扩展视图
3. 点击视图右上角的 `...` 按钮
4. 选择 "从VSIX安装..."
5. 选择下载的 `.vsix` 文件

## 配置

首次使用时，你需要配置Obsidian仓库的本地路径：

1. 打开VSCode设置（`Ctrl+,` 或 `Cmd+,`）
2. 搜索 "switch2obsidian"
3. 在 "Obsidian仓库的本地路径" 字段中输入你的Obsidian仓库的完整路径
   - 例如：`C:\Users\YourName\Documents\ObsidianVault` 或 `/Users/YourName/Documents/ObsidianVault`

## 使用方法

1. 在VSCode中打开一个位于Obsidian仓库内的文件
2. 按下快捷键
3. Obsidian将会打开并导航到相同的文件和光标位置

## 注意事项

- 确保Obsidian已经安装在你的系统上
- 当前编辑的文件必须位于配置的Obsidian仓库路径内
- 如果Obsidian已经运行，插件会在现有窗口中打开文件；如果没有运行，插件会启动Obsidian

## 问题反馈

如果你遇到任何问题或有改进建议，请在GitHub仓库中提交issue。

## 许可证

MIT
