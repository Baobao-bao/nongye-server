
  const $ = require('axios');
  const UUID = require("uuid");
  const Common = require('../common/index');
  class Service extends Common{
    constructor() {
      super('Device');
    };
  
    async add(ctx) {
      let data = ctx.params;
      try {
        let cTime = Date.now();
        let uTime = Date.now();
        let res = await $.post(this.url + '/Device', {
          id: UUID.v1(),
          cTime,
          uTime,
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
        let res = await $.get(this.url + '/Device',{params});
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
  
    async count(ctx) {
      try { 
        ctx.body = {
          code: 666,
          msg: 'success',
          data: {
            gateway: {
              LoRaWAN:1,
              LoRaPP: 1
            },
            group: 2
          }
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
        let res = await $.put(this.url + '/Device/' + ctx.params.id, ctx.params);
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
        let res = await $.get(this.url + '/Device/' + ctx.params.id);
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
        let res = await $.delete(this.url + '/Device/' + ctx.params.id);
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
