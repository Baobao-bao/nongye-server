
const test = require("../../src/test/service");
module.exports = {
  path: "/test",
  name: "test(undefined)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: test["add"],
      params: {
        name: "test"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: test["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: test["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: test["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: test["edit"],
       params: {
         id: "id"
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: test["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
