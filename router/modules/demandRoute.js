
const demand = require("../../src/demand/service");
module.exports = {
  path: "/demand",
  name: "demand(需求)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: demand["add"],
      params: {
        name: "demand"
      }
    },
    {
      path: "/all",
      name: "全部列表",
      service: demand["all"]
    },
     {
       path: "/list",
       name: "列表分页查询",
       service: demand["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: demand["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: demand["edit"],
       params: {
         id: "id"
       }
     },
     {
       path: "/del",
       name: "删除",
       service: demand["del"],
       params: {
         id: "id"
       }
     }
  ]
};
