

const Mock = require("mockjs");
// 传感器模拟接口
module.exports = () => {
  let mock = Mock.mock;
  let Random = Mock.Random;
  let list = [];
  for (var i = 1; i <= 4; i++) {
    list.push(madeObj());
  }

  function madeObj() {
    return mock({
      id: mock("@id"),  
      name: '空气温湿度',
      "unit": 'RH',
      cTime: function () {
        let d1 = new Date("2019-1-1");
        d1 = d1.getTime();
        let d2 = Date.now();
        let time = Random.integer(d1, d2);
        return time;
      },
      uTime: function () {
        return this.bTime;
      },
    });
  }
  return list;
};
