const mockjs = require("mockjs");
var Mock = require("mockjs");

let mock = Mock.mock;
let Random = Mock.Random;
let list = [];
for(var i=1;i<=3;i++) {
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
    bTime: `${Random.integer(2010, 2021)} ${Random.time('HH:mm:ss')}`,
    uploadTime: `${Random.integer(2010, 2021)} ${Random.time('HH:mm:ss')}`,
    desc: '用于智慧农业的网关设备',
  })
}

console.log(list);
