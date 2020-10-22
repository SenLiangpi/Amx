/*
 * @Author: Pi Patle
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-08-16 17:23:34
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-10-21 15:01:30
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
const value_list = {
  local: {
    aa: '1',
    a: {a:1,b:2,c:3,d:4,e:5,f:6,g:7},
    b: {a:1,b:2,c:3,d:4,e:5,f:6,g:7},
    c: {a:1,b:2,c:3,d:4,e:5,f:6,g:7},
    d: {a:1,b:2,c:3,d:4,e:5,f:6,g:7},
    e: {a:1,b:2,c:3,d:4,e:5,f:6,g:7},
    f:[1,2,3,4,5,6,7,8,9,10],
    checklist: {
      status: '',//保存状态 [0: 草稿 1:已发布]
      carCode: '',//车牌号
      isHaveReservation: '',//有无预约单
      reserveBillCode: '',//预约单号
      clientMobile: '',//客户手机号
      promiseRepairBegin: '',//保修日期
      carFuelNum: '',//燃油量
      carMilageNum: '',//里程数
      receiveBy: '',//销售顾问
      clientName: '',//客户姓名
      carModel: '',//车辆型号
      vin: '',//VIN
      returnFactoryType: '',//回厂类别
      carInsideFeatureButtonCheckItem: { //车辆内部功能以及按键检查
        airConditionerBlower: '',//空调、鼓风机
        audioPerformance: '',//音响工作表现
        glassLift: '',//玻璃升降
        informationSystem: '',//信息系统
        steeringWheelFunctionKey: '',//方向盘功能键
        wiper: '',//雨刷
        handbrake: '',//手刹
        instrumentInterior: '',//仪表内饰
        seatAdjustment: ''//座椅调节、记忆功能
      },
      carLiftCheckItem: {
        brakeDiscLeveling: '',//制动盘表面平整
        brakePadThicknessAfter: '',//刹车片厚度后
        brakePadThicknessBefore: '',//刹车片厚度前
        brakePadsCanContinueToBeUsed: '',//刹车片可继续使用 
        brakeSystemDamage: '',//制动系统沙漏、变形
        fuelTankTubing: [],//油箱、油管
        shockAbsorber: [],//减震器
        tire: [],//轮胎
        visibleOilLeakage: [],//可视的漏油漏水
      },
      carGoodsCheckItem: {
        firstFourCarGoods: [],//0:备胎 1:千斤顶 2:随车工具 3:点烟器
        am: '',
        cd: '',
        fm: '',
      },
      carSrpMaintainItem: {//车辆SRP保养项
        oilFilter: 0,
        frontBrakePad: 0,
        vehicleInspection: 0,
        rearBrakePad: 0,
        frontBrakePadAndBrakeDisc: 0,
        rearBrakePadAndBrakeDisc: 0,
        wiperBlade: 0,
        dustFilter: 0,
        sparkPlug: 0,
        fuelFilter: 0,
        airFilter: 0,
        brakeFluid: 0,
      },
      carClientDeclareItem: {//客户声明项
        isAgreeToTheRoadTest: '',//如需要，是否同意路试
        isCarWash: '',//是否洗车
        isKeepOldParts: '',//是否保留旧件
        isNeedExtraWork: '',//如需额外工作，如何处理
        isNoValuables: '',//确认车内无贵重物品
        notExceedMoneyToNotSure: '',//如费用不超过￥元，可不用再次确认
        rearBrakePadsAndBrakeDiscs: ''//后部制动片及制动盘
      },
      carOutsideCheckImage: '',//车辆外观确认img
      carOutsideCheckItem: {//车辆外观确认项
        firstTwoChooseItem: [],//车辆过脏，无法判断
        leftFrontRimBreak: '',//左前轮辋损伤
        leftFrontTireTread: '',//左前轮胎花纹
        leftRearRimBreak: '',//左后轮辋损伤
        leftRearTireTread: '',//左后轮胎花纹
        rightFrontRimBreak: '',//右前轮辋损伤
        rightFrontTireTread: '',//右前轮胎花纹
        rightRearRimBreak: '',//右后后轮辋损伤
        rightRearTireTread: '',//右后轮胎花纹
      },
      clientSignImage: '',//客户签字确认(image)
      receiveBySignImage: ''//销售顾问签字确认(image)
    }
  },
  session: {
    aa: '1',
    a: {a:1,b:2,c:3,d:4,e:5,f:6,g:7},
    b: {a:1,b:2,c:3,d:4,e:5,f:6,g:7},
    c: {a:1,b:2,c:3,d:4,e:5,f:6,g:7},
    d: {a:1,b:2,c:3,d:4,e:5,f:6,g:7},
    e: {a:1,b:2,c:3,d:4,e:5,f:6,g:7},
    f:[1,2,3,4,5,6,7,8,9,10],
    checklist: {
      status: '',//保存状态 [0: 草稿 1:已发布]
      carCode: '',//车牌号
      isHaveReservation: '',//有无预约单
      reserveBillCode: '',//预约单号
      clientMobile: '',//客户手机号
      promiseRepairBegin: '',//保修日期
      carFuelNum: '',//燃油量
      carMilageNum: '',//里程数
      receiveBy: '',//销售顾问
      clientName: '',//客户姓名
      carModel: '',//车辆型号
      vin: '',//VIN
      returnFactoryType: '',//回厂类别
      carInsideFeatureButtonCheckItem: { //车辆内部功能以及按键检查
        airConditionerBlower: '',//空调、鼓风机
        audioPerformance: '',//音响工作表现
        glassLift: '',//玻璃升降
        informationSystem: '',//信息系统
        steeringWheelFunctionKey: '',//方向盘功能键
        wiper: '',//雨刷
        handbrake: '',//手刹
        instrumentInterior: '',//仪表内饰
        seatAdjustment: ''//座椅调节、记忆功能
      },
      carLiftCheckItem: {
        brakeDiscLeveling: '',//制动盘表面平整
        brakePadThicknessAfter: '',//刹车片厚度后
        brakePadThicknessBefore: '',//刹车片厚度前
        brakePadsCanContinueToBeUsed: '',//刹车片可继续使用 
        brakeSystemDamage: '',//制动系统沙漏、变形
        fuelTankTubing: [],//油箱、油管
        shockAbsorber: [],//减震器
        tire: [],//轮胎
        visibleOilLeakage: [],//可视的漏油漏水
      },
      carGoodsCheckItem: {
        firstFourCarGoods: [],//0:备胎 1:千斤顶 2:随车工具 3:点烟器
        am: '',
        cd: '',
        fm: '',
      },
      carSrpMaintainItem: {//车辆SRP保养项
        oilFilter: 0,
        frontBrakePad: 0,
        vehicleInspection: 0,
        rearBrakePad: 0,
        frontBrakePadAndBrakeDisc: 0,
        rearBrakePadAndBrakeDisc: 0,
        wiperBlade: 0,
        dustFilter: 0,
        sparkPlug: 0,
        fuelFilter: 0,
        airFilter: 0,
        brakeFluid: 0,
      },
      carClientDeclareItem: {//客户声明项
        isAgreeToTheRoadTest: '',//如需要，是否同意路试
        isCarWash: '',//是否洗车
        isKeepOldParts: '',//是否保留旧件
        isNeedExtraWork: '',//如需额外工作，如何处理
        isNoValuables: '',//确认车内无贵重物品
        notExceedMoneyToNotSure: '',//如费用不超过￥元，可不用再次确认
        rearBrakePadsAndBrakeDiscs: ''//后部制动片及制动盘
      },
      carOutsideCheckImage: '',//车辆外观确认img
      carOutsideCheckItem: {//车辆外观确认项
        firstTwoChooseItem: [],//车辆过脏，无法判断
        leftFrontRimBreak: '',//左前轮辋损伤
        leftFrontTireTread: '',//左前轮胎花纹
        leftRearRimBreak: '',//左后轮辋损伤
        leftRearTireTread: '',//左后轮胎花纹
        rightFrontRimBreak: '',//右前轮辋损伤
        rightFrontTireTread: '',//右前轮胎花纹
        rightRearRimBreak: '',//右后后轮辋损伤
        rightRearTireTread: '',//右后轮胎花纹
      },
      clientSignImage: '',//客户签字确认(image)
      receiveBySignImage: ''//销售顾问签字确认(image)
    }
  }
}
import amx_storage_vue from './amx-storage-vue/src/index';
Vue.use(amx_storage_vue,value_list);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
