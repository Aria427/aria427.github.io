const path = require('path');

module.exports = {
    entry: './src/game-dev-assignment.ts',   
    output: {
        filename: 'game-dev-assignment.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    mode: 'development', 
};