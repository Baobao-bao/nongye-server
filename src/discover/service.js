
  const $ = require('axios');
  const UUID = require("uuid");
  const Common = require('../common/index');
  class Service extends Common{
    constructor() {
      super('Discover');
    };
  
    async add(ctx) {
      let data = ctx.params;
      try {
        let createTime = Date.now();
        let updateTime = Date.now();
        let res = await $.post(this.url + '/Discover', {
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
      let {pageSize=7,pageNum=1,kind} = ctx.params;
      let kindObj = {
        "01":'推荐•路线',
        "02":'精品•美墅',
        "03":'优惠•活动',
      }
      let params = {
        _sort:'updateTime',_order:'desc',
        _page:pageNum,
        _limit:pageSize,
        kind: kindObj[kind]
      }
      try {
        let res = await $.get(this.url + '/Discover',{params});
        ctx.body = {
          pageNum,
          pageSize,
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
        let res = await $.get(this.url + '/Discover');
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
        let res = await $.put(this.url + '/Discover/' + ctx.params.id, ctx.params);
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
        let res = await $.get(this.url + '/Discover/' + ctx.params.id);
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
        let res = await $.delete(this.url + '/Discover/' + ctx.params.id);
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
