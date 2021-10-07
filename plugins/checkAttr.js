/**
 * 检查参数
 * 需要登录的接口,检查是否已登录
 */

const getRoutes = require("../router/getRoutes");
const routes = getRoutes();
module.exports = async (ctx, next) => {
  let url = ctx.request.url;
  // 匹配父路由
  let fatherRoute = routes.find(route => {
    return url.match(route.path);
  });

  // 匹配子路由
  let route =
    fatherRoute &&
    fatherRoute.children.find(item => {
      return url.match(item.path);
    });

  // 检查需要登录的接口是否带token
  if (route && route.needLogin) {
    if (!ctx.user) {
      ctx.body = {
        code: 603,
        msg: "token不存在或已过期"
      };
      return false;
    }
  } 
  // 检查所需参数是否存在
  if (route) {
    // 把需要校验的字段取出来,放入数组
    let attrs = [];
    for (let key in route.params) {
      console.log(key);
      let value = route.params[key];
      if (value.includes('(必须)')) {
        attrs.push(key);
      }
    }
    let result = checkAttr(attrs, ctx);
    if (result) {
      ctx.body = {
        code: 600,
        msg: result
      };
      return false;
    }
  }
  await next();
};

/**
 * @param {array} attrs 要检查的字段
 * @param {*} ctx
 */
function checkAttr(attrs, ctx) {
  let params = ctx.params;
  let res = attrs.find(attr => {
    return (
      params[attr] === "undefined" ||
      params[attr] === undefined ||
      params[attr] === ""
    );
  });

  return !!res ? `缺少请求参数${res}` : false;
}
