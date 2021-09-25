
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
        name: "sensor"
      }
    },
    {
      path: "/count",
      name: "全部列表",
      service: sensor["count"]
    },
     {
       path: "/list",
       name: "列表分页查询",
       service: sensor["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: sensor["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: sensor["edit"],
       params: {
         id: "id"
       }
     },
     {
       path: "/changeGroup",
       name: "换组",
       service: sensor["changeGroup"],
       params: {
        id: "ie",
        devGroup: '新组名称'
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: sensor["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
