const group = require("../../src/group/service");
module.exports = {
  path: "/group",
  name: "group(节点群组)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: group["add"],
      params: {
        name: "群组名称",
      },
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: group["all"]
    // },
    {
      path: "/list",
      name: "列表",
      service: group["list"],
      params: {
        currPage: "当前页(非必须)",
        pageSize: "每页条数(非必须)",
        keyword: "搜索关键词(非必须)",
      },
      resp: {
        id: "编号",
        groupName: "群组名称",
        uTime: "更新时间",
        nodeNums: "传感器数量",
        // "groupNums": 10,
        devNums: "设备总数量",
        onlineNums: "在线设备数量",
        cTime: "创建时间",
      },
    },
    {
      path: "/detail",
      name: "详情",
      service: group["detail"],
      params: {
        id: "id",
      },
    },
    {
      path: "/edit",
      name: "修改",
      service: group["edit"],
      params: {
        id: "id(必须)",
        groupName: "群组名(必须)",
      },
    },
    {
      path: "/del",
      name: "删除",
      service: group["del"],
      params: {
        id: "id",
      },
    },
  ],
};
