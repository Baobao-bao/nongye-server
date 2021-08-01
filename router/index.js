const Router = require("koa-router");
const home = require("../src/home/homeService");
const getRoutes = require("./getRoutes");
const moduleRoutes = getRoutes();
const routes = [
  ...moduleRoutes,
  {
    path: "/",
    name: "首页",
    service: home["index"]
  }
];

function initRouter(app) {
  let router;
  routes.forEach(route => {
    // 父路由有service时就使用router生成接口
    if (route.service) {
      router = new Router();
      router.all(route.path, route.service);
      app.use(router.routes());
    }
    if (route.children) {
      router = new Router({
        prefix: route.path
      });
      // 生成子路由
      let children = route.children;
      let serviceObj;
      try {
        // 改变路径找不到
        let servicePath = `../src${route.path}/service`;
        serviceObj = require(servicePath);
      } catch (error) {
        console.log("error", error);
      }
      children.forEach(item => {
        // .bind(serviceObj)不让this发生改变
        router.all(item.path, item.service.bind(serviceObj));
        app.use(router.routes());
      });
    }
  });
}

module.exports = {
  routes,
  initRouter
};
