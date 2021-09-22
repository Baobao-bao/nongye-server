
const device = require("../../src/device/service");
module.exports = {
  path: "/device",
  name: "device(设备)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: device["add"],
      params: {
        name: "device"
      }
    },
    {
      path: "/count",
      name: "全部列表",
      service: device["count"]
    },
     {
       path: "/list",
       name: "列表分页查询",
       service: device["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: device["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: device["edit"],
       params: {
         id: "id"
       }
     },
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
