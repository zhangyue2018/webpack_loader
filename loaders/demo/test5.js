module.exports = function(content) {
    console.log('normal loader 5');
    return content;
}

module.exports.pitch = function() {
    console.log('pitch loader 5');
    return 'result'; // 熔断机制, pitch loader 6, normal loader 6, normal loader 5都不执行，直接执行normal loader 4
}