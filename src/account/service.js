
  const $ = require('axios');
  const UUID = require("uuid");
  const Common = require('../common/index');
  class Service extends Common{
    constructor() {
      super('Account');
    };
  
    async add(ctx) {
      let data = ctx.params;
      try {
        let cTime = Date.now();
        let uTime = Date.now();
        let lTime = Date.now();
        let res = await $.post(this.url + '/Account', {
          id: UUID.v1(),
          cTime,
          uTime,
          lTime,
          ...data,
        }) 
        ctx.body = {
          code: 666,
          msg: 'success',
          data: res.data
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
        _sort:'uTime',_order:'desc',
        _page,
        _limit
      }
      try {
        let res = await $.get(this.url + '/Account',{params});
        ctx.body = {
          code: 666,
          msg: 'success',
          data: res.data
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
        let res = await $.get(this.url + '/Account');
        ctx.body = {
          code: 666,
          msg: 'success',
          data: res.data
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
        ctx.params.uTime = Date.now();
        let res = await $.put(this.url + '/Account/' + ctx.params.id, ctx.params);
        ctx.body = {
          code: 666,
          msg: 'success',
          data: res.data
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
        let res = await $.get(this.url + '/Account/' + ctx.params.id);
        ctx.body = {
          code: 666,
          msg: 'success',
          data: res.data
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
        let res = await $.delete(this.url + '/Account/' + ctx.params.id);
        ctx.body = ctx.body = {
          code: 666,
          msg: 'success',
          data: res.data
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
