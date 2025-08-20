export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 验证请求体
  if (!body.prompt && !body.messages) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing prompt or messages parameter'
    })
  }

  // 从运行时配置获取环境变量
  const config = useRuntimeConfig()
  const apiUrl = config.apiUrl || 'https://openrouter.ai/api/v1'
  const apiKey = config.apiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'API_KEY not configured'
    })
  }

  try {
    // 构建请求体
    const messages = body.messages || [
      {
        role: "user",
        content: body.prompt
      }
    ]

    const requestBody = {
      model: body.model || "openai/gpt-oss-20b:free",
      messages: messages,
      ...body.options // 允许传递其他选项如 temperature, max_tokens 等
    }

    // 调用 AI API
    const response = await $fetch(`${apiUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: requestBody
    })

    return response
  } catch (error: unknown) {
    console.error('AI API request failed:', error)

    // 处理不同类型的错误
    const httpError = error as { statusCode?: number; statusMessage?: string }
    if (httpError.statusCode) {
      throw createError({
        statusCode: httpError.statusCode,
        statusMessage: httpError.statusMessage || 'AI API request failed'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch AI response'
    })
  }
})
