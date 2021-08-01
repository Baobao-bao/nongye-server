module.exports = async (ctx, next) => {
  // 跨域设置
  ctx.set("Access-Control-Allow-Origin", "*");
  // 请求头设置
  ctx.set(
    "Access-Control-Allow-Headers",
    `Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild,x-token,user-token`
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  // 一天内不会发送options请求
  // ctx.set('Access-Control-Max-Age', '86400');
  // 预请求处理
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
};
