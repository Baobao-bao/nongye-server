
const test2 = require("../../src/test2/service");
module.exports = {
  path: "/test2",
  name: "test2(undefined)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: test2["add"],
      params: {
        name: "test2"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: test2["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: test2["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: test2["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: test2["edit"],
       params: {
         id: "id"
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: test2["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
