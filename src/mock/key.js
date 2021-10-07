const Mock = require("mockjs");
// 传感器模拟接口
module.exports = () => {
  let mock = Mock.mock;
  let Random = Mock.Random;
  let list = [];
  for (var i = 1; i <= 10; i++) {
    list.push(madeObj());
  }

  function madeObj() {
    return mock({
      id: mock("@id"),
      "tag|1": ["超级用户", "普通用户"],
      authority: Random.integer(5, 10),
      "online|1": [true, false],
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
