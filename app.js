const Koa = require("koa");
const app = new Koa();
require("./utils/config");
const router = require("./router/index");
const views = require("koa-views");
const serv = require("koa-static");
const koaBody = require("koa-body");
const path = require("path");

app.use(
  koaBody({
    formLimit: "1mb",
    multipart: true, // 允许上传多个文件
    formidable: {
      maxFieldsSize: 200 * 1024 * 1024, // 文件大小
      keepExtensions: true // 保存图片的扩展名
    }
  })
);

// 中间件
app.use(require("./plugins/cros"));
// app.use(require("./plugins/token"));
app.use(require("./plugins/params"));
app.use(require("./plugins/checkAttr"));

// 设置模版引擎
app.use(
  views(path.join(__dirname, "views"), {
    map: {
      html: "underscore"
    }
  })
);

app.use(serv(__dirname + "/public"));

// 初始化路由
router.initRouter(app);
// let { PORT, NODE_ENV } = process.env;
let PORT = 3007;
app.listen(PORT);
console.log(`服务已启动，在 http://localhost:${PORT}/`);
