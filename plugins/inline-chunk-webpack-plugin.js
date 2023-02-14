const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

class InlineChunkWebpackPlugin {
    constructor(tests) {
        this.tests = tests;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('InlineChunkWebpackPlugin', (compilation) => {
            // 1. 获取html-webpack-plugin的hooks
            const hooks = HtmlWebpackPlugin.getHooks(compilation);
            // 2. 注册html-webpack-plugin的hooks -> alterAssetTagGroups
            hooks.alterAssetTagGroups.tap("InlineChunkWebpackPlugin", (assets) => {
                // 3. 从里面将script的runtime文件，变成inline script
                assets.headTags = this.getInlineChunk(assets.headTags, compilation.assets);
                assets.bodyTags = this.getInlineChunk(assets.bodyTags, compilation.assets);
            });
            // 删除runtime文件
            hooks.afterEmit.tap('InlineChunkWebpackPlugin', () => {
                Object.keys(compilation.assets).forEach(filepath => {
                    let res = this.tests.some(reg => reg.test(filepath));
                    if(res) delete compilation.assets[filepath];
                });
            });
            
        });
    }
    getInlineChunk(tags = {}, assets) {
        /**
             目前：
                [{
                    tagName: 'script',
                    voidTag: false,
                    meta: { plugin: 'html-webpack-plugin' },
                    attributes: { defer: true, type: undefined, src: 'js/runtime~main.js.js' }
                }]
            修改为：
                [{
                    tagName: 'script',
                    meta: { plugin: 'html-webpack-plugin' },
                    innerHtml: runtime文件的内容
                    closeTag: true,
                }]
        */

        return tags.map(tag => {
            if(tag.tagName !== "script") return tag;
            // 获取文件资源路径
            const filepath = tag.attributes.src;
            if(!filepath) return tag;
            let res = this.tests.every(reg => !reg.test(filepath));
            if(res) return tag;

            return {
                tagName: 'script',
                innerHTML: assets[filepath].source(),
                closeTag: true,
            }
        });
    }
}

module.exports = InlineChunkWebpackPlugin;