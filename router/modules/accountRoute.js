
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
        name: "account"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: account["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: account["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: account["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: account["edit"],
       params: {
         id: "id"
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: account["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
