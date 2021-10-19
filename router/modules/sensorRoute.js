const sensor = require("../../src/sensor/service");
module.exports = {
  path: "/sensor",
  name: "sensor(传感器节点)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: sensor["add"],
      params: {
        name: "sensor",
      },
    },
    {
      path: "/count",
      name: "全部列表",
      service: sensor["count"],
      params: {},
      resp: {
        air: '空气数据',
        beam: '光照数据',
        soil: '土壤数据',
        pressure: '气压数据',
      }
    },
    {
      path: "/list",
      name: "列表",
      service: sensor["list"],
      params: {
        currPage: "当前页",
      },
      resp: {
        id: "编号",
        eui: "eui码",
        mhz: "频率",
        online: "是否在线",
        country: "国家",
        agreement: "协议",
        name: "名称",
        powerNum: "电量",
        nums: "通道数量",
        devGroup: "所在群组",
        loop: "上报周期",
        bTime: "绑定时间",
        uTime: "更新时间",
        devName: "测量类型",
        devValue: "测量值",
      },
    },
    {
      path: "/detail",
      name: "详情",
      service: sensor["detail"],
      params: {
        id: "id",
      },
    },
    // {
    //   path: "/edit",
    //   name: "修改",
    //   service: sensor["edit"],
    //   params: {
    //     id: "id",
    //   },
    // },
    {
      path: "/changeGroup",
      name: "换组",
      service: sensor["changeGroup"],
      params: {
        id: "id(编号)",
        devGroup: "新组名称(必须)",
      },
    },
     {
       path: "/del",
       name: "删除",
       hidden: true,
       service: sensor["del"],
       params: {
         id: "id"
       }
     }
  ],
};
