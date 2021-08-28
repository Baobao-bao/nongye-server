
  const $ = require('axios');
  const UUID = require("uuid");
  const Common = require('../common/index');
  const shell = require('shelljs');
  class Service extends Common{
    constructor() {
      super('Deploy');
    };
  
    async index(ctx) {
      let obj = new Promise((resolve,reject)=> {
        try {
          console.log('git checkout .');
          shell.exec('git checkout .');
          console.log('git pull origin master');
          shell.exec('git pull origin master');
          console.log('pm2 restart villa2-server');
          shell.exec('pm2 restart villa2-server');
          console.log('pm2 restart villa2-json');
          shell.exec('pm2 restart villa2-json');
          resolve('部署成功');
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })
     
      try {
        await obj;
        ctx.body = '部署成功';
      } catch (error) {
        ctx.body = error.message;
      }
    }
  
    async list(ctx) {  
      console.log(this.getTotalPage());
      let {_page,_limit} = ctx.params;
      let params = {
        _sort:'updateTime',_order:'desc',
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
        ctx.params.updateTime = Date.now();
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
