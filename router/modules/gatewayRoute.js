
const gateway = require("../../src/gateway/service");
module.exports = {
  path: "/gateway",
  name: "gateway(undefined)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: gateway["add"],
      params: {
        name: "gateway"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: gateway["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: gateway["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: gateway["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: gateway["edit"],
       params: {
         id: "id"
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: gateway["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
