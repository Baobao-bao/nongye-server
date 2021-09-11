
const group = require("../../src/group/service");
module.exports = {
  path: "/group",
  name: "group(节点群组)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: group["add"],
      params: {
        name: "group"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: group["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: group["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: group["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: group["edit"],
       params: {
         id: "id(必须)",
         groupName: '群组名(必须)'
       }
     },
     {
       path: "/del",
       name: "删除",
       service: group["del"],
       params: {
         id: "id"
       }
     }
  ]
};
