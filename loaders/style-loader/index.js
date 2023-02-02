module.exports = function(content) {
    /**
     * use: ['./loaders/style-loader']
     * 1.直接使用style-loader，只能处理样式，不能处理样式中引入的其他资源
     * 
     * use: ['./loaders/style-loader', 'css-loader']
     * 2.借助css-loader解决杨世忠引入的其他资源的问题
     * 
     * 问题是css-loader暴露了一段js代码，style-loader需要执行js代码，得到返回值，再动态创建style标签，插入到页面上
     * （不好操作）
     * 
     * 3. style-loader 使用pitch loader用法
     * 
     */
    // const script = `
    //     const styleEl = document.createElement('style');
    //     styleEl.innerHTML = ${JSON.stringify(content)};
    //     document.head.appendChild(styleEl);
    // `;

    // return script; // 这个返回值是返回给js用的
}

module.exports.pitch = function(remainingRequest) {
    // remainingRequest: 剩下还需要处理的loader
    console.log('=======', remainingRequest); // D:\test\webpack_loader\node_modules\css-loader\dist\cjs.js!D:\test\webpack_loader\src\css\index.css
    // 1. 将remainingRequest中的绝对路径改成相对路径（因为后面只能使用相对路径）
    const relativePath = remainingRequest.split("!").map(absolutePath => {
        // 返回相对路径
        // 以this.context路径为基准，看怎么能找到absolutePath路径
        // this.context--当前loader所在的目录
        return this.utils.contextify(this.context, absolutePath);
    }).join("!");
    console.log('-------relativePath--------', relativePath); // ../../node_modules/css-loader/dist/cjs.js!./index.css

    // 2. 引入css-loader处理后的资源
    // 3. 创建style，将内容插入页面生效
    // 注意：import style from "!!${relativePath}"，这一句必须加!!，否则打包会报错
    const script = `
        import style from "!!${relativePath}";
        const styleEl = document.createElement('style');
        styleEl.innerHTML = style;
        document.head.appendChild(styleEl);
    `;
    // 中止后面loader执行
    return script;
}