
const subType = require("../../src/subType/service");
module.exports = {
  path: "/subType",
  name: "subType模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: subType["add"],
      params: { 
        "name": "分类名成功",
        "parentId": "父类ID",
        "parentName": "父类名称"
      }
    },
    {
      path: "/all",
      name: "全部列表",
      service: subType["all"],
      params: {
        parentId: "父级分类ID"
      }
    },
    //  {
    //    path: "/list",
    //    name: "列表分页查询",
    //    service: subType["list"],
    //    params: {
    //      pageNum: "当前页"
    //    }
    //  },
       {
       path: "/detail",
       name: "详情",
       service: subType["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: subType["edit"],
       params: {
         id: "id"
       }
     },
     {
       path: "/del",
       name: "删除",
       service: subType["del"],
       params: {
         id: "id"
       }
     }
  ]
};
