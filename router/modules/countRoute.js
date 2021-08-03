
const count = require("../../src/count/service");
module.exports = {
  path: "/count",
  name: "count模块",
  children: [
    // {
    //   path: "/add",
    //   name: "添加",
    //   service: count["add"],
    //   params: {
    //     name: "count"
    //   }
    // },
    {
      path: "/all",
      name: "全部列表",
      service: count["all"]
    },
    //  {
    //    path: "/list",
    //    name: "列表分页查询",
    //    service: count["list"],
    //    params: {
    //      pageNum: "当前页"
    //    }
    //  },
    //    {
    //    path: "/detail",
    //    name: "详情",
    //    service: count["detail"],
    //    params: {
    //      id: "id"
    //    }
    //  },
    //  {
    //    path: "/edit",
    //    name: "修改",
    //    service: count["edit"],
    //    params: {
    //      id: "id"
    //    }
    //  },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: count["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
