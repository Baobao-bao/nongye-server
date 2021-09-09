const app = {
  name: "nongye-server",
  script: "./app.js",
  watch: true,
  env: {
    PORT: 3005,
    publicPath: "localhost:4000",
    NODE_ENV: "development",
    DB_ADDR: "rwany:rwany123456@132.232.87.95/template?authSource=admin"
  },
  env_production: {
    PORT: 3005,
    publicPath: "132.232.94.151:4000",
    NODE_ENV: "production",
    DB_ADDR: "rwany:rwany123456@132.232.94.151/template?authSource=admin"
  }
};

module.exports = {
  apps: app
};
