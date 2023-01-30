/*
loader就是一个函数
当webpack解析资源时，会调用相应的loader去处理
loader接收到文件内容作为参数，返回内容出去
 */
// module.exports = function(content) {
//     console.log('------content----', content);
//     return content;
// }

/**
 * content 文件的内容
 * map sourceMap
 * meta 别的loader传递的数据
 */
module.exports = function(content, map, meta) {
    console.log('------content----', content);
    return content;
}