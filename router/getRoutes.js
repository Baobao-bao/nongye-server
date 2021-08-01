const fs = require("fs");
const path = require("path");
const getRoutes = () => {
  const moduleRoutes = [];
  const files = fs.readdirSync(path.resolve(__dirname, "./modules"));
  files.forEach(function(item) {
    let route = require("./modules/" + item);
    moduleRoutes.push(route);
  });
  return moduleRoutes;
};

module.exports = getRoutes;
