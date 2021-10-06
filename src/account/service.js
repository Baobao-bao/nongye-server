const $ = require("axios");
const UUID = require("uuid");
const Common = require("../common/index");
class Service extends Common {
  constructor() {
    super("Account");
  }

  async login(ctx) {
    try {
      let res = await $.get(this.url + "/account", { params: ctx.params });
      if (res.data.length === 0) {
        ctx.body = {
          code: 606,
          msg: "用户名或密码不正确",
        };
        return false;
      }

      ctx.body = {
        code: 666,
        msg: "success",
        data: res.data[0],
        token: "h234lgu1y2g34ugb2u34bgu23g4yu2fiu4f5v6iyft6ph45o3g45o23g45",
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error,
      };
    }
  }

  async add(ctx) {
    let data = ctx.params;
    try {
      let cTime = Date.now();
      let uTime = Date.now();
      let lTime = Date.now();
      let res = await $.post(this.url + "/Account", {
        id: UUID.v1(),
        cTime,
        uTime,
        lTime,
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
      let res = await $.get(this.url + "/Account", { params });
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

  async all(ctx) {
    try {
      let res = await $.get(this.url + "/Account");
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
      let res = await $.put(this.url + "/Account/" + ctx.params.id, ctx.params);
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
      let res = await $.get(this.url + "/Account/" + ctx.params.id);
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
      let res = await $.delete(this.url + "/Account/" + ctx.params.id);
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
