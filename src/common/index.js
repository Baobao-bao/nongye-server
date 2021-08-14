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
   * 添加token
   * @param {object} userInfo
   */
  getToken(userInfo) {
    let secret = "fresh"; // 指定密钥
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

  $post(url, data) {
    return service.post(url, data);
  }

  $insert(url, data) {
    return service.post(url, data);
  }
  
  $find(url, data) {
    return service.get(url, { params: data });
  }
  $update(url, data) {
    return service.put(url + `/${data.id}`, data);
  }
  $replace(url, data) {
    return service.patch(url + `/${data.id}`, data);
  }
  $del(url, data) {
    return service.delete(url + `/${data.id}`, data);
  }
}

module.exports = Utils;
