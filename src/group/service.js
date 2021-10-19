const $ = require("axios");
let Mock = require('mockjs');
const Common = require("../common/index");
class Service extends Common {
  constructor() {
    super("group");
  }

  async add(ctx) {
    let data = ctx.params;
    try {
      let cTime = Date.now();
      let uTime = Date.now();
      let res = await $.post(this.url + "/group", {
        id: Mock.mock('@id'),
        cTime,
        uTime,
        ...data,
      });
      ctx.body = {
        code: 666,
        msg: "success",
        data: res.data,
      };
    } catch (error) { 
      ctx.body = {
        code: 500,
        msg: error,
      };
    }
  }

  async list(ctx) {
    let { currPage, pageSize,keyword } = ctx.params;
    // currPage=!!currPage?currPage:1;
    // pageSize=!!pageSize?pageSize:5;
    let params = {
      _sort: "uTime",
      _order: "desc",
    };
    try {

      let groupRes = await $.get(this.url + "/group");
      let groupList = groupRes.data;
      // groupList = groupList.map(item=>item.groupName);


      let res = await $.get(this.url + "/sensor", { params });
      let list = res.data; 
      let newList = groupList.map((item) => {
        let itemList = list.filter((subitem) => item.groupName === subitem.devGroup);
        // let id = Mock.mock("@id");
        // 传感器数量
        let nodeNums = itemList.length;
        // 开发套件
        let groupNums = 10;
        // devNums 设备数量
        let devNums = nodeNums+Mock.mock(/[1-3]/)*1;
        // 在线设备数量
        let onlineNums = itemList.filter(
          (item) => item.online === true
        ).length;
        let cTime =
          Mock.mock(/202[01]-0[1-9]-[1-2][1-28]/) +
          Mock.Random.time(" HH:mm:ss");
          cTime = new Date(cTime);
          cTime = cTime.getTime()
        return {
          // id,
          ...item,
          // groupName,
          nodeNums,
          groupNums,
          devNums,
          onlineNums,
          cTime,
        };
      });
      newList = this.filterList(newList,{groupNamekey:keyword})
      let total = newList.length;
      if (!!currPage) {
        newList = this.pageing(newList,currPage,pageSize);
      }
      
      ctx.body = {
        code: 666,
        msg: "success",
        currPage,
        pageSize,
        total,
        data: newList,
      };
      return newList;
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  async all(ctx) {
    try {
      let res = await $.get(this.url + "/group");
      ctx.body = {
        code: 666,
        msg: "success",
        data: res.data,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  async edit(ctx) {
    try {
      ctx.params.uTime = Date.now();
      let res = await $.put(this.url + "/group/" + ctx.params.id, ctx.params);
      ctx.body = {
        code: 666,
        msg: "success",
        data: res.data,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  async detail(ctx) {
    try {
      let res = await $.get(this.url + "/group/" + ctx.params.id);
      ctx.body = {
        code: 666,
        msg: "success",
        data: res.data,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  async del(ctx) {
    try {
      let res = await $.delete(this.url + "/group/" + ctx.params.id);
      ctx.body = ctx.body = {
        code: 666,
        msg: "success",
        data: res.data,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
}
module.exports = new Service();
