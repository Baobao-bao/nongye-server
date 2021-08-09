
const hourse = require("../../src/hourse/service");
module.exports = {
  path: "/hourse",
  name: "hourse模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: hourse["add"],
      params: {
        name: "hourse"
      }
    },
    {
      path: "/all",
      name: "全部列表",
      service: hourse["all"]
    },
     {
       path: "/list",
       name: "列表分页查询",
       service: hourse["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: hourse["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: hourse["edit"],
       params: {
         id: "id"
       }
     },
     {
       path: "/del",
       name: "删除",
       service: hourse["del"],
       params: {
         id: "id"
       }
     }
  ]
};
