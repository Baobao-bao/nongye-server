const gateway = require("../../src/gateway/service");
module.exports = {
  path: "/gateway",
  name: "gateway(网关)模块",
  children: [
    // {
    //   path: "/add",
    //   name: "添加",
    //   service: gateway["add"],
    //   params: {
    //     name: "gateway"
    //   }
    // },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: gateway["all"]
    // },
    {
      path: "/list",
      name: "列表",
      service: gateway["list"],
      params: {
        currPage: "当前页(可选)",
        pageSize: "每页条数(可选)",
        eui: "eui关键词(可选)",
        online: "true,false(可选)",
        agreement: "网关协议(可选)",
        date: "日期字符串 date1-date2 (可选)",
      },
      resp: {
        id: "编号",
        eui: "eui号",
        name: "名称",
        mhz: "频率",
        online: "是否在线",
        country: "国家",
        agreement: "协议",
        desc: "描述",
        bTime: "绑定时间",
        uTime: "更新时间",
      },
    },
    {
      path: "/detail",
      name: "详情",
      service: gateway["detail"],
      params: {
        id: "id",
      },
    },
    {
      path: "/edit",
      name: "修改",
      service: gateway["edit"],
      params: {
        id: "id",
      },
    },
    //  {
    //    path: "/del",
    //    name: "删除",
    //    service: gateway["del"],
    //    params: {
    //      id: "id"
    //    }
    //  }
  ],
};
