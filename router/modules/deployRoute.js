
const deploy = require("../../src/deploy/service");
module.exports = {
  path: "/deploy",
  name: "deploy(部署)模块",
  hidden: true,
  children: [
    {
      path: "/index",
      name: "添加",
      service: deploy["index"],
      params: {
        // name: "deploy"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: deploy["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: deploy["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: deploy["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: deploy["edit"],
       params: {
         id: "id"
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: deploy["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
