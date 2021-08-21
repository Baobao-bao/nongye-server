const $ = require("axios");
const UUID = require("uuid");
const Common = require("../common/index");
const moment = require("moment");
class Service extends Common {
  constructor() {
    super("Browse");
  }

  async add(ctx) {

    let random = Math.floor(Math.random()*3); 
    let date = moment().subtract(random, "days").format("YYYY-MM-DD"); 

    let { houseId } = ctx.params;
    try {  
      if (!ctx.user) {
        throw {
          message: "token不存在或过期",
        };
      }
      let userId = ctx.user.id;
      let result = await this.$find("/browse", {
        userId: ctx.user.id,
        houseId,
      });
      // 新增
      if (result.length === 0) {
        let house = await this.$find("/house", { id: houseId });
        result = await $.post(this.url + "/Browse", {
          ...house[0],
          ...ctx.user,
          houseId,
          userId,
          id: UUID.v1(),
          createTime:date,
          updateTime:date,
        });
      }

      ctx.body = {
        code: 666,
        msg: "success",
        result: result.data,
      };
    } catch (error) {
      this.log(error);
      ctx.body = {
        code: 500,
        msg: error,
      };
    }
  }

  async list(ctx) {
    // let {_page,_limit} = ctx.params;
    console.log(ctx.user);
    let params = {
      _sort: "updateTime",
      _order: "desc",
      userId: ctx.user.id,
      // _page,
      // _limit
    };

    try {
      let res = await $.get(this.url + "/Browse", { params }); 
      ctx.body = {
        code: 666,
        msg: "success",
        result:res.data,
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
      let res = await $.get(this.url + "/Browse");
      ctx.body = {
        code: 666,
        msg: "success",
        result: res.data,
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
      ctx.params.updateTime = Date.now();
      let res = await $.put(this.url + "/Browse/" + ctx.params.id, ctx.params);
      ctx.body = {
        code: 666,
        msg: "success",
        result: res.data,
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
      let res = await $.get(this.url + "/Browse/" + ctx.params.id);
      ctx.body = {
        code: 666,
        msg: "success",
        result: res.data,
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
      let params = {
        userId:ctx.user.id,
        updateTime: ctx.params.updateTime
      }
      let browseList = await this.$find('/browse',params); 
      let promiseList = [];
      browseList.forEach(item=> {
        promiseList.push(this.$del('/browse',item.id));
      })

      let res = await  Promise.all(promiseList);
      ctx.body = ctx.body = {
        code: 666,
        msg: "success",
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
