
const $ = require('axios');
const UUID = require("uuid");
const Common = require('../common/index');
class Service extends Common {
  constructor() {
    super('Love');
  };

  async change(ctx) {
    let data = ctx.params;
    try {
      let createTime = Date.now();
      let updateTime = Date.now();
      if (!ctx.user) {
        throw ({ message: 'token不存在或过期' });
      }
      // 判断是否已收藏
      let love = await this.$find('/love', { userId: ctx.user.id, houseId: data.houseId });
      let result;
      if (love.length > 0) {
        // 修改状态
        result = await this.$delById('/love', love[0].id);
      } else {
        let house = await this.$findById('/house', data.houseId);
        house = house[0];
        result = await this.$insert(this.url + '/Love', {
          // name: house.name,
          // description: house.description,
          // imageUrl: house.imageUrl,
          ...house,
          houseId: data.houseId,
          userId: ctx.user.id,
          phone: ctx.user.phone,
          id: UUID.v1(),
          createTime,
          updateTime,
          ...data,
        })
      }

      ctx.body = {
        code: 666,
        msg: 'success',
        result
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error
      }
    }
  }

  async list(ctx) {
    // let { _page, _limit } = ctx.params;

    try {
      let params = {
        _sort: 'updateTime', _order: 'desc',
        userId: ctx.user.id
        // _page,
        // _limit
      }
      if (!ctx.user) {
        throw ({
          message: 'token不存在或过期'
        })
      }
      let res = await $.get(this.url + '/Love', { params });
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
      let res = await $.get(this.url + '/Love');
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
      let res = await $.put(this.url + '/Love/' + ctx.params.id, ctx.params);
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
      let res = await $.get(this.url + '/Love/' + ctx.params.id);
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
      let res = await $.delete(this.url + '/Love/' + ctx.params.id);
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
