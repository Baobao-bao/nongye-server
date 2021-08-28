
  const $ = require('axios');
  const UUID = require("uuid");
  const Common = require('../common/index');
  class Service extends Common{
    constructor() {
      super('Demo');
    };
  
    async add(ctx) {
      let data = ctx.params;
      try {
        let createTime = Date.now();
        let updateTime = Date.now();
        let res = await $.post(this.url + '/Demo', {
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
      // let params = {
      //   _sort:'updateTime',_order:'desc',
      //   _page,
      //   _limit
      // }
      // try {
      //   let res = await $.get(this.url + '/Demo',{params});
      //   ctx.body = {
      //     code: 666,
      //     msg: 'success',
      //     result: res.data
      //   };
      ctx.body = 1111;
      // } catch (error) {
      //   ctx.body = {
      //     code: 500,
      //     msg: error.message
      //   }
      // }
    }
  
    async all(ctx) {
      try {
        let res = await $.get(this.url + '/Demo');
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
        let res = await $.put(this.url + '/Demo/' + ctx.params.id, ctx.params);
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
        let res = await $.get(this.url + '/Demo/' + ctx.params.id);
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
        let res = await $.delete(this.url + '/Demo/' + ctx.params.id);
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
