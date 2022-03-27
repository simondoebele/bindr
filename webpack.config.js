const fs=  require("fs");
const path = require('path');
const webpack= require("webpack");

const prefix=  fs.existsSync("./src/solved-utilities.js")?"solved-":"";

// bootstrap entries
const bootstrap= ["vuejs", "reactjs"]
      .map(function framework2PathCB(x){return {[x] :"./src/"+x+"/"+prefix+"index.js"}; })   // find file path and return {frameworkJS: path}
      .filter(function keepOnlyExistingCB(f){ return fs.existsSync(Object.values(f)[0]);})   // include only if file (path) exists
      .reduce(function mergeObjectsCB(acc, f){ return {...acc, ...f};}, {});                 // merge objects into one  {framework1JS:path1, f2: path2}

function makeBootrapHtmlCB(framework){     // framework bootstrap is at framework/index.html
    return new HtmlWebpackPlugin({
        filename: framework.slice(0, -2)+"/index.html",
        template: './src/'+prefix+'index.html',
        chunks: [framework],
    });
}

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: bootstrap,
    output: {
        path: __dirname +"/public",
        publicPath: '/',
    },
    optimization: {
        splitChunks: {             // split the code coming from others (vendor) from our own code
            chunks: "all",
        },
    },
    plugins: [
        ...Object.keys(bootstrap).map(makeBootrapHtmlCB),   // a HTML for each existing bootstrap index.js
        
        
        new webpack.SourceMapDevToolPlugin(    // the source map plugin, specifying "Debug here!" in the browser Devtools (chrome)
            {
                moduleFilenameTemplate: "[resource]",
                exclude:[/node_modules/, /webpack/],
                sourceRoot:"Debug here!"
            }),
        new webpack.DefinePlugin({           // globals neeeded by Vue
            __VUE_OPTIONS_API__:true,
            __VUE_PROD_DEVTOOLS__:true,
            TEST_PREFIX:"\'"+prefix+"\'"
//            TEST_PREFIX: "\'\'"
        })      
    ],
    module: {
        rules: [
            {
                test: /\.?js$/,                   // for each .js file
                exclude: /node_modules/,          // except in node_modules 
                use: {
                    loader: "babel-loader",       // we use babel
                    options: {
                        presets: [['@babel/preset-env',{
                            "targets":  {
                                chrome:94        /* we set babel to generate code for an advanced browser
                                                    so that the code will change as little as possible.
                                                    This is not suitable for production because older browsers may not understand the code.
                                                    But the focus here is the lab.
                                                    */
                            }
                            }]],
                        "plugins": [
                            [
                                "@babel/transform-runtime", {  // babel can reuse some code to reduce generated code size
                                    "regenerator": true
                                }
                            ],
                            ["@babel/plugin-transform-react-jsx"]  // this transforms JSX into JS
                        ]
                    }
                }
            },
        ]
    },
    devtool: false,  // needed for the SourceMapDevToolPlugin
    mode:'development',
};


