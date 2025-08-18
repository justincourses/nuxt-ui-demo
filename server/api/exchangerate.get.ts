export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const baseCurrency = query.base as string

  // 验证支持的货币类型
  const supportedCurrencies = ['CNY', 'JPY', 'USD']
  if (!baseCurrency || !supportedCurrencies.includes(baseCurrency)) {
    throw createError({
      statusCode: 400,
      statusMessage: '不支持的货币类型，仅支持 CNY、JPY、USD'
    })
  }

  try {
    // 调用第三方汇率 API
    const response = await $fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)

    return response
  } catch (error) {
    console.error('获取汇率数据失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '获取汇率数据失败，请稍后重试'
    })
  }
})
