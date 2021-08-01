const jsonServer = require('json-server');
const $db = require(__dirname + "/db.json");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router($db); 

server.use(router);
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.listen(9005, () => {
    console.log('服务已启动, 在 http://localhost:9005');
});