<script setup lang="ts">
interface WeatherLocation {
  name: string
  country: string
  region: string
  lat: string
  lon: string
  timezone_id: string
  localtime: string
  localtime_epoch: number
  utc_offset: string
}

interface WeatherCurrent {
  observation_time: string
  temperature: number
  weather_code: number
  weather_icons: string[]
  weather_descriptions: string[]
  wind_speed: number
  wind_degree: number
  wind_dir: string
  pressure: number
  precip: number
  humidity: number
  cloudcover: number
  feelslike: number
  uv_index: number
  visibility: number
  is_day: string
}

interface WeatherAstro {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: number
}

interface AirQuality {
  co: string
  no2: string
  o3: string
  so2: string
  pm2_5: string
  pm10: string
  'us-epa-index': string
  'gb-defra-index': string
}

interface WeatherResponse {
  request: {
    type: string
    query: string
    language: string
    unit: string
  }
  location: WeatherLocation
  current: WeatherCurrent & {
    astro: WeatherAstro
    air_quality: AirQuality
  }
}

const city = ref('osaka')
const weatherData = ref<WeatherResponse | null>(null)
const isLoading = ref(false)
const hasRequested = ref(false)
const errorMessage = ref('')

const fetchWeatherData = async () => {
  if (!city.value.trim()) {
    return
  }

  isLoading.value = true
  hasRequested.value = false
  errorMessage.value = ''

  try {
    const apiUrl = `http://api.weatherstack.com/current?access_key=aa1149bcdaa84a1b9e55d4cd8084a93d&query=${encodeURIComponent(city.value)}`

    weatherData.value = await $fetch(apiUrl)
    hasRequested.value = true
  } catch (error) {
    console.error('天气API请求失败:', error)
    errorMessage.value = '获取天气数据失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

// 页面加载时自动获取默认城市的天气
onMounted(() => {
  fetchWeatherData()
})
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- 城市搜索表单 -->
    <UCard class="shadow-lg mb-6">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-cloud-sun" class="text-primary text-xl" />
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            天气查询
          </h2>
        </div>
      </template>

      <div class="space-y-4">
        <UFormGroup label="请输入城市名称" name="city">
          <UInput
            v-model="city"
            placeholder="请输入城市名称（如：osaka, New York, Tokyo）..."
            size="lg"
            @keydown.enter="fetchWeatherData"
          />
        </UFormGroup>

        <UButton
          :loading="isLoading"
          :disabled="!city.trim()"
          size="lg"
          block
          @click="fetchWeatherData"
        >
          <template #leading>
            <UIcon name="i-lucide-search" />
          </template>
          {{ isLoading ? '查询中...' : '查询天气' }}
        </UButton>
      </div>
    </UCard>

    <!-- 错误提示 -->
    <UAlert
      v-if="errorMessage"
      color="red"
      variant="soft"
      :description="errorMessage"
      :close-button="{ variant: 'link', color: 'gray', size: 'xs' }"
      class="mb-6"
      @close="errorMessage = ''"
    />

    <!-- 天气数据展示 -->
    <div v-if="hasRequested && weatherData && !errorMessage" class="space-y-6">
      <!-- 主要天气信息 -->
      <UCard class="shadow-lg">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-map-pin" class="text-primary text-xl" />
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ weatherData.location.name }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ weatherData.location.region }}, {{ weatherData.location.country }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600 dark:text-gray-400">当地时间</p>
              <p class="text-sm font-medium">{{ weatherData.location.localtime }}</p>
            </div>
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 当前天气 -->
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <img
                :src="weatherData.current.weather_icons[0]"
                :alt="weatherData.current.weather_descriptions[0]"
                class="w-16 h-16"
              >
              <div>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">
                  {{ weatherData.current.temperature }}°C
                </p>
                <p class="text-lg text-gray-600 dark:text-gray-400">
                  {{ weatherData.current.weather_descriptions[0] }}
                </p>
                <p class="text-sm text-gray-500">
                  体感温度 {{ weatherData.current.feelslike }}°C
                </p>
              </div>
            </div>
          </div>

          <!-- 详细信息 -->
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-wind" class="text-blue-500" />
                <span>风速: {{ weatherData.current.wind_speed }} km/h</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-compass" class="text-blue-500" />
                <span>风向: {{ weatherData.current.wind_dir }}</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-droplets" class="text-blue-500" />
                <span>湿度: {{ weatherData.current.humidity }}%</span>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-gauge" class="text-green-500" />
                <span>气压: {{ weatherData.current.pressure }} mb</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-cloud" class="text-green-500" />
                <span>云量: {{ weatherData.current.cloudcover }}%</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-eye" class="text-green-500" />
                <span>能见度: {{ weatherData.current.visibility }} km</span>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- 日出日落信息 -->
      <UCard v-if="weatherData.current.astro" class="shadow-lg">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-sun" class="text-orange-500 text-xl" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              天文信息
            </h3>
          </div>
        </template>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <UIcon name="i-lucide-sunrise" class="text-orange-500 text-2xl mb-2 mx-auto" />
            <p class="text-sm text-gray-600 dark:text-gray-400">日出</p>
            <p class="font-semibold">{{ weatherData.current.astro.sunrise }}</p>
          </div>
          <div class="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <UIcon name="i-lucide-sunset" class="text-orange-500 text-2xl mb-2 mx-auto" />
            <p class="text-sm text-gray-600 dark:text-gray-400">日落</p>
            <p class="font-semibold">{{ weatherData.current.astro.sunset }}</p>
          </div>
          <div class="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <UIcon name="i-lucide-moon" class="text-blue-500 text-2xl mb-2 mx-auto" />
            <p class="text-sm text-gray-600 dark:text-gray-400">月升</p>
            <p class="font-semibold">{{ weatherData.current.astro.moonrise }}</p>
          </div>
          <div class="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <UIcon name="i-lucide-moon" class="text-blue-500 text-2xl mb-2 mx-auto" />
            <p class="text-sm text-gray-600 dark:text-gray-400">月落</p>
            <p class="font-semibold">{{ weatherData.current.astro.moonset }}</p>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>月相: {{ weatherData.current.astro.moon_phase }}</span>
          <span>|</span>
          <span>月亮照明度: {{ weatherData.current.astro.moon_illumination }}%</span>
        </div>
      </UCard>

      <!-- 空气质量 -->
      <UCard v-if="weatherData.current.air_quality" class="shadow-lg">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-wind" class="text-green-500 text-xl" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              空气质量
            </h3>
          </div>
        </template>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">PM2.5</p>
            <p class="font-semibold text-lg">{{ weatherData.current.air_quality.pm2_5 }}</p>
          </div>
          <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">PM10</p>
            <p class="font-semibold text-lg">{{ weatherData.current.air_quality.pm10 }}</p>
          </div>
          <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">CO</p>
            <p class="font-semibold text-lg">{{ weatherData.current.air_quality.co }}</p>
          </div>
          <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">NO2</p>
            <p class="font-semibold text-lg">{{ weatherData.current.air_quality.no2 }}</p>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>US EPA指数: {{ weatherData.current.air_quality['us-epa-index'] }}</span>
          <span>|</span>
          <span>UK Defra指数: {{ weatherData.current.air_quality['gb-defra-index'] }}</span>
        </div>
      </UCard>

      <!-- 原始数据 -->
      <UAccordion
        :items="[{
          label: '查看完整天气数据 JSON',
          icon: 'i-lucide-code',
          slot: 'raw-data'
        }]"
        variant="soft"
      >
        <template #raw-data>
          <pre class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-sm overflow-x-auto">
            <code>{{ JSON.stringify(weatherData, null, 2) }}</code>
          </pre>
        </template>
      </UAccordion>
    </div>

    <!-- 空状态提示 -->
    <UCard v-else-if="!hasRequested && !isLoading" class="shadow-lg">
      <div class="text-center py-8">
        <UIcon name="i-lucide-cloud-sun" class="text-4xl text-gray-400 mb-4" />
        <p class="text-gray-500 dark:text-gray-400">
          输入城市名称查询当前天气信息
        </p>
      </div>
    </UCard>
  </div>
</template>
