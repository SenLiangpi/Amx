/*
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-06-17 15:36:41
 * @LastEditors: PiPi
 * @LastEditTime: 2019-10-22 17:07:24
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