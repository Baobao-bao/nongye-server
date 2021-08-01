module.exports = async (ctx, next) => {
      ctx.params = {
        ...ctx.request.body,
        ...ctx.query
      };
      await next();
  };
  