
const house = require("../../src/house/service");
module.exports = {
  path: "/house",
  name: "house(房源)模块",
  hidden: true,
  children: [
    {
      path: "/introduction",
      name: "介绍",
      service: house["introduction"]
    },
    {
      path: "/comment",
      name: "评论列表",
      service: house["comment"]
    },
    {
      path: "/scene",
      name: "景点列表",
      service: house["scene"]
    },
    {
      path: "/city",
      name: "城市列表",
      service: house["city"]
    },
    {
      path: "/introduction",
      name: "介绍",
      service: house["comment"]
    },
    {
      path: "/around",
      name: "周边环境",
      service: house["around"]
    },
    // {
    //   path: "/add",
    //   name: "添加",
    //   service: house["add"],
    //   params: {
    //     name: "house"
    //   }
    // },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: house["all"]
    // },
     {
       path: "/list",
       name: "房源列表",
       service: house["list"],
       params: {
        //  pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: house["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: house["edit"],
       params: {
         id: "id"
       }
     },
  ]
};
