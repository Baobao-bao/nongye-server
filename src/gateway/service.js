const _ = require("lodash");
const $ = require("axios");
const UUID = require("uuid");
const Common = require("../common/index");
class Service extends Common {
  constructor() {
    super("Gateway");
  }

  async add(ctx) {
    let data = ctx.params;
    try {
      let cTime = Date.now();
      let uTime = Date.now();
      let res = await $.post(this.url + "/Gateway", {
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
    let { currPage, pageSize, agreement, online, eui } = ctx.params;
    // let params = {
    //   online,
    //   agreement,
    //   _sort:'uTime',_order:'desc'
    // }

    try {
      let res = await $.get(this.url + "/Gateway");
      let list = res.data;
      list = _.sortBy(list, "uTime");
      list = this.filterList(list, {
        agreement,
        online,
        euikey:eui,
      });
      let total = list.length;
      list = this.pageing(list, currPage, pageSize);
      ctx.body = {
        pageSize,
        currPage,
        total,
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
      let res = await $.get(this.url + "/Gateway");
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
      let res = await $.put(this.url + "/Gateway/" + ctx.params.id, ctx.params);
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
      let res = await $.get(this.url + "/Gateway/" + ctx.params.id);
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
      let res = await $.delete(this.url + "/Gateway/" + ctx.params.id);
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
