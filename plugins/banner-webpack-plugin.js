class BannerWebpackPlugin {

    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        // 资源输出之前触发
        compiler.hooks.emit.tapAsync('BannerWebpackPlugin', (compilation, callback) => {
            debugger;
            const extensionsReg = /\.(css|js)/;
            // 1.获取即将输出的资源文件：compilation.assets
            // 2.过滤只保留js和css资源
            // 返回值resAssets是一个数组
            const resAssets = Object.keys(compilation.assets).filter(key => extensionsReg.test(key));
            // 3.遍历剩下资源，添加上注释
            const prefix = `/*
* Author:${this.options.author}
*/
`;
            resAssets.forEach(asset => {
                // 获取原来内容
                let source = compilation.assets[asset].source();
                // 拼接上注释
                let content = prefix + source;
                // 修改资源
                compilation.assets[asset] = {
                    // 最终资源输出时，调用source方法。source方法的返回值就是资源的具体内容
                    source() {
                        return content;
                    },
                    // 资源的大小
                    size() {
                        return content.length; // 内容有多少字节(byte)
                    }
                }
            });
            callback();
        });
    }
}

module.exports = BannerWebpackPlugin;