
const order = require("../../src/order/service");
module.exports = {
  path: "/order",
  name: "order(订单)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: order["add"],
      params: {
        name: "order"
      }
    },
    {
      path: "/all",
      name: "全部列表",
      service: order["all"]
    },
     {
       path: "/list",
       name: "列表分页查询",
       service: order["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: order["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: order["edit"],
       params: {
         id: "id"
       }
     },
     {
       path: "/del",
       name: "删除",
       service: order["del"],
       params: {
         id: "id"
       }
     }
  ]
};
