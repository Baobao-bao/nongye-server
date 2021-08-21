
const browse = require("../../src/browse/service");
module.exports = {
  path: "/browse",
  name: "browse(undefined)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: browse["add"],
      params: {
        name: "browse"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: browse["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: browse["list"],
       params: {
        //  pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: browse["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: browse["edit"],
       params: {
         id: "id"
       }
     },
     {
       path: "/del",
       name: "删除",
       service: browse["del"],
       params: {
         updateTime: "updateTime"
       }
     }
  ]
};
