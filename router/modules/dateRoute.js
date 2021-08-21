
const date = require("../../src/date/service");
module.exports = {
  path: "/date",
  name: "date(日期)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: date["add"],
      params: {
        name: "date"
      }
    },
    {
      path: "/all",
      name: "全部列表",
      service: date["all"]
    },
     {
       path: "/list",
       name: "列表分页查询",
       service: date["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: date["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: date["edit"],
       params: {
         id: "id"
       }
     },
     {
       path: "/del",
       name: "删除",
       service: date["del"],
       params: {
         id: "id"
       }
     }
  ]
};
