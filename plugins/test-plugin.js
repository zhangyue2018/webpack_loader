
/**
 * 1. webpack加载webpack.config.js中所有的配置，此时就会newTestPlugin(),执行插件的constructor
 * 2. webpack创建compiler对象
 * 3. 遍历所有plugins中插件：调用插件的apply方法
 * 4. 执行剩下的编译流程（触发各个hooks事件）
 */
class TestPlugin {
    constructor() {
        console.log('TestPlugin constructor');
    }

    apply(compiler) {
        console.log('TestPlugin apply');

        // 由文档可知，environment是同步钩子，所以需要使用tap注册
        compiler.hooks.environment.tap('TestPlugin', () => {
            console.log('TestPlugin environment');
        });
        // 由文档可知，emit是异步串行钩子
        compiler.hooks.emit.tap('TestPlugin', async (compilation) => {
            console.log('TestPlugin emit');
            await new Promise(function(resolve, reject) {
                setTimeout(() => {
                    console.log('hahahahah');
                    resolve();
                }, 3000)
            });
        });
        
        compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
            console.log('aaaaaa');
            setTimeout(() => {
                console.log('TestPlugin emit ----111111-------');
                callback();
            }, 2000);
        });

        compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
            console.log('bbbbbb');
            return new Promise(function(resolve, reject) {
                setTimeout(() => {
                    console.log('TestPlugin emit --2222-----');
                    resolve();
                }, 5000);
            });
        });
    }
}

module.exports = TestPlugin;