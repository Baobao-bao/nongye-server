let createRoute = require("../../utils/createRoute.js");
let createService = require("../../utils/createService.js"); 
let fs = require("fs");
let path = require("path");

class Module {
  constructor() { 
  }

  async add(ctx) {  
    try {
      let { name,cnname } = ctx.params;
      // 创建文件夹
      fs.mkdir(path.resolve(__dirname, `../${name}`), () => {});
      // 生成service代码
      let serviceStr = createService(name);
      let servicePath = path.resolve(__dirname, `../${name}/service.js`);
      fs.writeFileSync(servicePath, serviceStr); 

      // 生成路由代码
      let routePath = path.resolve(
        __dirname,
        `../../router/modules/${name}Route.js`
      );
      let routeStr = createRoute(name,cnname);
      fs.writeFileSync(routePath, routeStr);

      ctx.body = {
        code: 666,
        msg: `${name}模块生成成功`
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message
      }
    }
  }

  del(ctx) { 
    try {
      let { name } = ctx.params;

      // 删除路由文件
      let routePath = path.resolve(
        __dirname,
        `../../router/modules/${name}Route.js`
      );
      fs.unlinkSync(routePath);

      // 删除模块文件夹
      let modulePath = path.resolve(__dirname, `../${name}`);
      this.deleteFolder(modulePath);
      ctx.body = {
        code: 666,
        msg: `${name}模块删除成功`
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message
      }
    }
  }

  // 删除文件夹
  deleteFolder(path) {
    var files = [];
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach(function(file, index) {
        var curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          // recurse
          deleteFolder(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }
}

module.exports = new Module();
