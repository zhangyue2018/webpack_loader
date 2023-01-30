// raw loader 接收到content是Buffer数据(二进制数据)
// 处理图片、字体图标等
// module.exports = function(content) {
//     console.log('raw--loader---:', content);
//     return content;
// }
// module.exports.raw = true;

// 第二种写法

function test3Loader(content) {
    console.log('raw--loader---:', content);
    return content;
}
test3Loader.raw = true;

module.exports = test3Loader;