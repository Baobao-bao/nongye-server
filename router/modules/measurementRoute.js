const measurement = require("../../src/measurement/service");
module.exports = {
  path: "/measurement",
  name: "measurement(测量类型)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: measurement["add"],
      params: {
        name: "测量类型(必须)",
        unit: "单位(必须)",
      },
    },
    {
      path: "/list",
      name: "列表",
      service: measurement["list"],
      params: {
        currPage: "当前页",
      },
      resp: {
        id: "编号",
        cTime: "创建时间",
        uTime: "更新时间",
        name: "测量名称",
        unit: "测量单位",
      },
    },
    {
      path: "/detail",
      name: "详情",
      service: measurement["detail"],
      params: {
        id: "id",
      },
    },
    {
      path: "/edit",
      name: "修改",
      service: measurement["edit"],
      params: {
        id: "id(必须)",
        name: "测量类型(必须)",
        unit: "单位(必须)",
      },
    },
    {
      path: "/del",
      name: "删除",
      service: measurement["del"],
      params: {
        id: "id",
      },
    },
  ],
};
