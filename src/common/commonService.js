// const mongojs = require("mongojs");
const _ = require("lodash");

// 公共类
class Common {
  // module 模块
  constructor(coll) {
    if (!coll) {
      throw new Error("缺少模块名称");
    }
    this.coll = coll;
    this.pageSize = 5;
  }

  // 把字符串类型的id变成ObjectId类型
  ObjectId(id) {
    return mongojs.ObjectId(id);
  }

  /**
   *
   * @param {*} attr 排序的字段
   * @param {*} num 1升序 或 -1倒序
   */
  sort(attr, num) {
    attr = attr || "updateDate";
    num = num || "-1";
    return { [attr]: num };
  }

  // 查询数量
  count(query, coll) {
    query = query || {};
    coll = coll || this.coll;
    return new Promise((resove, reject) => {
      db[coll].countDocuments(query, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resove(doc);
        }
      });
    });
  }

  /**
   * 添加数据
   * @param {object} data 要插入的数据
   */
  insert(data, coll) {
    coll = coll || this.coll;
    let promise = new Promise((resolve, reject) => {
      // 操作数据库
      db[this.coll].insert(data, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });

    return promise;
  }

  // 删除
  removeById(_id) {
    return new Promise((resolve, reject) => {
      let query = {
        // _id需要转换成ObjectId类型
        _id: this.ObjectId(_id)
      };
      db[this.coll].remove(query, true, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  update(query, data) {
    return new Promise((resolve, reject) => {
      db[this.coll].update(
        query,
        {
          $set: data
        },
        (err, doc) => {
          if (err) {
            reject(err);
          } else {
            resolve(doc);
          }
        }
      );
    });
  }

  /**
   * 根据条件查询
   * @param {object} query 查询条件
   * @param {string} coll 集合名称
   */
  find(query, coll) {
    coll = this.coll || this.coll;
    return new Promise((resolve, reject) => {
      db[coll].find(query, (err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  findOne(query, coll) {
    coll = this.coll || this.coll;
    return new Promise((resolve, reject) => {
      db[coll].findOne(query, (err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  /**
   * 查询所有
   * @param {string} coll 集合名称
   */
  findAll(coll) {
    coll = coll || this.coll;
    return new Promise((resolve, reject) => {
      db[coll].find((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  handleId(data, idName) {
    let isArray = _.isArray(data);
    if (isArray) {
      return data.map(item => {
        return {
          ...item,
          [idName]: item._id,
          _id: undefined
        };
      });
    } else {
      return {
        ...data,
        [idName]: data._id,
        _id: undefined
      };
    }
  }

  /**
   * 从一个列表里返回所需的字段
   * @param {需要的属性} attrs
   * @param {要处理的列表} list
   */
  handleList(attrs, list) {
    let newList = list.map(item => {
      let obj = {};
      attrs.forEach(attr => {
        obj[attr] = item[attr];
      });
      return obj;
    });
    return newList;
  }
  /**
   *
   * @param {*} _id
   * @param {*} coll 集合,需要的时候传进来
   */
  findById(_id, coll) {
    coll = coll || this.coll;
    return new Promise((resolve, reject) => {
      db[coll].findOne(
        {
          _id: this.ObjectId(_id)
        },
        (err, doc) => {
          if (err) {
            reject(err);
          } else {
            resolve(doc);
          }
        }
      );
    });
  }

  /**
   * @param {array} attrs 要检查的字段
   * @param {*} ctx
   */
  checkAttr(attrs, ctx) {
    let params = ctx.params;
    let res = attrs.find(attr => {
      return (
        params[attr] === "undefined" ||
        params[attr] === undefined ||
        params[attr] === ""
      );
    });

    if (res) {
      return {
        code: 600,
        msg: `缺少${res}`
      };
    } else {
      return false;
    }
  }

  /**
   * 转换id数据方法
   * @param {转换的数据} data
   * @param {需要转换的形式} idName
   */
  handleId(data, idName) {
    let isArray = _.isArray(data);
    if (isArray) {
      return data.map(item => {
        return {
          ...item,
          [idName]: item._id,
          _id: undefined
        };
      });
    } else {
      return {
        ...data,
        [idName]: data._id,
        _id: undefined
      };
    }
  }

  /**
   * 从一个列表里返回所需的字段
   * @param {需要的属性} attrs
   * @param {要处理的列表} list
   */
  handleList(attrs, list) {
    let newList = list.map(item => {
      let obj = {};
      attrs.forEach(attr => {
        obj[attr] = item[attr];
      });
      return obj;
    });
    return newList;
  }

  /**
   * 从详情里获取所需的字段
   * @param {*} attrs
   * @param {*} detail
   */
  handleDetail(attrs, detail) {
    let newDetail = {};
    attrs.forEach(attr => {
      newDetail[attr] = detail[attr];
    });
    return newDetail;
  }

  /**
   * 封装成功的信息
   * @param {object或array} data
   * @param {string} msg 信息
   * @param {string} dataName 数据的名称
   */
  successInfo(data, msg, dataName) {
    // 判断data的数据类型是不是数组
    let isArray = _.isArray(data);
    // 不传入数据的名称
    if (!dataName) {
      dataName = isArray ? "list" : "result";
    }
    let idName = this.coll.toLowerCase() + "Id";
    if (isArray) {
      data = data.map(item => {
        return {
          ...item._doc,
          // 本来就存在xxxId
          [idName]: item._doc[idName] || item._id,
          __v: undefined,
          _id: undefined
        };
      });
    } else {
      data = {
        ...data._doc,
        [idName]: data._id,
        __v: undefined,
        _id: undefined
      };
    }
    return {
      code: 666,
      msg: msg || "success",
      [dataName]: data
    };
  }

  /**
   * 处理数据返回的数据
   * @param {*} data
   */
  handleData(data, idName) {
    // 判断data的数据类型是不是数组
    let isArray = _.isArray(data);
    idName = idName || this.coll.toLowerCase() + "Id";
    if (isArray) {
      data = data.map(item => {
        return {
          ...item._doc,
          // 本来就存在xxxId
          [idName]: item._doc[idName] || item._id,
          __v: undefined,
          _id: undefined
        };
      });
    } else {
      data = {
        ...data._doc,
        [idName]: data._id,
        __v: undefined,
        _id: undefined
      };
    }
    return data;
  }

  /**
   *
   * @param {*} data 返回的数据
   * @param {*} name 数据名称
   */
  handleRes(data, name) {
    let isArray = _.isArray(data);
    if (isArray) {
      name = name || "list";
      return {
        code: 666,
        msg: "success",
        [name]: data
      };
    } else {
      name = name || "result";
      return {
        code: 666,
        msg: "success",
        [name]: data
      };
    }
  }

  errInfo(error) {
    const errorCode = {
      "604": "对象不存在",
      "601": "字段校验失败",
      "600": "其他错误"
    };

    console.log("错误信息", error);
    let { errcode, message, name } = error;
    switch (name) {
      case "ValidationError":
        errcode = 601;
        let str = message.match(/`.*?`/);
        message = "缺少" + str[0];
        break;
      default:
        errcode = 600;
    }
    return {
      code: errcode,
      msg: message
    };
  }

  log(data, data2) {
    console.log("|----------- " + this.coll + "Service.js -----------|");
    console.log("                                                ");
    console.log(data, data2 || "");
    console.log("                                                ");
    console.log("|----------- " + this.coll + "Service.js -----------|");
  }
}

module.exports = Common;
