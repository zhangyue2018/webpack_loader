// 异步loader
module.exports = function(content, map, meta) {
    console.log(2222);
    const callback = this.async();
    setTimeout(() => {
        console.log('test2');
        callback(null, content, map, meta); // 调用callback：执行下一个loader
    }, 1000);
    console.log(33333);
    console.log(44444);
}