
const mock = require("../../src/mock/service");
module.exports = {
  path: "/mock",
  // hidden: true,
  name: "mock(模拟数据)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: mock["add"],
      params: {
        name: "mock"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: mock["all"]
    // },
     {
       path: "/list",
       name: "列表",
       service: mock["list"],
       params: {
         currPage: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: mock["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: mock["edit"],
       params: {
         id: "id"
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: mock["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
