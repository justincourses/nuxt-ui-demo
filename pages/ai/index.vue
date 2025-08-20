<template>
  <div class="container mx-auto p-6 max-w-4xl">
    <h1 class="text-3xl font-bold mb-6">AI Chat Demo (Vercel AI SDK)</h1>

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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="openai/gpt-oss-120b:free">GPT OSS 120B (Free)</option>
                <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="openai/gpt-4">GPT-4</option>
              </select>
            </div>

            <div>
              <label for="responseType" class="block text-sm font-medium mb-2">
                响应类型：
              </label>
              <select
                id="responseType"
                v-model="responseType"
                class="w-full p-3 border rounded-lg"
              >
                <option value="normal">普通响应</option>
                <option value="stream">流式响应</option>
              </select>
            </div>
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
      <div v-if="response || streamingContent || error" class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-4">AI 回复</h2>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p class="text-red-800">错误: {{ error }}</p>
        </div>

        <!-- 流式响应显示 -->
        <div v-if="streamingContent" class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="font-medium mb-2">AI 实时回复：</h3>
            <p class="whitespace-pre-wrap">{{ streamingContent }}</p>
            <div v-if="loading" class="mt-2">
              <span class="text-sm text-gray-500">正在生成...</span>
              <div class="animate-pulse inline-block ml-2">▋</div>
            </div>
          </div>
        </div>

        <!-- 普通响应显示 -->
        <div v-if="response && !streamingContent" class="space-y-4">
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
const responseType = ref('normal')
const loading = ref(false)
const response = ref(null)
const streamingContent = ref('')
const error = ref(null)

const sendMessage = async () => {
  if (!prompt.value.trim()) return

  loading.value = true
  error.value = null
  response.value = null
  streamingContent.value = ''

  try {
    if (responseType.value === 'stream') {
      // 流式响应
      const response = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt.value,
          model: selectedModel.value
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') {
                loading.value = false
                return
              }

              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content
                if (content) {
                  streamingContent.value += content
                }
              } catch (e) {
                // 忽略解析错误，继续处理下一行
              }
            }
          }
        }
      }
    } else {
      // 普通响应
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
    }
  } catch (err) {
    error.value = err.data?.message || err.message || '请求失败'
  } finally {
    loading.value = false
  }
}
</script>
