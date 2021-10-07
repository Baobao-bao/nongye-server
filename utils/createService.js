module.exports = function createService(name) {
  let collName = name[0].toUpperCase() + name.slice(1);
  return `
  const $ = require('axios');
  const UUID = require("uuid");
  const Common = require('../common/index');
  class Service extends Common{
    constructor() {
      super('${collName}');
    };
  
    async add(ctx) {
      let data = ctx.params;
      try {
        let cTime = Date.now();
        let uTime = Date.now();
        let res = await $.post(this.url + '/${collName}', {
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
      let {pageSize,currPage} = ctx.params; 
      try {
        let res = await $.get(this.url + '/${collName}');
        let list = res.data;
        ctx.body = {
          code: 666,
          msg: 'success',
          data: list
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
        let res = await $.get(this.url + '/${collName}');
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
        let res = await $.put(this.url + '/${collName}/' + ctx.params.id, ctx.params);
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
        let res = await $.get(this.url + '/${collName}/' + ctx.params.id);
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
        let res = await $.delete(this.url + '/${collName}/' + ctx.params.id);
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
`;
};
