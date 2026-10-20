# 个人成长与人生指南 V2

这是一个可直接发布到 GitHub Pages 的静态网站，面向零基础用户，无需安装依赖或运行构建命令。

## 文件
- `index.html`：页面内容和结构
- `style.css`：排版、配色、桌面和手机端布局
- `script.js`：目录、滚动进度、全文搜索、高亮、暗色模式和手机目录菜单

## 先在电脑上预览
1. 将 ZIP 压缩包解压。
2. 打开文件夹 `my-growth-guide-v2`。
3. 双击 `index.html`，用浏览器打开。搜索、目录和主题切换可以在本地预览。
4. 网站使用系统字体作为后备字体；部分环境会尝试加载 Google Fonts。网络不可用时仍可正常阅读。

## 发布到 GitHub Pages
1. 登录 https://github.com/
2. 打开之前创建的 `my-growth-guide` 仓库。
3. 在仓库的 `Code` 页面，点击 `Add file` → `Upload files`。
4. 将本文件夹里的 **三个文件** `index.html`、`style.css`、`script.js` 一起拖进上传区域。不要只上传 HTML，否则样式和功能脚本不会加载。
5. 点击 `Commit changes` 保存。若仓库里已有同名文件，确认覆盖/提交即可。
6. 点击仓库顶部 `Settings` → 左侧 `Pages`。
7. 在 `Build and deployment` 中，`Source` 选择 `Deploy from a branch`。
8. `Branch` 选择 `main`，文件夹选择 `/(root)`，点击 `Save`。
9. 等待一到几分钟，在 Pages 页面打开显示的网站地址。仓库名为 `my-growth-guide` 时，网址通常形如：
   `https://你的GitHub用户名.github.io/my-growth-guide/`

## 更新内容
- 修改章节：编辑 `index.html` 里对应的 `<article class="chapter"...>` 内容。
- 修改样式：编辑 `style.css`。
- 修改交互：编辑 `script.js`。
- 不会写代码也没关系：可以把文件内容或需求发给 AI，让 AI 改好后再上传覆盖。

## 注意
- GitHub Pages 上的网站默认是公开可访问的，不要放个人敏感信息。
- 当前为可扩展的示例内容，建议逐步替换成自己的真实笔记、经验和案例。
