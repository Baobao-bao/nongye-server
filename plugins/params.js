module.exports = async (ctx, next) => {
      ctx.params = {
        ...ctx.request.body,
        ...ctx.query
      };

      for(let key in ctx.params) {
        if (ctx.params[key] === 'true') {
          ctx.params[key] = true;
        } else if(ctx.params[key] === 'false') {
          ctx.params[key] = false;
        }
      }

      await next();
  };
  