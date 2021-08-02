const user = require("../../src/user/service");
module.exports = {
  path: "/user",
  name: "user模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: user["add"],
      params: {
        username: "username",
        realname: "realname",
        password: 'password',
        role: 'role'
      }
    },
    {
      path: "/list",
      name: "全部列表",
      service: user["list"]
    },
    // {
    //   path: "/list",
    //   name: "列表分页查询",
    //   service: user["list"],
    //   params: {
    //     pageNum: "当前页"
    //   }
    // },
    {
      path: "/login",
      name: "用户登录",
      service: user["login"],
      params: {
        username: "username",
        password: 'password'
      }
    },
      {
      path: "/detail",
      name: "详情",
      service: user["detail"],
      params: {
        id: "id"
      }
    },
    {
      path: "/edit",
      name: "修改",
      service: user["edit"],
      params: {
        id: "id",
        xx: 'xx'
      }
    },
    {
      path: "/del",
      name: "删除",
      service: user["del"],
      params: {
        id: "id",
      }
    }
  ]
};
