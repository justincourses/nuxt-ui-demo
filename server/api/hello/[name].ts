export default defineEventHandler((event) => {
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
  };
});
