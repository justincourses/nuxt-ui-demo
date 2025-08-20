<template>
  <div class="container mx-auto p-6 max-w-4xl">
    <h1 class="text-3xl font-bold mb-6">AI Chat Demo</h1>

    <div class="space-y-4">
      <!-- Input Form -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-4">发送消息给 AI</h2>
        <form class="space-y-4" @submit.prevent="sendMessage">
          <div>
            <label for="prompt" class="block text-sm font-medium mb-2">
              消息内容：
            </label>
            <textarea
              id="prompt"
              v-model="prompt"
              class="w-full p-3 border rounded-lg resize-none"
              rows="4"
              placeholder="输入你想问的问题..."
              required
            />
          </div>

          <div>
            <label for="model" class="block text-sm font-medium mb-2">
              模型选择：
            </label>
            <select
              id="model"
              v-model="selectedModel"
              class="w-full p-3 border rounded-lg"
            >
              <option value="openai/gpt-oss-20b:free">GPT OSS 20B (Free)</option>
              <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="openai/gpt-4">GPT-4</option>
            </select>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {{ loading ? '发送中...' : '发送消息' }}
          </button>
        </form>
      </div>

      <!-- Response Display -->
      <div v-if="response || error" class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-4">AI 回复</h2>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p class="text-red-800">错误: {{ error }}</p>
        </div>

        <div v-if="response" class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="font-medium mb-2">AI 回复内容：</h3>
            <p class="whitespace-pre-wrap">{{ response.choices?.[0]?.message?.content }}</p>
          </div>

          <div class="text-sm text-gray-600">
            <p><strong>模型:</strong> {{ response.model }}</p>
            <p><strong>Token 使用:</strong>
              输入 {{ response.usage?.prompt_tokens }},
              输出 {{ response.usage?.completion_tokens }},
              总计 {{ response.usage?.total_tokens }}
            </p>
          </div>

          <details class="text-sm">
            <summary class="cursor-pointer font-medium">查看完整响应 JSON</summary>
            <pre class="mt-2 bg-gray-100 p-3 rounded overflow-auto">{{ JSON.stringify(response, null, 2) }}</pre>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const prompt = ref('')
const selectedModel = ref('openai/gpt-oss-20b:free')
const loading = ref(false)
const response = ref(null)
const error = ref(null)

const sendMessage = async () => {
  if (!prompt.value.trim()) return

  loading.value = true
  error.value = null
  response.value = null

  try {
    const result = await $fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        prompt: prompt.value,
        model: selectedModel.value
      }
    })

    response.value = result
  } catch (err) {
    error.value = err.data?.message || err.message || '请求失败'
  } finally {
    loading.value = false
  }
}
</script>
