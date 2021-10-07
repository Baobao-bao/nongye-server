const UUID = require("uuid");
const jwt = require("jsonwebtoken");
const $ = require("axios");
const service = $.create({
  baseURL: process.env.dbpath,
});
service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    return Promise.reject(error);
  }
);

class Utils {
  constructor(collName) {
    this.url = process.env.dbpath;
    this.coll = collName;
  }

  /**
   * 分页
   */
  pageing(list, currPage, pageSize) {
    currPage=!!currPage?currPage:1;
    pageSize=!!pageSize?pageSize:5;
    return list.slice(
      (currPage - 1) * Number(pageSize),
      (currPage - 1) * Number(pageSize) + Number(pageSize)
    );
  }

  filterByDate(list, date) {
    if (!!date) {
      let index = date.indexOf("-");
      let date1 = date.slice(0, index);
      let date2 = date.slice(index + 1);
      return list.filter((item) => {
        return item.bTime >= date1 && item.bTime <= date2;
      });
    } else {
      return list;
    }
  }

  /**
   * 过滤列表
   * @param {*} obj 要过滤的属性
   */
  filterList(list, attrObj) {
    let newList = list;
    for (let key in attrObj) {
      let value = attrObj[key];
      if (typeof value !== "boolean") {
        // vale值为undefined或者'all'的不进行过滤
        if (!!value && value !== "all") {
          newList = filterFn(key);
        }
      } else {
        // 布尔类型执行判断
        newList = filterFn(key);
      }
    }

    function filterFn(key) {
      // 值带有key
      if (key.includes("key")) {
        // 原来的key
        let originkey = key.slice(0, -3);
        return newList.filter((item) => item[originkey].includes(attrObj[key]));
      } else {
        return newList.filter((item) => item[key] === attrObj[key]);
      }
    }
    return newList;
  }

  /**
   * 添加token
   * @param {object} userInfo
   */
  getToken(userInfo) {
    let secret = "nongye"; // 指定密钥
    // 生成token
    let token = jwt.sign(userInfo, secret, {
      expiresIn: "1000h",
    });
    return token;
  }

  uuid() {
    return UUID.v1().replace(/(.*?)-(.*?)-.*/, "$1$2");
  }
  // 获取总页数
  async getTotalPage(query) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await $.get(this.url + `/${this.coll}`, { params: query });
        resolve(res.data.length);
      } catch (error) {
        reject(error);
      }
    });
  }

  log() {
    console.log("<----------- " + this.coll + " ----------->");
    for (let i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
    console.log("<----------- " + this.coll + " ----------->");
  }
  $get(url, data) {
    return service.get(url, { params: data });
  }
  $patch() {
    return service.patch;
  }
  $put() {
    return service.put;
  }

  $post(url, data) {
    return service.post(url, data);
  }

  $insert(url, data) {
    return service.post(url, data);
  }

  $find(url, data = {}) {
    return service.get(url, { params: data });
  }

  $findById(url, id) {
    return service.get(url + "?id=" + id);
  }
  $update(url, data) {
    console.log(data.id);
    return service.patch(url + `/${data.id}`, data);
  }
  $replace(url, data) {
    return service.put(url + `/${data.id}`, data);
  }
  $del(url, id) {
    return service.delete(url + `/${id}`);
  }
  $delById(url, id) {
    return service.delete(url + `/${id}`);
  }
}

module.exports = Utils;
