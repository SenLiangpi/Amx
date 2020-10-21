/*
 * @Author: Pi Patle
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-10-20 15:02:53
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-10-20 15:44:08
 */
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'./lib'),
        filename: 'axm.umd.min.js',
        publicPath: '/lib',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
};