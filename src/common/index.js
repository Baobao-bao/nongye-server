const UUID = require("uuid");
const $ = require('axios');
class Utils {
    constructor(collName) {
        this.url = process.env.dbpath;
        this.coll = collName;
    }

    uuid() {
        return UUID.v1().replace(/(.*?)-(.*?)-.*/,'$1$2');
    }
    // 获取总页数
    async getTotalPage(query) {
        return new Promise(async (resolve,reject) =>{
            try {
                let res = await $.get(this.url + `/${this.coll}`,{params: query}); 
                resolve(res.data.length);
            } catch (error) {
                reject(error);
            }
        })
            
    }

    log() {
        console.log('<----------- '+ this.coll +' ----------->');
        for(let i=0;i<arguments.length;i++) {
            console.log(arguments[i]);
        }
        console.log('<----------- '+ this.coll +' ----------->');
    }

    get(url,data) {

    }
    post(url,data) {

    }
    put(url,data) {

    }
}

module.exports = Utils;