const Vue = require("vue");
const Common = require("../common/commonService");

let template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" name="viewport">
    <link rel="stylesheet" href="/style/index.css"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>{{title}}</title>
</head>
<body>
    <h3 class="title">
    <span>{{title.slice(0,-7)}}服务器接口</span><span style="color:#999;margin-left:5px;font-size:18px;">({{env}})</span>
    </h3>
  <div class="container">
    <ul v-if="route.path!='/' && !route.hidden" class="box" v-for="(route,index) in routes" :key="index">
        <h3>{{route.name}}</h3>
        <li v-if="route.children && !item.hidden" v-for="(item,index) in route.children" :key="index">
            <a target="_blank" :href="route.path+item.path">{{route.path+item.path}}
              <span style="color:#999;">{{item.name}}</span>
            </a> 
            <a target="_blank" :href="handleParams(route,item)" style="color:green;margin-left: 15px;">测试接口</a> 
        </li>
    </ul>
    <ul class="box vsn"> </ul> <ul class="box vsn"> </ul> <ul class="box vsn"> </ul> <ul class="box vsn"> </ul>
  </div>
</body>
</html>`;

const utils = require("../../utils/index");

class Home extends Common {
  constructor() {
    super("Home");
  }

  async index(ctx) {
    let ip = utils.getIpAdress();
    if (ip.match("172")) {
      ip = "132.232.87.95";
    }
    const app = new Vue({
      data: {
        ip: `http://${ip}:3007`,
        title: process.env.serverName,
        env: process.env.NODE_ENV === "production" ? "生产环境" : "开发环境",
        routes: []
      },
      template,
      created() {
        this.routes = require("../../router/index")["routes"];
      },
      methods: {
        handleParams(route, item) {
          let params = JSON.stringify(item.params) || "";
          let resp = JSON.stringify(item.resp || {});
          let routePath = encodeURIComponent(route.path + item.path);
          let url = `/test.html?params=${params}&name=${item.name}&resp=${resp}&url=${routePath}`;
          url = encodeURI(url);
          return url;
        }
      }
    });
    const renderer = require("vue-server-renderer").createRenderer();
    let htmlStr = await renderer.renderToString(app);
    ctx.body = htmlStr;
  }
}

module.exports = new Home();
