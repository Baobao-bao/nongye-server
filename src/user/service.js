const $ = require("axios");
const Mock = require("mockjs");
const UUID = require("uuid");
const Common = require("../common/index");
class Service extends Common {
  constructor() {
    super("user");
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
      let res = await $.get(this.url + "/user", {
        params,
      });
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

  async all(ctx) {
    try {
      let res = await $.get(this.url + "/user");
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
      ctx.params.uTime = Date.now();
      let res = await $.put(this.url + "/user/" + ctx.params.id, ctx.params);
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
      let res = await $.get(this.url + "/user/" + ctx.params.id);
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
      let res = await $.delete(this.url + "/user/" + ctx.params.id);
      ctx.body = ctx.body = {
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

  async loginBySmsCode(ctx) { 
    try {
      let res = await this.$find('/user',ctx.params);
      let userInfo = res[0];
      if (!userInfo)throw({message:'手机号码或验证码错误'});
      ctx.body = {
        code: 666,
        msg: "success",
        result: {
          ...userInfo,
          token: this.getToken(userInfo),
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  async getSmsCode(ctx) { 
    try {
      const smsCode = Mock.Random.integer(1000, 9999);
      // 根据用户去查找用户
      let user = await this.$find('/user',ctx.params);
      if (user.length) {
        user = user[0];
        // 更新验证码
        await this.$update('/user',{ ...user, smsCode });
      } else {
        // 创建新用户
        user = await this.add({ phone: ctx.params.phone, smsCode });
      }

      // 为啥不起作用呢
      setTimeout(async ()=>{
        await this.$update('/user',{...user,smsCode:7777});
      },2000);
 
      ctx.body = {
        code: 666,
        msg: "success",
        result: { 
          smsCode,
          phone: ctx.params.phone
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  // 添加一个用户
  async add(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let cTime = Date.now();
        let uTime = Date.now();
        let res = await $.post(this.url + "/user", {
          id: this.uuid(),
          cTime,
          uTime,
          ...data,
        });
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  } 
}
module.exports = new Service();
