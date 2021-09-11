
  const $ = require('axios');
  const UUID = require("uuid");
  const Common = require('../common/index');
  const shell = require('shelljs');
  class Service extends Common{
    constructor() {
      super('Deploy');
    };
  
    async index(ctx) { 
      shell.exec('git pull origin master');
      shell.exec('pm2 stop nongye-server');
      shell.exec('pm2 start nongye-server');
      // shell.exec('pm2 restart villa2-json');
      ctx.body = '部署中........';
    }
  
    async list(ctx) {  
      console.log(this.getTotalPage());
      let {_page,_limit} = ctx.params;
      let params = {
        _sort:'uTime',_order:'desc',
        _page,
        _limit
      }
      try {
        let res = await $.get(this.url + '/Deploy',{params});
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
        let res = await $.get(this.url + '/Deploy');
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
        ctx.params.uTime = Date.now();
        let res = await $.put(this.url + '/Deploy/' + ctx.params.id, ctx.params);
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
        let res = await $.get(this.url + '/Deploy/' + ctx.params.id);
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
        let res = await $.delete(this.url + '/Deploy/' + ctx.params.id);
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
