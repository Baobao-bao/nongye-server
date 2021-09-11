
    // 负责查找数据
    const CommonModel = require("../common/commonModel");
    class Model extends CommonModel {
      constructor() {
        super("Upload");
    let attrs = {
      name: String,
      cTime: Number,
      uTime: Number
    };
    this.model = this.createModel(attrs);
  }

  add(data) {
    let promise = new Promise(async (resolve, reject) => {
      try {
        let cTime = Date.now();
        let uTime = Date.now();
        let model = this.model({
          ...data,
          cTime,
          uTime
        });
        let res = await model.save();
        resolve(this.handleData(res,'uploadId'));
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  all() {
    return new Promise(async (resovle, reject) => {
      try {
        let res = await this.model.find().sort({ cTime: -1 });
        resovle(this.handleData(res,'uploadId'));
      } catch (error) {
        reject(error);
      }
    });
  }

  list(query) {
    let { pageNum, pageSize } = query;
    let skipNum = (pageNum - 1) * pageSize;
    return new Promise(async (resovle, reject) => {
      let p1 = this.model.countDocuments();
      let p2 = this.model
        .find()
        .skip(skipNum)
        .sort({ cTime: -1 })
        .limit(pageSize);
      try {
        let res = await Promise.all([p1, p2]);
        let total = res[0];
        let list = this.handleData(res,'uploadId'[1]);
        let isEnd = list.length === 0 ? true : false;
        resovle({ total, pageNum, pageSize, list, isEnd });
      } catch (error) {
        reject(error);
      }
    });
  }

    /**
     * 可以根据id或者其他条件查询
     * @param {*} query
     */
    find(query) {
      return new Promise(async (resolve, reject) => {
        try {
          let { uploadId } = query;
          let res;
          if (uploadId) {
            res = await this.model.find({ _id: uploadId });
          } else {
            res = await this.model.find(query);
          }
          resolve(this.handleData(res,'uploadId'));
        } catch (error) {
          reject(error);
        }
      });
    }

      del(query) {
        let { uploadId } = query;
        return new Promise(async (resolve, reject) => {
          try {
            let res = await this.model.deleteMany({ _id: uploadId });
            resolve(res);
          } catch (error) {
            reject(error);
          }
        });
      }

      edit(query) {
        let {uploadId} = query;
        return new Promise(async (resolve, reject) => {
          try {
            let res = await this.model.updateOne({_id: uploadId},query);
            resolve(this.handleData(res,'uploadId'));
          } catch (error) {
            reject(error);
          }
        });
      }


    }

    module.exports = new Model();
  