export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const cityQuery = query.query as string

  if (!cityQuery) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing query parameter'
    })
  }

  try {
    const apiUrl = `http://api.weatherstack.com/current?access_key=aa1149bcdaa84a1b9e55d4cd8084a93d&query=${encodeURIComponent(cityQuery)}`

    const weatherData = await $fetch(apiUrl)

    return weatherData
  } catch (error) {
    console.error('Weather API request failed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch weather data'
    })
  }
})
