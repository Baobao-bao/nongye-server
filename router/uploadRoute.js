
const upload = require("../../appService/uploadService");
module.exports = {
  path: "/upload",
  name: "upload模块",
  children: [
    {
      path: "/one",
      name: "添加单张图片",
      service: upload["one"],
      params: {
        name: "upload"
      }
    },
    // {
    //   path: "/all",
    //   name: "全部列表",
    //   service: upload["all"]
    // },
    // {
    //   path: "/list",
    //   name: "列表分页查询",
    //   service: upload["list"],
    //   params: {
    //     pageNum: "当前页"
    //   }
    // },
    //   {
    //   path: "/detail",
    //   name: "详情",
    //   service: upload["detail"],
    //   params: {
    //     uploadId: "uploadId"
    //   }
    // },
    // {
    //   path: "/edit",
    //   name: "修改",
    //   service: upload["edit"],
    //   params: {
    //     uploadId: "uploadId"
    //   }
    // },
    // {
    //   path: "/del",
    //   name: "测试",
    //   service: upload["del"],
    //   params: {
    //     uploadId: "uploadId"
    //   }
    // }
  ]
};
