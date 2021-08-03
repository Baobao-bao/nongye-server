
const type = require("../../src/type/service");
module.exports = {
  path: "/type",
  name: "type模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: type["add"],
      params: {
        name: "type"
      }
    },
    {
      path: "/all",
      name: "全部列表",
      service: type["all"]
    },
    {
      path: "/list",
      name: "列表查询",
      service: type["list"] 
    },
      {
      path: "/detail",
      name: "详情",
      service: type["detail"],
      params: {
        id: "id"
      }
    },
    {
      path: "/edit",
      name: "修改",
      service: type["edit"],
      params: {
        id: "id"
      }
    },
    {
      path: "/del",
      name: "测试",
      service: type["del"],
      params: {
        id: "id"
      }
    }
  ]
};
