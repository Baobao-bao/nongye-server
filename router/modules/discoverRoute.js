const discover = require("../../src/discover/service");
module.exports = {
  path: "/discover",
  name: "discover(发现)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: discover["add"],
      params: {
        name: "discover",
      },
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: discover["all"]
    // },
    {
      path: "/list",
      name: "列表分页查询",
      service: discover["list"],
      params: {
        pageNum: "当前页(非必须)",
        pageSize: "每页条数(非必须)",
        kind: "01-路线,02-美墅,03-活动(必须)",
      },
    },
    {
      path: "/detail",
      name: "详情",
      service: discover["detail"],
      params: {
        id: "id",
      },
    },
    {
      path: "/edit",
      name: "修改",
      service: discover["edit"],
      params: {
        id: "id",
      },
    },
    {
      path: "/del",
      name: "删除",
      service: discover["del"],
      params: {
        id: "id",
      },
    },
  ],
};
