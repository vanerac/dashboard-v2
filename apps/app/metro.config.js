const path = require('path');

console.log(path.resolve(__dirname, '../../'));

module.exports = {
    watchFolders: [path.resolve(__dirname, '../../packages/ui')],
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
    resolver: {
        extraNodeModules: new Proxy(
            {},
            {
                get: (target, name) => {
                    return path.join(process.cwd(), 'node_modules', name);
                },
            },
        ),
    },
    projectRoot: path.resolve(__dirname),
};
