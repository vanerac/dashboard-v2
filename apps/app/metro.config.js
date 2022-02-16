const path = require('path');

module.exports = {
    watchFolders: [
        path.resolve(__dirname, '../../'),
        // path.resolve(__dirname, '../../node_modules'),
        // path.resolve(__dirname, 'node_modules'),
    ],
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
    // resolver: {
    //     extraNodeModules: new Proxy(
    //         {},
    //         {
    //             get: (target, name) => {
    //                 return path.resolve(__dirname, '..', '..', 'node_modules', name);
    //             },
    //         },
    //     ),
    // },
};
