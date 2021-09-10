
const node = require("../../src/node/service");
module.exports = {
  path: "/node",
  name: "node(传感器节点)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: node["add"],
      params: {
        name: "node"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: node["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: node["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: node["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: node["edit"],
       params: {
         id: "id"
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: node["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
