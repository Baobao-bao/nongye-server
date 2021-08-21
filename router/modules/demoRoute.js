
const demo = require("../../src/demo/service");
module.exports = {
  path: "/demo",
  name: "demo(例子)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: demo["add"],
      params: {
        name: "demo(必须)"
      }
    },
    {
      path: "/all",
      name: "全部列表",
      service: demo["all"]
    },
     {
       path: "/list",
       name: "列表分页查询",
       service: demo["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: demo["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: demo["edit"],
       params: {
         id: "id"
       }
     },
     {
       path: "/del",
       name: "删除",
       service: demo["del"],
       params: {
         id: "id"
       }
     }
  ]
};
