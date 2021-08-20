
const love = require("../../src/love/service");
module.exports = {
  path: "/love",
  name: "love(收藏)模块",
  children: [
    {
      path: "/change",
      name: "收藏",
      service: love["change"],
      params: {
        houseId: "房屋id(必须)"
      }
    }, 
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: love["all"]
    // },
     {
       path: "/list",
       name: "列表",
       service: love["list"],
       params: {
        //  pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: love["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: love["edit"],
       params: {
         id: "id"
       }
     },
     {
       path: "/del",
       name: "删除",
       service: love["del"],
       params: {
         id: "id"
       }
     }
  ]
};
