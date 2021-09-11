
  const $ = require('axios');
  const UUID = require("uuid");
  const Common = require('../common/index');
  const data = require('./data');
  const commentData = require('./comment');
  class Service extends Common{
    constructor() {
      super('house');
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

    async loveList(ctx) {
      try {
        let res = await this.$find('/house',{love: true});
        console.log(res);
        ctx.body = {
          code: 666,
          msg:'success',
          result: res
        }
      } catch (error) {
        console.log(error);
        ctx.body = {
          code: 500,
          msg: error
        }
      }
    }

    async add(ctx) {
      let data = ctx.params;
      try {
        let cTime = Date.now();
        let uTime = Date.now();
        let res = await $.post(this.url + '/house', {
          id: UUID.v1(),
          cTime,
          uTime,
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
        _sort:'uTime',_order:'desc',
        // _page,
        // _limit
      }
      try {
        let res = await $.get(this.url + '/house',{params});
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
        let res = await $.get(this.url + '/house');
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
        let res = await $.patch(this.url + '/house/' + ctx.params.id, ctx.params);
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
        let res = await $.get(this.url + '/house/' + ctx.params.id);
        let loveRes = await this.$find('/love',{houseId:ctx.params.id});
        let love = loveRes.length>0?true:false;
        ctx.body = {
          code: 666,
          msg: 'success',
          result: {
            love,
            ...res.data, 
          }
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
        let res = await $.delete(this.url + '/house/' + ctx.params.id);
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
