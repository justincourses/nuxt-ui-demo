<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-12">
    <UCard class="w-full max-w-2xl shadow-xl border-0">
      <div class="flex flex-col gap-4 items-center">
        <img src="https://github.com/google-gemini.png" alt="Gemini Logo" class="w-20 h-20 rounded-full shadow mb-2">
        <h1 class="text-3xl font-bold text-indigo-700">Gemini 编程助手</h1>
        <p class="text-gray-600 text-center">
          Gemini CLI 是 Google 推出的 AI 编程助手，支持代码理解、生成、编辑和自动化工作流，助力开发者高效协作与创新。
        </p>
      </div>
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard class="bg-white/80">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-terminal" class="text-indigo-500" />
              <span class="font-semibold">主要功能</span>
            </div>
          </template>
          <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
            <li>终端直接调用 Gemini AI，支持代码理解、生成、编辑</li>
            <li>1M token 上下文，处理大型代码库</li>
            <li>多模态能力（如 PDF、草图生成应用）</li>
            <li>自动化操作任务（如 PR 查询、复杂 rebase）</li>
            <li>支持扩展工具与 MCP 服务器</li>
            <li>内置 Google Search grounding 工具</li>
          </ul>
        </UCard>
        <UCard class="bg-white/80">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-rocket" class="text-indigo-500" />
              <span class="font-semibold">安装与使用</span>
            </div>
          </template>
          <ol class="list-decimal pl-5 text-gray-700 text-sm space-y-1">
            <li>需安装 Node.js 18 及以上</li>
            <li>快速启动：<br>
              <code class="bg-gray-100 px-2 py-1 rounded text-xs">npx https://github.com/google-gemini/gemini-cli</code>
            </li>
            <li>或全局安装：<br>
              <code class="bg-gray-100 px-2 py-1 rounded text-xs">npm install -g @google/gemini-cli</code>
              <br>
              <code class="bg-gray-100 px-2 py-1 rounded text-xs">gemini</code>
            </li>
            <li>首次运行需 Google 账号登录</li>
            <li>可用 API Key 进行高级配置</li>
          </ol>
        </UCard>
      </div>
      <div class="mt-8">
        <UCard class="bg-white/80">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-lightbulb" class="text-indigo-500" />
              <span class="font-semibold">编程场景示例</span>
            </div>
          </template>
          <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
            <li>探索新代码库：<span class="italic text-gray-500">Describe the main pieces of this system's architecture.</span></li>
            <li>代码协作与迁移：<span class="italic text-gray-500">Implement a first draft for GitHub issue #123.</span></li>
            <li>自动化工作流：<span class="italic text-gray-500">Make a slide deck showing the git history from the last 7 days...</span></li>
            <li>系统交互：<span class="italic text-gray-500">Convert all the images in this directory to png...</span></li>
          </ul>
        </UCard>
      </div>
      <div class="mt-8 flex flex-wrap gap-4 justify-center">
        <UButton
          label="项目主页"
          icon="i-simple-icons-github"
          to="https://github.com/google-gemini/gemini-cli"
          target="_blank"
          color="primary"
        />
        <UButton
          label="命令文档"
          icon="i-lucide-book"
          to="https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md"
          target="_blank"
          color="indigo"
        />
        <UButton
          label="常见问题"
          icon="i-lucide-help-circle"
          to="https://github.com/google-gemini/gemini-cli/blob/main/docs/troubleshooting.md"
          target="_blank"
          color="gray"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// ...existing code...
</script>
