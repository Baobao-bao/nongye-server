
  // upload模块控制器
    const CommonController = require("./commonController");
    const Model = require("../appModel/uploadModel");

    class Controller extends CommonController {
      constructor() {
        super("Upload");
        this.model = Model;
      }

      add(data) {
        return this.model.add(data);
      }

      all() {
       return this.model.all();
      }

      list(query) {
        return this.model.list(query);
      }

      edit(query) {
        return this.model.edit(query);
      }

      detail(query) {
        return this.model.find(query);
      }
      
      find(query) {
        return this.model.find(query);
      }

      del(query) {
        return this.model.del(query);
      }
    }

    module.exports = new Controller();
  