
const fee = require("../../src/fee/service");
module.exports = {
  path: "/fee",
  name: "fee(计费)模块",
  children: [
    {
      path: "/rechargeList",
      name: "充值记录",
      service: fee["rechargeList"],
      params: {}
    },
    {
      path: "/usageList",
      name: "充值记录",
      service: fee["usageList"],
      params: {
        currPage:'当前页(可选)',
        pageSize:'当前页(可选)',
        date:'日期:HHHH-MM(可选)',
      }
    },
    {
      path: "/recharge",
      name: "添加",
      service: fee["add"],
      params: {
        amount: '金额(必须)',
        type: "类型:recharge,usage(必须)",
        desc: '备注(可选)',
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: fee["all"]
    // },
     {
       path: "/list",
       name: "列表分页查询",
       service: fee["list"],
       params: {
         pageNum: "当前页"
       }
     },
    
     {
       path: "/balance",
       name: "余额查询",
       service: fee["balance"],
       params: {
         pageNum: "当前页"
       }
     },
       {
       path: "/detail",
       name: "详情",
       service: fee["detail"],
       params: {
         id: "id"
       }
     },
     {
       path: "/edit",
       name: "修改",
       service: fee["edit"],
       params: {
         id: "id"
       }
     },
     {
       path: "/del",
       name: "删除",
       service: fee["del"],
       params: {
         id: "id"
       }
     }
  ]
};
