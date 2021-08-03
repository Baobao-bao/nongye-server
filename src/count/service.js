const $ = require('axios');
const UUID = require("uuid");
const Common = require('../common/index');
class Service extends Common {
  constructor() {
    super('Count');
  };

  async add(ctx) {
    let data = ctx.params;
    try {
      let createTime = Date.now();
      let updateTime = Date.now();
      let res = await $.post(this.url + '/Count', {
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
    console.log(this.getTotalPage());
    let {
      _page,
      _limit
    } = ctx.params;
    let params = {
      _sort: 'updateTime',
      _order: 'desc',
      _page,
      _limit
    }
    try {
      let res = await $.get(this.url + '/Count', {
        params
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

  async all(ctx) {
    try { 
      ctx.body = {
        code: 666,
        msg: 'success',
        result: {
          "weekData": [120, 200, 150, 80, 70, 110, 130],
          "yearData": [1202, 3046, 1025, 445, 2822, 3848, 499, 2594, 2065, 2545, 3224, 1099],  
          "orderData": [{
            "id": 1,
            "name": "本周订单总数",
            "count": "860"
          },{
            "id": 2,
            "name": "本月订单总数",
            "count": "3600"
          }, {
            "id": 3,
            "name": "本季订单总数",
            "count": "12360"
          }, {
            "id": 4,
            "name": "本年度订单总数",
            "count": "258677"
          }]
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
      ctx.params.updateTime = Date.now();
      let res = await $.put(this.url + '/Count/' + ctx.params.id, ctx.params);
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
      let res = await $.get(this.url + '/Count/' + ctx.params.id);
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
      let res = await $.delete(this.url + '/Count/' + ctx.params.id);
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