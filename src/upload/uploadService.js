const fs = require("fs");
const path = require("path");
const CommonService = require("../common/commonService");
const Controller = require("../appController/uploadController");

class Service extends CommonService {
  constructor() {
    super("Upload");
    this.controller = Controller;
  }

  async one(ctx) {
    try {
      const file = ctx.request.files.file;
      let fileName = file.name;
      // 创建可读流
      const render = fs.createReadStream(file.path);
      let filePath = path.join(__dirname, "../public/images/", fileName);
      const upStream = fs.createWriteStream(filePath);
      render.pipe(upStream);
      let imgUrl = "http://" + process.env.publicPath + "/images/" + fileName;
      ctx.body = {
        code: 666,
        msg: "上传成功",
        result: {
          imgUrl
        }
      };
    } catch (error) {
      ctx.body = this.errInfo(error);
    }
  }

  async add(ctx) {
    try {
      let res = await this.controller.add(ctx.params);
      ctx.body = this.handleRes(res);
    } catch (error) {
      ctx.body = this.errInfo(error);
    }
  }

  async all(ctx) {
    try {
      let res = await this.controller.all();
      ctx.body = this.handleRes(res);
    } catch (error) {
      ctx.body = this.errInfo(error);
    }
  }

  async list(ctx) {
    let result = this.checkAttr(["pageNum"], ctx);
    if (result) {
      ctx.body = result;
      return false;
    }
    try {
      let { pageNum = 1, pageSize = this.pageSize } = ctx.params;
      let query = {
        pageNum,
        pageSize
      };
      let res = await this.controller.list(query);
      ctx.body = {
        ...res,
        code: 666,
        msg: "success"
      };
    } catch (error) {
      ctx.body = this.errInfo(error);
    }
  }

  async edit(ctx) {
    let result = this.checkAttr(["uploadId"], ctx);
    if (result) {
      ctx.body = result;
      return false;
    }

    try {
      let res = await this.controller.edit(ctx.params);
      ctx.body = this.handleRes(res);
    } catch (error) {
      ctx.body = this.errInfo(error);
    }
  }

  async detail(ctx) {
    let result = this.checkAttr(["uploadId"], ctx);
    if (result) {
      ctx.body = result;
      return false;
    }

    try {
      let { uploadId } = ctx.params;
      let res = await this.controller.detail({
        uploadId
      });
      ctx.body = this.handleRes(res);
    } catch (error) {
      ctx.body = this.errInfo(error);
    }
  }

  async del(ctx) {
    let result = this.checkAttr(["uploadId"], ctx);
    if (result) {
      ctx.body = result;
      return false;
    }
    try {
      let { uploadId } = ctx.params;
      let res = await this.controller.del({
        uploadId
      });
      ctx.body = this.handleRes(res);
    } catch (error) {
      ctx.body = this.errInfo(error);
    }
  }
}
module.exports = new Service();
