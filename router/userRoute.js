const user = require("../../appService/userService");
module.exports = {
  path: "/user",
  name: "user(用户)模块",
  children: [
    {
      path: "/login",
      name: "登录",
      service: user["login"]
    },
    {
      path: "/logout",
      name: "登出",
      service: user["logout"]
    },
    {
      path: "/checkToken",
      name: "检查token",
      hidden: true,
      service: user["checkToken"]
    },
    {
      path: "/register",
      name: "用户名密码注册",
      hidden: true,
      service: user["register"]
    },
    {
      path: "/add",
      name: "添加",
      hidden: true,
      service: user["add"],
      params: {
        name: "user"
      }
    },
    {
      path: "/all",
      name: "全部列表",
      service: user["all"]
    },
    {
      path: "/getList",
      name: "用户列表(含待测数)",
      service: user["getList"]
    },
    {
      path: "/list",
      name: "列表分页查询",
      hidden: true,
      service: user["list"],
      params: {
        pageNum: "当前页"
      }
    },
    {
      path: "/edit",
      name: "修改",
      hidden: true,
      service: user["edit"],
      params: {
        id: "id"
      }
    },
    {
      path: "/del",
      name: "测试",
      hidden: true,
      service: user["del"],
      params: {
        id: "id"
      }
    }
  ]
};
