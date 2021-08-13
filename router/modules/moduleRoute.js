const modules = require("../../src/module/service");
module.exports = {
  path: "/module",
  name: "系统模块",
  // hidden: true,
  children: [
    {
      path: "/add",
      name: "添加模块",
      service: modules["add"],
      params: {
        name: "模块名称",
        cnname: "中文名",
      }
    },

    {
      path: "/del",
      name: "删除模块",
      service: modules["del"],
      params: {
        name: "模块名称",
       
      }
    }
  ]
};
