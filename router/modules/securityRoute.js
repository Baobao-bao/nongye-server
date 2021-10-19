const security = require("../../src/security/service");
module.exports = {
  path: "/security",
  name: "security(安全)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: security["add"],
      params: {
        authority: "访问权限(必须)",
        tag: "标签(必须)",
        online: "是否在使用(必须)",
      },
    },
    {
      path: "/list",
      name: "列表",
      service: security["list"],
      params: {
        currPage: "当前页(非必须)",
      },
      resp: {
        id:"编号",
        cTime:"创建时间",
        uTime:"更新时间",
        // lTime:"xxxxx",
        tag:"标签",
        authority:"权限",
        online:"是否在使用",
      },
    },
    {
      path: "/detail",
      name: "详情",
      service: security["detail"],
      params: {
        id: "id",
      },
    },
    {
      path: "/edit",
      name: "修改",
      service: security["edit"],
      params: {
        id: "id(必须)",
        authority: "访问权限(必须)",
        tag: "标签(必须)",
        online: "是否在使用(必须)",
      },
    },
    {
      path: "/del",
      name: "删除",
      service: security["del"],
      params: {
        id: "id",
      },
    },
  ],
};
