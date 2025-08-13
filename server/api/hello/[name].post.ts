export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const query = getQuery(event);
  const name = getRouterParam(event, "name");

  const detail = { hello: 'KFC', title: '不是星期四' }

  if (name?.startsWith('M')) {
    detail.hello = 'McDondald'
  }

  if (query.thursday === 'on') {
    detail.title = '是星期四'
  }

  return {
    hello: detail.hello + detail.title,
    object: {
      name,
    },
    query,
    body,
  };
});
