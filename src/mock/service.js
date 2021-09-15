const $ = require("axios");
const UUID = require("uuid");
const Common = require("../common/index");
const Mock = require("mockjs");
class Service extends Common {
  constructor() {
    super("Mock");
  }

  async add(ctx) {
    let data = ctx.params;
    try {
      let cTime = Date.now();
      let uTime = Date.now();
      let res = await $.post(this.url + "/Mock", {
        id: UUID.v1(),
        cTime,
        uTime,
        ...data,
      });
      ctx.body = {
        code: 666,
        msg: "success",
        data: res.data,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error,
      };
    }
  }

  async list(ctx) {
    let { _page, _limit } = ctx.params;
    let params = {
      _sort: "uTime",
      _order: "desc",
      _page,
      _limit,
    };
    try {
      let mock = Mock.mock;
      let Random = Mock.Random;
      let list = [];
      for (var i = 1; i <= 20; i++) {
        list.push(madeObj());
      }

      function madeObj() {
        return mock({
          eui: mock(/[A-Z]{2}\d{9}/),
          name: "智慧农业-网关",
          mhz: `CN${mock(/\d{3}/)}-${mock(/\d{3}/)}`,
          "online|1": ["在线", "下线"],
          country: "China",
          "agreement|1": ["LoRaPP", "LoRaWAN"],
          year: Random.integer(2010, 2020),
          month: Random.integer(1, 12),
          date: function () {
            var big = [1, 3, 5, 7, 8, 10, 12];
            if (big.includes(this.month)) {
              return Random.integer(1, 31);
            } else if (this.month === 2) {
              return Random.integer(1, 28);
            } else {
              return Random.integer(1, 30);
            }
          },
          time: Random.time("HH:mm:ss"),
          bTime: function () {
            return `${this.year}/${this.month}/${this.date} ${this.time}`;
          },
          uploadTime: function () {
            var month;
            var year = this.year;
            if (this.month < 12) {
              month = this.month + mock(/[1-5]/)*1;
            }
            if (month > 12) {
              month -= 12;
              year += 1;
            }

            return `${year}/${month}/${this.date} ${this.time}`;
          },
          desc: "用于智慧农业的网关设备",
        });
      }
      ctx.body = list;
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  async all(ctx) {
    try {
      let res = await $.get(this.url + "/Mock");
      ctx.body = {
        code: 666,
        msg: "success",
        data: res.data,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  async edit(ctx) {
    try {
      ctx.params.uTime = Date.now();
      let res = await $.put(this.url + "/Mock/" + ctx.params.id, ctx.params);
      ctx.body = {
        code: 666,
        msg: "success",
        data: res.data,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  async detail(ctx) {
    try {
      let res = await $.get(this.url + "/Mock/" + ctx.params.id);
      ctx.body = {
        code: 666,
        msg: "success",
        data: res.data,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  async del(ctx) {
    try {
      let res = await $.delete(this.url + "/Mock/" + ctx.params.id);
      ctx.body = ctx.body = {
        code: 666,
        msg: "success",
        data: res.data,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
}
module.exports = new Service();
