const product = require("../../src/product/service");
module.exports = {
  path: "/product",
  name: "product模块",
  children: [{
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
        currPage: "当前页",
        pageSize: "每页条数(非必须)",
        keyword: "关键字(非必须)"
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
      path: "/changeStatus",
      name: "修改上下架状态",
      service: product["changeStatus"],
      params: {
        id: "id",
        status: '状态: 01表示上架,02表示下架'
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