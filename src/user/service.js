const $ = require('axios');
const UUID = require("uuid");
const Common = require('../common/index');
class Service extends Common {
  constructor() {
    super('user');
  };

  async add(ctx) {
    let data = ctx.params;
    try {
      let createTime = Date.now();
      let updateTime = Date.now();
      let res = await $.post(this.url + '/user', {
        id: this.uuid(),
        createTime,
        updateTime,
        ...data,
      })
      ctx.body = {
        code: 666,
        msg: 'success',
        result: res.data
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error
      }
    }
  }

  async list(ctx) {
    let {
      _page,
      _limit
    } = ctx.params;
    let params = {
      _sort: 'updateTime',
      _order: 'desc',
      _page,
      _limit
    }
    try {
      let res = await $.get(this.url + '/user', {
        params
      });
      ctx.body = {
        code: 666,
        msg: 'success',
        result: res.data
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message
      }
    }
  }

  async all(ctx) {
    try {
      let res = await $.get(this.url + '/user');
      ctx.body = {
        code: 666,
        msg: 'success',
        result: res.data
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message
      }
    }
  }

  async edit(ctx) {
    try {
      ctx.params.updateTime = Date.now();
      let res = await $.put(this.url + '/user/' + ctx.params.id, ctx.params);
      ctx.body = {
        code: 666,
        msg: 'success',
        result: res.data
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message
      }
    }
  }

  async detail(ctx) {
    try {
      let res = await $.get(this.url + '/user/' + ctx.params.id);
      ctx.body = {
        code: 666,
        msg: 'success',
        result: res.data
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message
      }
    }
  }

  async del(ctx) {
    try {
      let res = await $.delete(this.url + '/user/' + ctx.params.id);
      ctx.body = ctx.body = {
        code: 666,
        msg: 'success',
        result: res.data
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message
      }
    }
  }

  async login(ctx) {  
    try {
      let res = await $.get(this.url+'/user',{params: ctx.params});
      if (res.data.length===0) {
        throw new Error('用户名或密码不正确');
      }
      ctx.body = {
        code: 666,
        msg: 'success',
        result: {
          ...res.data[0],
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjY3NzQ5MjgsImV4cCI6MTYyNjc3ODUyOCwibmFtZSI6ImFkbWluIiwiaWQiOjF9.768hPls5xL9L6GLXCiCtgqNteJy9Fg8R_k2ScrbAOR8'
        }
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message
      }
    }

    // ctx.body = {
    //   code: 666,
    //   msg: 'success',
    //   result: {
    //     "status": 200,
    //     "msg": "\u767b\u5f55\u6210\u529f",
    //     "url": "Index",
    //     "userid": 1,
    //     "username": "admin",
    //     "name": "\u8d85\u7ea7\u7ba1\u7406\u5458",
    //     "encryption": "tybC",
    //     "roleid": 1,
    //     "type": "success",
    //     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjY3NzQ5MjgsImV4cCI6MTYyNjc3ODUyOCwibmFtZSI6ImFkbWluIiwiaWQiOjF9.768hPls5xL9L6GLXCiCtgqNteJy9Fg8R_k2ScrbAOR8"
    //   }
    // }
  }
}
module.exports = new Service();