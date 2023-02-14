class CleanWebpackPlugin {
    apply(compiler) {
        // 2. 获取打包输出的目录
        const outputPath = compiler.options.output.path;
        const fs = compiler.outputFileSystem;
        // 1. 注册钩子， 在打包输出之前 emit
        compiler.hooks.emit.tap('CleanWebpackPlugin', (compilation) => {
            // 3. 通过fs删除打包输出的目录下的所有文件
            this.removeFiles(fs, outputPath);
        });
    }

    removeFiles(fs, filePath) {
        // 想要删除打包输出目录下的所有资源，需要先将目录下的资源删除，才能删除这个目录
        let skip = false, files;
        // 1.读取当前目录下所有资源
        try {
            files = fs.readdirSync(filePath);
        } catch(e) {
            skip = true;
        }
        if(skip) return;
        console.log('===files===', files); // [ 'images', 'index.html', 'js' ]
        // 2.遍历，一个个删除
        files.forEach(file => {
            // 2.1 遍历所有文件，判断是文件夹还是文件
            const path = `${filePath}/${file}`;
            // 第一种方法
            fs.rmdirSync(path, {recursive: true});

            // 第二种方法
            // const fileState = fs.statSync(path);
            // if(fileState.isDirectory()) {
            //     // 2.2 是文件夹就得删除下面所有文件，才能删除文件夹
            //     this.removeFiles(fs, path);
            //     fs.rmdirSync(path); // 刪除目录
            // } else {
            //     // 2.2 是文件，就直接删除
            //     fs.unlinkSync(path);
            // }
        });

    }
}

module.exports = CleanWebpackPlugin;