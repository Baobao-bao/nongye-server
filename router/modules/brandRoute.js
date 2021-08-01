
const brand = require("../../src/brand/service");
module.exports = {
  path: "/brand",
  name: "brand模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: brand["add"],
      params: {
        name: "brand"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: brand["all"]
    // },
    {
      path: "/list",
      name: "列表",
      service: brand["list"],
      params: {
        pageNum: "当前页"
      }
    },
      {
      path: "/detail",
      name: "详情",
      service: brand["detail"],
      params: {
        id: "id"
      }
    },
    {
      path: "/edit",
      name: "修改",
      service: brand["edit"],
      params: {
        id: "id"
      }
    },
    {
      path: "/del",
      name: "删除",
      service: brand["del"],
      params: {
        id: "id"
      }
    }
  ]
};
