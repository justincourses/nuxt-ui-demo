<script setup lang="ts">
'use client'

interface ApiResponse {
  hello: string
  object: {
    name: string
  }
}

const name = ref('')
const rsp = ref<ApiResponse | null>(null)
const isLoading = ref(false)
const hasRequested = ref(false)
const thursdayEnabled = ref(false)

const fetchData = async () => {
  if (!name.value.trim()) {
    return
  }

  isLoading.value = true
  hasRequested.value = false

  try {
    const queryParam = thursdayEnabled.value ? '?thursday=on' : '?thursday=off'
    rsp.value = await $fetch(
      '/api/hello/' + name.value + queryParam,
      {
        method: 'post',
        body: { test: 123 }
      }
    )
    hasRequested.value = true
  } catch (error) {
    console.error('API 请求失败:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <!-- 输入表单 -->
    <UCard class="shadow-lg mb-6">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-send" class="text-primary text-xl" />
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            发送请求
          </h2>
        </div>
      </template>

      <div class="space-y-4">
        <UFormGroup label="请输入您的姓名" name="name">
          <UInput
            v-model="name"
            placeholder="请输入姓名..."
            size="lg"
            @keydown.enter="fetchData"
          />
        </UFormGroup>

        <UFormGroup label="Thursday 参数设置" name="thursday">
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-calendar" class="text-gray-600 dark:text-gray-400" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Thursday 模式
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ thursdayEnabled ? 'ON' : 'OFF' }}
              </span>
              <USwitch v-model="thursdayEnabled" />
            </div>
          </div>
        </UFormGroup>

        <UButton
          :loading="isLoading"
          :disabled="!name.trim()"
          size="lg"
          block
          @click="fetchData"
        >
          <template #leading>
            <UIcon name="i-lucide-send" />
          </template>
          {{ isLoading ? '发送中...' : '发送请求' }}
        </UButton>
      </div>
    </UCard>

    <!-- 响应数据 -->
    <UCard v-if="hasRequested && rsp" class="shadow-lg">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-server" class="text-primary text-xl" />
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            API 响应数据
          </h2>
        </div>
      </template>

      <div class="space-y-4">
        <!-- 问候信息 -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div class="flex items-center gap-2 mb-2">
            <UIcon name="i-lucide-message-circle" class="text-blue-600" />
            <span class="font-medium text-blue-800 dark:text-blue-200">问候消息</span>
          </div>
          <p class="text-lg text-blue-900 dark:text-blue-100">{{ rsp.hello }}</p>
        </div>

        <!-- 用户信息 -->
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div class="flex items-center gap-2 mb-2">
            <UIcon name="i-lucide-user" class="text-green-600" />
            <span class="font-medium text-green-800 dark:text-green-200">用户信息</span>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-sm text-green-700 dark:text-green-300">姓名:</span>
              <span class="font-medium text-green-900 dark:text-green-100">{{ rsp.object?.name }}</span>
            </div>
          </div>
        </div>

        <!-- 原始数据 -->
        <UAccordion
          :items="[{
            label: '查看原始 JSON 数据',
            icon: 'i-lucide-code',
            slot: 'raw-data'
          }]"
          variant="soft"
        >
          <template #raw-data>
            <pre class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-sm overflow-x-auto">
              <code>{{ JSON.stringify(rsp, null, 2) }}</code>
            </pre>
          </template>
        </UAccordion>
      </div>

      <template #footer>
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>API 调用成功</span>
          <div class="flex items-center gap-1">
            <UIcon name="i-lucide-check-circle" class="text-green-500" />
            <span>状态正常</span>
          </div>
        </div>
      </template>
    </UCard>

    <!-- 空状态提示 -->
    <UCard v-else-if="!hasRequested" class="shadow-lg">
      <div class="text-center py-8">
        <UIcon name="i-lucide-arrow-up" class="text-4xl text-gray-400 mb-4" />
        <p class="text-gray-500 dark:text-gray-400">
          请在上方输入姓名并点击发送按钮来获取数据
        </p>
      </div>
    </UCard>
  </div>
</template>
