
  const $ = require('axios');
  const UUID = require("uuid");
  const Common = require('../common/index');
  const data = require('./data');
  const commentData = require('./comment');
  class Service extends Common{
    constructor() {
      super('Hourse');
    };


    around(ctx) {
      ctx.body = {
        code: 666,
        msg: 'success',
        result: data.body.around
      }
    }

    // 介绍
    introduction(ctx) {
      ctx.body = {
        code: 666,
        msg: 'success',
        result: data.body.detail
      }
    }

    // 评论
    comment(ctx) {
      ctx.body = commentData;
    }

    // 景点
    scene(ctx) {
      ctx.body = require('./scene');
    }

    // 城市
    city(ctx) {
      ctx.body = require('./city');
    }

    async add(ctx) {
      let data = ctx.params;
      try {
        let createTime = Date.now();
        let updateTime = Date.now();
        let res = await $.post(this.url + '/Hourse', {
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
      let {_page,_limit} = ctx.params;
      let params = {
        _sort:'updateTime',_order:'desc',
        // _page,
        // _limit
      }
      try {
        let res = await $.get(this.url + '/Hourse',{params});
        ctx.body = {
          code: 666,
          msg: 'success',
          result: res.data,
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
        let res = await $.get(this.url + '/Hourse');
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
        let res = await $.patch(this.url + '/Hourse/' + ctx.params.id, ctx.params);
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
        let res = await $.get(this.url + '/Hourse/' + ctx.params.id);
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
        let res = await $.delete(this.url + '/Hourse/' + ctx.params.id);
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
