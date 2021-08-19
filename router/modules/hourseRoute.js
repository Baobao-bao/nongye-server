
const hourse = require("../../src/hourse/service");
module.exports = {
  path: "/hourse",
  name: "hourse模块",
  children: [
    {
      path: "/introduction",
      name: "介绍",
      service: hourse["introduction"]
    },
    {
      path: "/comment",
      name: "评论列表",
      service: hourse["comment"]
    },
    {
      path: "/scene",
      name: "景点列表",
      service: hourse["scene"]
    },
    {
      path: "/city",
      name: "城市列表",
      service: hourse["city"]
    },
    {
      path: "/introduction",
      name: "介绍",
      service: hourse["comment"]
    },
    {
      path: "/around",
      name: "周边环境",
      service: hourse["around"]
    },
    // {
    //   path: "/add",
    //   name: "添加",
    //   service: hourse["add"],
    //   params: {
    //     name: "hourse"
    //   }
    // },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: hourse["all"]
    // },
     {
       path: "/list",
       name: "房源列表",
       service: hourse["list"],
       params: {
        //  pageNum: "当前页"
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
       path: "/love",
       name: "收藏",
       service: hourse["edit"],
       params: {
         id: "房子id",
         love: 'true or false',
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
