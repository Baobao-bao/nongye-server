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
        name: "测量类型",
        unit: "单位",
      },
    }, 
    {
      path: "/list",
      name: "列表分页查询",
      service: measurement["list"],
      params: {
        pageNum: "当前页",
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
        id: "id",
      },
    },
     {
       path: "/del",
       name: "删除",
       service: measurement["del"],
       params: {
         id: "id"
       }
     }
  ],
};
