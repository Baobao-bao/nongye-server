const $ = require("axios");
const UUID = require("uuid");
const Common = require("../common/index");
const _ = require("lodash");
class Service extends Common {
  constructor() {
    super("Device");
  }

  async add(ctx) {
    let data = ctx.params;
    try {
      let cTime = Date.now();
      let uTime = Date.now();
      let res = await $.post(this.url + "/Device", {
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

  async sensorList(ctx) {
    let { _page, _limit } = ctx.params;
    let params = {
      _sort: "uTime",
      _order: "desc",
      _page,
      _limit,
    };
    try {
      let groupRes = await $.get(this.url + "/group");
      let groupList = groupRes.data;
      groupList = groupList.map((item) => item.groupName);

      let res = await $.get(this.url + "/sensor", { params });
      let list = res.data;
      let data = {};
       groupList.forEach(groupName => {
        let itemList = list.filter(item => groupName === item.devGroup);
        data[groupName] = itemList;
      });

      ctx.body = {
        code: 666,
        msg: "success",
        data: data,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }

  // 设备统计信息
  async count(ctx) {
    let p1 = this.$get(this.url + "/gateway");
    let p2 = this.$get(this.url + "/group");
    let p3 = this.$get(this.url + "/sensor");
    let [gatewayList, groupList, sensorList] = await Promise.all([p1, p2, p3]);
    let LoRaWANList = gatewayList.filter(
      (item) => item.agreement === "LoRaWAN"
    );
    let LoRaWAN = {
      total: LoRaWANList.length,
      online: _.size(LoRaWANList.filter((item) => item.online)),
      offline: _.size(LoRaWANList.filter((item) => !item.online)),
    };
    let LoRaPPList = gatewayList.filter((item) => item.agreement === "LoRaPP");
    let LoRaPP = {
      total: LoRaPPList.length,
      online: _.size(LoRaPPList.filter((item) => item.online)),
      offline: _.size(LoRaPPList.filter((item) => !item.online)),
    };
    let group = _.size(groupList);
    let sensor = {
      total: _.size(sensorList),
      online: _.size(sensorList.filter((item) => item.online)),
      offline: _.size(sensorList.filter((item) => !item.online)),
      lowBattery: _.size(sensorList.filter((item) => item.powerNum < 30)),
    };

    try {
      ctx.body = {
        code: 666,
        msg: "success",
        data: {
          LoRaWAN,
          LoRaPP,
          group,
          sensor,
        },
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
      let res = await $.put(this.url + "/Device/" + ctx.params.id, ctx.params);
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
      let res = await $.get(this.url + "/Device/" + ctx.params.id);
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
      let res = await $.delete(this.url + "/Device/" + ctx.params.id);
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
