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
        name: ""
      }
    },

    // {
    //   path: "/del",
    //   name: "删除模块",
    //   service: modules["del"],
    //   params: {
    //     name: ""
    //   }
    // }
  ]
};
