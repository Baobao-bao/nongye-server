const $ = require("axios");
let Mock = require('mockjs');
const UUID = require("uuid");
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
        id: UUID.v1(),
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
    let { _page, _limit } = ctx.params;
    let params = {
      _sort: "uTime",
      _order: "desc",
      _page,
      _limit,
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
          Mock.Random.time("HH:mm:ss");
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

      ctx.body = {
        code: 666,
        msg: "success",
        data: newList,
      };
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
