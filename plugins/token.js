const jwt = require("jsonwebtoken");
const util = require("util");
const verify = util.promisify(jwt.verify);

module.exports = async (ctx, next) => {
  // 获取jwt
  let tokenStr = ctx.header["user-token"];
  // const token = "Bearer " + tokenStr;
  // if (!!tokenStr) {
  //   // 解密payload，获取用户名和ID
  //   let payload = await verify(token.split(" ")[1], "nongye");
  //   ctx.user = payload;
  // } else {
  //   // 没带token,使用的是默认的token
  //   ctx.user = {
  //     cTime: 1628840664201,
  //     id: "475c0ea0fc0a",
  //     phone: "13800000000",
  //   };
  // }
  if (tokenStr) {
    await next();
  } else {
    ctx.body = {
      code: 602,
      msg:'token存在'
    }
  }
};
