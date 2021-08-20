const jwt = require("jsonwebtoken");
const util = require("util");
const verify = util.promisify(jwt.verify);

module.exports = async (ctx, next) => {
  // 获取jwt
  const token = "Bearer " + ctx.header["user-token"];
  if (!!token) {
    try {
      // 解密payload，获取用户名和ID
      let payload = await verify(token.split(" ")[1], "villa");
      ctx.user = payload;
    } catch (err) {
      ctx.user = null;
    }
  } else {
    ctx.user = null;
  }

  // ctx.user = {
  //   createTime: 1628840664201,
  //   id: "475c0ea0fc0a",
  //   phone: "13800000000",
  //   smsCode: 7221,
  //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3NWMwZWEwZmMwYSIsImNyZWF0ZVRpbWUiOjE2Mjg4NDA2NjQyMDEsInVwZGF0ZVRpbWUiOjE2Mjg4NDA2NjQyMDEsInBob25lIjoiMTM4MDAwMDAwMDAiLCJzbXNDb2RlIjo3MjIxLCJpYXQiOjE2Mjk0Njc1NzMsImV4cCI6MTYzMzA2NzU3M30.-eV5utWIcRw2qv8N7sOpguGzjXs4r7wP2FAmZoe5wLs",
  //   updateTime: 1628840664201,
  // };

  await next();
};
