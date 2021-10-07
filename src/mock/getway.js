const Mock = require("mockjs");
// 网关模拟接口
const getway = (ctx) => {
  // let { _page, _limit } = ctx.params;
  // let params = {
  //   _sort: "uTime",
  //   _order: "desc",
  //   _page,
  //   _limit,
  // };
  try {
    let mock = Mock.mock;
    let Random = Mock.Random;
    let list = [];
    for (var i = 1; i <= 15; i++) {
      list.push(madeObj());
    }

    function madeObj() {
      return mock({
        id: mock("@id"),
        eui: mock(/[A-Z]{2}\d{9}/),
        name: "智慧农业-网关",
        mhz: `CN${mock(/\d{3}/)}-${mock(/\d{3}/)}`,
        "online|1": [true, false],
        country: "China",
        "agreement|1": ["LoRaPP", "LoRaWAN"],
        // 随机日期
        bTime: function () {
          let d1 = new Date("2019-1-1");
          d1 = d1.getTime();
          let d2 = Date.now();
          let time = Random.integer(d1, d2);
          return time;
        },
        uTime: function () {
          return this.bTime; 
        },
        desc: "用于智慧农业的网关设备",
      });
    }
    return list;
  } catch (error) {
    console.log(error);
    return [];
    // ctx.body = {
    //   code: 500,
    //   msg: error.message,
    // };
  }
};

module.exports = getway;
