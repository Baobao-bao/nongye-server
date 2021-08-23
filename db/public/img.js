var imgs = document.querySelectorAll("img");
imgs = Array.from(imgs);
var htmlStr = '';
imgs.forEach((item) => {
  var url = `![](${item.src})\n`
  htmlStr+=url;
});
console.log(htmlStr);