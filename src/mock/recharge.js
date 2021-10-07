const Mock = require('mockjs');
// 传感器模拟接口
module.exports = () => {
  let mock = Mock.mock;
  let Random = Mock.Random;
  let list = [];
  for (var i = 1; i <= 50; i++) {
    list.push(madeObj());
  }

  function madeObj() {
    return mock({
      "id":mock('@id'), 
      "amount": function() {
       if(this.type ==='recharge') {
        let money = Random.integer(500,10000)
        return Math.round(money/100)*100;
       } else {
        return -200;
       }
      },
      "type|1": ["recharge","usege"],
      desc: Random.csentence( 5,10),
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
    })
  }
  return list;
};
