const $ = require('axios');
const UUID = require("uuid");
const Common = require('../common/index');
class Service extends Common {
  constructor() {
    super('Product');
  };

  async add(ctx) {
    let data = ctx.params;
    try {
      let createTime = Date.now();
      let updateTime = Date.now();
      let res = await $.post(this.url + '/Product', {
        id: UUID.v1(),
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
      currPage = 1, pageSize = 5,keyword=""
    } = ctx.params;
    this.log(ctx.params);
    let params = {
      _sort: 'updateTime',
      _order: 'desc',
      q:keyword,
      _page: currPage,
      _limit: pageSize
    }
    try {
      let count = await this.getTotalPage({q:keyword});
      let res = await $.get(this.url + '/Product', {
        params
      });
      ctx.body = {
        code: 666,
        pageSize: pageSize * 1,
        currPage: currPage * 1,
        totalPage: count,
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
      let res = await $.get(this.url + '/Product');
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
      let res = await $.put(this.url + '/Product/' + ctx.params.id, ctx.params);
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

  // 修改上下架状态
  async changeStatus(ctx) {
    try {
      ctx.params.updateTime = Date.now();
      let res = await $.patch(this.url + '/Product/' + ctx.params.id, ctx.params);
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
      let res = await $.get(this.url + '/Product/' + ctx.params.id);
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
      let res = await $.delete(this.url + '/Product/' + ctx.params.id);
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
}
module.exports = new Service();