<script setup lang="ts">
interface ExchangeRateResponse {
  provider: string
  WARNING_UPGRADE_TO_V6: string
  terms: string
  base: string
  date: string
  time_last_updated: number
  rates: Record<string, number>
}

const supportedCurrencies = [
  { value: 'CNY', label: '人民币 (CNY)' },
  { value: 'JPY', label: '日元 (JPY)' },
  { value: 'USD', label: '美元 (USD)' }
]

const fromCurrency = ref('JPY')
const toCurrency = ref('CNY')
const amount = ref(1000)
const exchangeData = ref<ExchangeRateResponse | null>(null)
const isLoading = ref(false)
const hasRequested = ref(false)
const errorMessage = ref('')

const convertedAmount = computed(() => {
  if (!exchangeData.value || !amount.value) {
    return 0
  }
  const rate = exchangeData.value.rates[toCurrency.value]
  if (rate === undefined) {
    return 0
  }
  return (amount.value * rate).toFixed(4)
})

const fetchExchangeRate = async () => {
  if (!fromCurrency.value || !toCurrency.value) {
    return
  }

  isLoading.value = true
  hasRequested.value = false
  errorMessage.value = ''

  try {
    exchangeData.value = await $fetch('/api/exchangerate', {
      query: {
        base: fromCurrency.value
      }
    })
    hasRequested.value = true
  } catch (error) {
    console.error('汇率API请求失败:', error)
    errorMessage.value = '获取汇率数据失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

// 监听货币变化，自动重新获取汇率
watch([fromCurrency], () => {
  if (hasRequested.value) {
    fetchExchangeRate()
  }
})

// 页面加载时自动获取默认汇率
onMounted(() => {
  fetchExchangeRate()
})
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- 汇率转换表单 -->
    <UCard class="shadow-lg mb-6">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-coins" class="text-primary text-xl" />
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            汇率转换
          </h2>
        </div>
      </template>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              当前货币
            </label>
            <select
              v-model="fromCurrency"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">请选择当前货币</option>
              <option
                v-for="currency in supportedCurrencies"
                :key="currency.value"
                :value="currency.value"
              >
                {{ currency.label }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              目标货币
            </label>
            <select
              v-model="toCurrency"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">请选择目标货币</option>
              <option
                v-for="currency in supportedCurrencies"
                :key="currency.value"
                :value="currency.value"
              >
                {{ currency.label }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            金额
          </label>
          <input
            v-model="amount"
            type="number"
            placeholder="请输入金额"
            min="0"
            step="0.01"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
        </div>

        <UButton
          :loading="isLoading"
          :disabled="!amount || amount <= 0"
          size="lg"
          block
          @click="fetchExchangeRate"
        >
          <template #leading>
            <UIcon name="i-lucide-refresh-cw" />
          </template>
          {{ isLoading ? '转换中...' : '转换汇率' }}
        </UButton>
      </div>
    </UCard>

    <!-- 错误提示 -->
    <UAlert
      v-if="errorMessage"
      color="error"
      variant="soft"
      :description="errorMessage"
      :close-button="{ variant: 'link', color: 'gray', size: 'xs' }"
      class="mb-6"
      @close="errorMessage = ''"
    />

    <!-- 转换结果展示 -->
    <div v-if="hasRequested && exchangeData && !errorMessage" class="space-y-6">
      <!-- 主要转换结果 -->
      <UCard class="shadow-lg">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-calculator" class="text-primary text-xl" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              转换结果
            </h3>
          </div>
        </template>

        <div class="text-center py-8">
          <div class="space-y-4">
            <div class="flex items-center justify-center gap-4">
              <div class="text-center">
                <p class="text-sm text-gray-600 dark:text-gray-400">原金额</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ amount }} {{ fromCurrency }}
                </p>
              </div>
              <UIcon name="i-lucide-arrow-right" class="text-2xl text-gray-400" />
              <div class="text-center">
                <p class="text-sm text-gray-600 dark:text-gray-400">转换后</p>
                <p class="text-2xl font-bold text-primary">
                  {{ convertedAmount }} {{ toCurrency }}
                </p>
              </div>
            </div>

            <div class="text-sm text-gray-600 dark:text-gray-400">
              <p>汇率: 1 {{ fromCurrency }} = {{ exchangeData.rates[toCurrency] }} {{ toCurrency }}</p>
              <p>更新时间: {{ new Date(exchangeData.time_last_updated * 1000).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- 所有汇率信息 -->
      <UCard class="shadow-lg">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-trending-up" class="text-green-500 text-xl" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ fromCurrency }} 对主要货币汇率
            </h3>
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="currency in supportedCurrencies"
            :key="currency.value"
            class="text-center p-4 rounded-lg"
            :class="currency.value === fromCurrency ? 'bg-primary/10' : 'bg-gray-50 dark:bg-gray-800'"
          >
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ currency.label }}</p>
            <p class="font-semibold text-lg">
              {{ currency.value === fromCurrency ? '1.0000' : exchangeData.rates[currency.value]?.toFixed(4) }}
            </p>
          </div>
        </div>
      </UCard>

      <!-- 更多汇率信息 -->
      <UCard class="shadow-lg">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-globe" class="text-blue-500 text-xl" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ fromCurrency }} 对其他货币汇率（热门）
            </h3>
          </div>
        </template>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div
            v-for="[currency, rate] in Object.entries(exchangeData.rates).filter(([curr]) => ['EUR', 'GBP', 'AUD', 'CAD', 'CHF', 'SGD', 'HKD', 'KRW'].includes(curr)).slice(0, 8)"
            :key="currency"
            class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <p class="text-gray-600 dark:text-gray-400">{{ currency }}</p>
            <p class="font-semibold">{{ rate.toFixed(4) }}</p>
          </div>
        </div>
      </UCard>

      <!-- 数据来源信息 -->
      <UCard class="shadow-lg">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-info" class="text-gray-500 text-xl" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              数据信息
            </h3>
          </div>
        </template>

        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p><strong>基准货币:</strong> {{ exchangeData.base }}</p>
          <p><strong>更新日期:</strong> {{ exchangeData.date }}</p>
          <p><strong>数据提供商:</strong> <a :href="exchangeData.provider" target="_blank" class="text-primary hover:underline">{{ exchangeData.provider }}</a></p>
          <p><strong>服务条款:</strong> <a :href="exchangeData.terms" target="_blank" class="text-primary hover:underline">查看条款</a></p>
        </div>
      </UCard>

      <!-- 原始数据 -->
      <UAccordion
        :items="[{
          label: '查看完整汇率数据 JSON',
          icon: 'i-lucide-code',
          slot: 'raw-data'
        }]"
        variant="soft"
      >
        <template #raw-data>
          <pre class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-sm overflow-x-auto">
            <code>{{ JSON.stringify(exchangeData, null, 2) }}</code>
          </pre>
        </template>
      </UAccordion>
    </div>

    <!-- 空状态提示 -->
    <UCard v-else-if="!hasRequested && !isLoading" class="shadow-lg">
      <div class="text-center py-8">
        <UIcon name="i-lucide-coins" class="text-4xl text-gray-400 mb-4" />
        <p class="text-gray-500 dark:text-gray-400">
          选择货币并输入金额进行汇率转换
        </p>
      </div>
    </UCard>
  </div>
</template>
