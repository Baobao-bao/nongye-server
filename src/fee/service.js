const _ = require("lodash");
const moment = require('moment');
const $ = require("axios");
const Mock = require("mockjs");
const Common = require("../common/index");
class Service extends Common {
  constructor() {
    super("Fee");
  }

  async add(ctx) {
    let data = ctx.params;
    try {
      let cTime = Date.now();
      let uTime = Date.now();
      let res = await $.post(this.url + "/Fee", {
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

  async rechargeList(ctx) {
    let { currPage = 1, pageSize = 5, date } = ctx.params;
    console.log('date',date);
    try {
      let res = await $.get(this.url + "/Fee");
      let list = res.data.filter((item) => item.type === "recharge");
      if (!!date) {
        list = list.filter((item) => {
          let cTime = moment(item.cTime).format("YYYY-MM");
          console.log(cTime,date);
          return cTime == date;
        });
      }
     list = _.orderBy(list,'cTime','desc');

      let total = list.length;
      list = this.pageing(list, currPage, pageSize);

      ctx.body = {
        code: 666,
        msg: "success",
        currPage,
        pageSize,
        total,
        data: list,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  async usageList(ctx) {
    let { currPage = 1, pageSize = 5, date } = ctx.params;
    console.log('date',date);
    try {
      let res = await $.get(this.url + "/Fee");
      let list = res.data.filter((item) => item.type === "usege");
      if (!!date) {
        list = list.filter((item) => {
          let cTime = moment(item.cTime).format("YYYY-MM");
          console.log(cTime,date);
          return cTime == date;
        });
      }
     list = _.orderBy(list,'cTime','desc');

      let total = list.length;
      list = this.pageing(list, currPage, pageSize);

      ctx.body = {
        code: 666,
        msg: "success",
        currPage,
        pageSize,
        total,
        data: list,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 500,
        msg: error.message,
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
      let res = await $.get(this.url + "/Fee", { params });
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

  async balance(ctx) {
    try {
      let res = await $.get(this.url + "/Fee");
      let list = res.data;
      let balance = _.filter(list, (item) => item.type === "recharge")
        .map((item) => item.amount * 1)
        .reduce((a, b) => a + b);
      // let balance = list.reduce((a,b)=>{
      //   console.log(a)
      //   return a.amount*1+b.amount*1;
      // },0)
      ctx.body = {
        code: 666,
        msg: "success",
        data: { balance },
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
      let res = await $.get(this.url + "/Fee");
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
      let res = await $.put(this.url + "/Fee/" + ctx.params.id, ctx.params);
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
      let res = await $.get(this.url + "/Fee/" + ctx.params.id);
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
      let res = await $.delete(this.url + "/Fee/" + ctx.params.id);
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
