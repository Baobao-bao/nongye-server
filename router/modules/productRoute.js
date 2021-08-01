
const product = require("../../src/product/service");
module.exports = {
  path: "/product",
  name: "product模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: product["add"],
      params: {
        name: "product"
      }
    },
    {
      path: "/all",
      name: "全部列表",
      service: product["all"]
    },
     {
       path: "/list",
       name: "列表分页查询",
       service: product["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: product["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: product["edit"],
       params: {
         id: "id"
       }
     },
     {
       path: "/del",
       name: "删除",
       service: product["del"],
       params: {
         id: "id"
       }
     }
  ]
};
