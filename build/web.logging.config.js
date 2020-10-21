/*
 * @Author: PiPi
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-05-20 09:59:31
 * @LastEditors: PiPi
 * @LastEditTime: 2020-05-21 10:53:57
 */ 
const path = require('path');

module.exports = {
  entry: './src/web-logging/index.js',
  output: {
    path: path.resolve(__dirname,'../src/web-logging/lib'),
    filename: 'weblogging.umd.min.js',
    publicPath: '/lib',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
}
