let port = process.env.PORT;
// 不是通过pm2启动,就没有配置端口,在下面这里来配置
if (!port) {
  let config = require("../pm2.config");
  if (process.env.NODE_ENV === "production") {
    process.env = {
      dbpath: 'http://localhost:9007',
      ...process.env,
      ...config.apps["env_production"],
      serverName: config.apps["name"]
    };
  } else {
    process.env = {
      dbpath: 'http://localhost:9007',
      ...process.env,
      serverName: config.apps["name"],
      ...config.apps["env"]
    };
  }
}
