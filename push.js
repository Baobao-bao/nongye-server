let shell = require("shelljs");
let fs = require("fs");

let num = fs.readFileSync("num.txt");
num = num.toString();
num = Number(num) + 1;
fs.writeFileSync("num.txt", num);

console.log("执行 git add .");
shell.exec("git add .");

let msg = global.process.env.msg || "无";
console.log(`执行 "第${num}次提交"`);
shell.exec(`git commit -m"第${num}次提交, 备注信息:${msg}"`);

console.log("执行 git push");
shell.exec("git push origin master");
