const $ = require("axios");
const _ = require('lodash');
const Mock = require('mockjs');
const Common = require("../common/index");
class Service extends Common {
  constructor() {
    super("measurement");
  } 

  async add(ctx) {
    let data = ctx.params;
    try {
      let cTime = Date.now();
      let uTime = Date.now(); 
      let res = await $.post(this.url + "/measurement", {
        id: Mock.mock("@id"),  
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
    try {
      let res = await $.get(this.url + "/measurement");
      let list = res.data;
      list = _.orderBy(list,['uTime','cTime'],['desc','desc'])
      ctx.body = {
        code: 666,
        msg: "success",
        data: list,
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
      let res = await $.get(this.url + "/measurement");
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
      let res = await $.put(this.url + "/measurement/" + ctx.params.id, ctx.params);
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
      let res = await $.get(this.url + "/measurement/" + ctx.params.id);
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
      let res = await $.delete(this.url + "/measurement/" + ctx.params.id);
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
