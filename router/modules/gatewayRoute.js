
const gateway = require("../../src/gateway/service");
module.exports = {
  path: "/gateway",
  name: "gateway(网关)模块",
  children: [
    {
      path: "/add",
      name: "添加",
      service: gateway["add"],
      params: {
        name: "gateway"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: gateway["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: gateway["list"],
       params: {
         currPage: "当前页(可选)",
         pageSize: '每页条数(可选)',
         eui: 'eui关键词(可选)',
         online: 'true,false(可选)',
         agreement: '网关协议(可选)', 
         date: '日期字符串 date1-date2 (可选)',  
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: gateway["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: gateway["edit"],
       params: {
         id: "id"
       }
     },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: gateway["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ]
};
