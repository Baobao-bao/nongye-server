const security = require("../../src/security/service");
module.exports = {
  path: "/security",
  name: "security(安全)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: security["add"],
      params: {
        authority: "访问权限(必须)",
        tag: "标签(必须)",
        online: "是否在使用(必须)",
      },
    }, 
    {
      path: "/list",
      name: "列表分页查询",
      service: security["list"],
      params: {
        pageNum: "当前页",
      },
    },
    {
      path: "/detail",
      name: "详情",
      service: security["detail"],
      params: {
        id: "id",
      },
    },
    {
      path: "/edit",
      name: "修改",
      service: security["edit"],
      params: {
        id: "id",
      },
    },
     {
       path: "/del",
       name: "删除",
       service: security["del"],
       params: {
         id: "id"
       }
     }
  ],
};
