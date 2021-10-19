
const device = require("../../src/device/service");
module.exports = {
  path: "/device",
  name: "device(设备)模块",
  children: [
    // {
    //   path: "/add",
    //   name: "添加",
    //   service: device["add"],
    //   params: {
    //     name: "device"
    //   }
    // },
    {
      path: "/count",
      name: "设备统计",
      service: device["count"]
    },
     {
       path: "/sensorList",
       name: "传感器分组列表",
       service: device["sensorList"],
       params: {
        //  currPage: "当前页"
       },
       resp: {
        "id":"编号",
        "eui":"eui码",
        "mhz":"频率",
        "online":"是否在线",
        "country":"国家",
        "agreement":"协议",
        "name":"名称",
        "powerNum":"电量",
        "nums":"通道数量",
        "devGroup":"所在群组",
        "loop":"上报周期",
        "bTime":"绑定时间",
        "uTime":"更新时间",
        "devName":"测量类型",
        "devValue":"测量值"
       }
     },
    //    {
    //    path: "/detail",
    //    name: "详情",
    //    service: device["detail"],
    //    params: {
    //      id: "id"
    //    }
    //  },
    //  {
    //    path: "/edit",
    //    name: "修改",
    //    service: device["edit"],
    //    params: {
    //      id: "id"
    //    }
    //  },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: device["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
