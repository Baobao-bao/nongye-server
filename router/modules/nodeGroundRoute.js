
const nodeGround = require("../../src/nodeGround/service");
module.exports = {
  path: "/nodeGround",
  name: "nodeGround(节点群组)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: nodeGround["add"],
      params: {
        name: "nodeGround"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: nodeGround["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: nodeGround["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: nodeGround["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: nodeGround["edit"],
       params: {
         id: "id"
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: nodeGround["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
