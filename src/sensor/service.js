const $ = require("axios");
const {mock} = require('mockjs');
const Common = require("../common/index");
const  moment = require('moment');
const _ = require('lodash');
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
        id: mock('@id'),
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
    let { currPage, pageSize, agreement, online, eui,date,devGroup } = ctx.params;
    currPage = !!currPage ? currPage : 1;
    pageSize = !!pageSize ? pageSize : 5;

    try {
      let res = await $.get(this.url + "/sensor");
      let list = res.data;
      // 排序 ['asc', 'desc']
      list = _.orderBy(list, ["bTime"], ["desc"]);
      // 根据条件过滤数组
      list = this.filterList(list, {
        agreement,
        devGroup,
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
