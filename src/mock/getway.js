// 网关模拟接口
const getway = (ctx) => {
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
        "online|1": [true, false],
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
            month = this.month + mock(/[1,5]/);
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
};
