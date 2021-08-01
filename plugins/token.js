const jwt = require("jsonwebtoken");
const util = require("util");
const verify = util.promisify(jwt.verify);

module.exports = async (ctx, next) => {
  // 获取jwt
  const token = "Bearer " + ctx.header["user-token"];
  if (!!token) {
    try {
      // 解密payload，获取用户名和ID
      let payload = await verify(token.split(" ")[1], "student");
      ctx.user = payload;
    } catch (err) {
      ctx.user = null;
    }
  } else {
    ctx.user = null;
  }

  // ctx.user = {
  //   code: 666,
  //   openid: "oMwDb4qtWHhgZtpsYqBPwIOr-KMo",
  //   id: "5d67d3e1b5a9a69b5bf0c4e2",
  //   classId: "web004"
  // };

  await next();
};
