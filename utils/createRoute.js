module.exports = function createRoute(name,cnname) {
  return `
const ${name} = require("../../src/${name}/service");
module.exports = {
  path: "/${name}",
  name: "${name}(${cnname})模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: ${name}["add"],
      params: {
        name: "${name}"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: ${name}["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: ${name}["list"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: ${name}["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: ${name}["edit"],
       params: {
         id: "id"
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: ${name}["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
`;
};
