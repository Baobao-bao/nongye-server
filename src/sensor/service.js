const $ = require("axios");
const UUID = require("uuid");
const Common = require("../common/index");
class Service extends Common {
  constructor() {
    super("sensor");
  }

  async add(ctx) {
    let data = ctx.params;
    try {
      let cTime = Date.now();
      let uTime = Date.now();
      let res = await $.post(this.url + "/sensor", {
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
      let res = await $.get(this.url + "/sensor", { params });
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

  async changeGroup(ctx) { 
    let {id,devGroup} = ctx.params;
    try { 
      let res = await $.patch(this.url+`/sensor/${id}`,{devGroup});
      ctx.body = {
        code: 666,
        data: res.data,
        msg: "success",
      };
    } catch (error) {
      // console.log(error);
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  async all(ctx) {
    try {
      let res = await $.get(this.url + "/sensor");
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

  // 统计信息
  async count(ctx) {
    try {
      let air = [820, 932, 501, 934, 1290, 430, 1320];
      let beam = [120, 200, 150, 80, 70, 110, 130];
      let soil = [720, 832, 601, 434, 1290, 830, 1020];
      let pressure = [
        { value: 40, name: "Mon" },
        { value: 38, name: "Tue" },
        { value: 32, name: "Wed" },
        { value: 30, name: "Thu" },
        { value: 28, name: "Fri" },
        { value: 26, name: "Sat" },
        { value: 22, name: "Sun" },
      ];
      ctx.body = {
        code: 666,
        msg: "success",
        data: { air, beam, soil, pressure },
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
      let res = await $.put(this.url + "/sensor/" + ctx.params.id, ctx.params);
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
      let res = await $.get(this.url + "/sensor/" + ctx.params.id);
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
      let res = await $.delete(this.url + "/sensor/" + ctx.params.id);
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
