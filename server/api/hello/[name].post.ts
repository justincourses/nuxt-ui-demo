export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const query = getQuery(event);
  const name = getRouterParam(event, "name");

  const detail = { hello: 'KFC' }

  if (name?.startsWith('M')) {
    detail.hello = 'McDondald'
  }

  return {
    hello: detail.hello,
    object: {
      name,
    },
    query,
    body,
  };
});
