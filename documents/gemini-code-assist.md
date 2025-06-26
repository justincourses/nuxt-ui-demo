# Gemini 编程助手信息整理

## 一、Gemini CLI

**项目地址**：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

### 主要功能
- 在终端中直接调用 Gemini AI，支持代码理解、生成、编辑和自动化工作流。
- 支持 1M token 上下文窗口，可处理大型代码库。
- 支持多模态能力（如从 PDF、草图生成应用）。
- 可自动化操作任务，如查询 PR、复杂 rebase。
- 支持扩展工具和 MCP 服务器，集成媒体生成等能力。
- 内置 Google Search grounding 工具。

### 安装与使用
1. **前置条件**：需安装 Node.js 18 及以上版本。
2. **快速启动**：
   - 直接运行：
     ```sh
     npx https://github.com/google-gemini/gemini-cli
     ```
   - 或全局安装：
     ```sh
     npm install -g @google/gemini-cli
     gemini
     ```
3. **认证**：首次运行需用 Google 账号登录，默认有 60 次/分钟、1000 次/天的请求额度。
4. **高级用法**：可在 [Google AI Studio](https://aistudio.google.com/apikey) 获取 API Key，并设置环境变量：
   ```sh
   export GEMINI_API_KEY="YOUR_API_KEY"
   ```

### 编程相关示例
- **探索新代码库**：
  > Describe the main pieces of this system's architecture.
- **代码协作与迁移**：
  > Implement a first draft for GitHub issue #123.
  > Help me migrate this codebase to the latest version of Java. Start with a plan.
- **自动化工作流**：
  > Make a slide deck showing the git history from the last 7 days, grouped by feature and team member.
- **系统交互**：
  > Convert all the images in this directory to png, and rename them to use dates from the exif data.

### 参考文档
- [CLI 命令文档](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md)
- [常见问题与排查](https://github.com/google-gemini/gemini-cli/blob/main/docs/troubleshooting.md)
- [完整文档](https://github.com/google-gemini/gemini-cli/blob/main/docs/index.md)

---

## 二、Gemini Code Assist（VS Code 扩展）

**扩展地址**：[Gemini Code Assist - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Google.geminicodeassist)

### 主要功能
- Gemini AI 驱动的代码辅助。
- 支持自然语言对话，理解上下文，生成代码、解答开发问题。
- 自动代码补全、根据注释生成代码块。
- 自动生成单元测试，提高代码健壮性和测试覆盖率。
- 支持多种编程语言和主流开发场景。
- 支持代码基础设施接口（如 gCloud CLI、KRM、Terraform）。
- 自动化 GitHub 代码评审。
- 响应中包含引用的文档和代码样例。

### 安装方法
- 在 VS Code 中按 `Ctrl+P`，输入：
  ```
  ext install Google.geminicodeassist
  ```
- 或在扩展市场搜索“Gemini Code Assist”安装。

### 编程相关能力
- 代码生成、补全、调试建议。
- 单元测试生成。
- 支持云原生、API 调用、数据查询等多场景。
- 可用于 Firebase、Android Studio、IntelliJ、Google Cloud 等多平台。

### 隐私与安全
- 遵循 [Google 隐私政策](https://policies.google.com/privacy)。
- 支持安全披露流程。

---

> 本文档整理自官方仓库与市场页面，供 Gemini 编程相关能力参考。
