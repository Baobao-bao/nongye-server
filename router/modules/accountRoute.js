const account = require("../../src/account/service");
module.exports = {
  path: "/account",
  name: "account(子账号)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: account["add"],
      params: {
        account: "账号(必须)",
        username: "用户名(必须)",
        type: "类型(必须)",
        desc: "描述",
      },
    },
    {
      path: "/login",
      name: "登录",
      service: account["login"],
      params: {
        account:'账号(必须)',
        password:'密码(必须)',
      }
    },
    {
      path: "/list",
      name: "列表分页查询",
      service: account["list"],
      params: {
        pageNum: "当前页",
      },
    },
    {
      path: "/detail",
      name: "详情",
      service: account["detail"],
      params: {
        id: "id",
      },
    },
    {
      path: "/edit",
      name: "修改",
      service: account["edit"],
      params: {
        id: "id",
      },
    },
     {
       path: "/del",
       name: "删除",
       service: account["del"],
       params: {
         id: "id"
       }
     }
  ],
};
