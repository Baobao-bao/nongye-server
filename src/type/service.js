
  const UUID = require("uuid");
  const $ = require('axios');
  class Service {
    constructor() {
      this.url = process.env.dbpath;
    };
  
    async add(ctx) {
      let data = ctx.params;
      try {
        let createTime = Date.now();
        let updateTime = Date.now();
        console.log(this.url);
        let res = await $.post(this.url + '/type', {
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
          msg: error.message
        }
      }
  
    }
  
    async all(ctx) {
      try {
        let res = await $.get(this.url + '/type');
        ctx.body =  {
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
  
    async list(ctx) {
      let {
        parentId
      } = ctx.params;
      let sort = {
        _sort: 'updateTime',
        _order: 'desc',
      }
  
      try {
        let res = await $.get(this.url + '/type', {
          params: {
            parentId,
            ...sort
          }
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
  
    async edit(ctx) { 
      try {
        let res = await $.put(this.url+'/type/'+ctx.params.id,ctx.params);
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
        let res = await $.get(this.url+'/type/'+ctx.params.id);
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
        let res = await $.delete(this.url + '/type/' + ctx.params.id);
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
