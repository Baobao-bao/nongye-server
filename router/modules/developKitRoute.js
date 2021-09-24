
const developKit = require("../../src/developKit/service");
module.exports = {
  path: "/developKit",
  hidden: true,
  name: "developKit(开发套件)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: developKit["add"],
      params: {
        name: "developKit"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: developKit["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: developKit["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: developKit["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: developKit["edit"],
       params: {
         id: "id"
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: developKit["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
