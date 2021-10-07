const _ = require("lodash");
const $ = require("axios");
const UUID = require("uuid");
const Common = require("../common/index");
const moment = require('moment');
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
    let { currPage, pageSize, agreement, online, eui,date } = ctx.params;
    currPage = !!currPage ? currPage : 1;
    pageSize = !!pageSize ? pageSize : 5;

    try {
      let res = await $.get(this.url + "/Gateway");
      let list = res.data;
      // 排序 ['asc', 'desc']
      list = _.orderBy(list, ["bTime"], ["desc"]);
      // 根据条件过滤数组
      list = this.filterList(list, {
        agreement,
        online,
        euikey: eui,
      });
      // 根据日期过滤
      list = this.filterByDate(list,date);
      let total = list.length;
      // 分页
      list = this.pageing(list, currPage, pageSize);

   
      // list = list.map(item=> {
      //   return {
      //     ...item,
      //     bTime: moment(item.bTime).format("YYYY-MM-DD"),
      //     uTime: moment(item.uTime).format("YYYY-MM-DD"),
      //   } 
      // })
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
