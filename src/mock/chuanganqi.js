const Mock = require('mockjs');
// 传感器模拟接口
module.exports = () => {
  let mock = Mock.mock;
  let Random = Mock.Random;
  let list = [];
  for (var i = 1; i <= 40; i++) {
    list.push(madeObj());
  }

  function madeObj() {
    return mock({
      "id":mock('@id'),
      eui: mock(/\d[A-Z]{2}\d{8}/),
      // 频率
      mhz: `CN${mock(/\d{3}/)}-${mock(/\d{3}/)}`,
      "online|1": [true, false],
      country: "China",
      "agreement|1": ["LoRaPP", "LoRaWAN", "NB-IoT", "4G/2G"],
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
      "name|1": [
        "光照传感器",
        "二氧化碳传感器",
        "空气温湿度传感器",
        "土壤温湿度传感器",
        "气压传感器",
      ],
      devName: function () {
        return this.name.slice(0,-3);
      },
      devValue: function () {
        let name = this.name;
        switch (name) {
          case "二氧化碳传感器":
            return Random.integer(100, 300) + "ppm";
            break;
          case "空气温湿度传感器":
            return Random.integer(20, 100) + "%RH";
            break;
          case "土壤温湿度传感器":
            return Random.integer(20, 100) + "%RH";
            break;
          case "光照传感器":
            return Random.integer(1, 100) + "Lux";
            break;
          case "气压传感器":
            return Random.integer(10000, 90000) + "Pa";
            break;
        }
      },
      // 电量
      powerNum: Random.integer(0, 100),
      // 通道
      nums: mock(/[1-6]/),
      "devGroup|1": ["青岛市农业基地", "济南农业基地","潍坊农业基地","泰安农业基地","菏泽农业基地","威海农业基地"], 
      // 上报周期
      "loop|1": [1, 3, 5, 7],
    });
  }
  return list;
};
