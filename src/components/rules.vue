<template>
  <div>

    <el-dialog class="rulesWarrper" top="20vh" title="积分规则"
               :center="true"
               @open="changeHeight()"
               :close-on-click-modal="true"
               :visible.sync="isShowRulesBox"
               :before-close="rulesClose">
      <i class="circle circle1"></i>
      <i class="circle circle2"></i>
      <i class="circle circle3"></i>
      <i class="circle circle4"></i>
      <i class="dian dian1"></i>
      <i class="dian dian2"></i>
      <i class="dian dian3"></i>
      <div class="rulesBox">
          <p class="rule-text">
            加入积募的付费私享群资晓的付费问答频道研习社课程购买积募线下活动特权积募各平台的打赏。积募各平台的广告位购买，积募各平台的会员特权。加入积募的付费私享群。
          </p>
          <div>
            <div class="ulbox">
              <div class="progress">
                <div v-for="(integralItem,index) in integralData" :key="integralItem.id"
                     class="itemStar"
                     :class="(index+1)<=myinfoData.achievement?'itemStar-gold':'itemStar-blue'"
                     v-bind:style="{top:index*75-7+'px'}" >
                  {{index+1}}

                  <div :class="index%2 == 0?'odd-textBox':'even-textBox'" class="textBox">
                    <p class="text">{{integralItem.text}}</p>
                    <p class="number">( {{integralItem.low}}-{{integralItem.high}} )</p>
                  </div>
                </div>
                <div v-if="myinfoData.achievement == 12" class="rules-one-activebox">
                  <img src="../assets/imgs/rules-one-active.png" alt="">
                  <p class="rules-one-active">资晓万物</p>
                </div>
                <div v-else class="rules-onebox">
                  <img src="../assets/imgs/rules-num-one.png" alt="">
                  <p class="rules-one">资晓万物</p>
                </div>
                <div class="progress-bg">
                  <div class="progress-bar" v-bind:style="{height:hei+'px'}"  style="height: 42%"></div>
                </div>
              </div>

            </div>

          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>

  // import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

  // import * as createQsn from '../api/create_qsn';
  // import * as common from '../assets/js/common';


  export default {
    props: ['isShowRulesBox','myinfoData'],
    data() {
      return {
        hei:7,
        integralData:[{
          id:1,
          text:'才高一斗',
          low:0,
          high:100
        },{
          id:2,
          text:'书通二酉',
          low:101,
          high:500
        },{
          id:3,
          text:'韦编三绝',
          low:501,
          high:2000
        },{
          id:4,
          text:'纵横四海',
          low:2001,
          high:6000
        },{
          id:5,
          text:'学富五车',
          low:6001,
          high:12000
        },{
          id:6,
          text:'技精六艺',
          low:12001,
          high:22000
        },{
          id:7,
          text:'七步成诗',
          low:22000,
          high:37000
        },{
          id:8,
          text:'八斗之才',
          low:37001,
          high:57000
        },{
          id:9,
          text:'九天揽月',
          low:57001,
          high:87000
        },{
          id:10,
          text:'十年磨剑',
          low:87001,
          high:137000
        },{
          id:11,
          text:'智周天下',
          low:137001,
          high:20000
        }]

      }
    },

    components: {

    },

    mounted() {

    },

    created: function(){

    },

    methods: {
      rulesClose() {
        this.hei = 7;
        this.$emit('isCloseRulesBox',false);
      },
      changeHeight() {
        let that = this;
        let myinfoData = this.myinfoData;
        let hei1=75*(myinfoData.achievement-1)+40*(myinfoData.points-myinfoData.pointMin)/(myinfoData.pointMax-myinfoData.pointMin)+28;
        // this.hei = hei1;    //积分的高度
        let timer1 = null;
        let leader1 = that.hei;
        // let step = 2;
        clearInterval(timer1);
        timer1 = setInterval(function () {
          //获取步长
          let step = (hei1-leader1)/10;
          //二次处理步长
          step = step>0?Math.ceil(step):Math.floor(step);
          leader1 = leader1 +step;
          that.hei = that.hei+step;
          //清除定时器
          if(leader1>= hei1){
            clearInterval(timer1);
          }
        },20);
      }
    },

  }
</script>

<style lang="less">

  .rulesWarrper .el-dialog{
    width: 500px;
    background-color: #4678f9;
    background-image: linear-gradient(110deg,rgba(59,114,255,0.85),rgba(44,102,253,0.96));
    background-image: -ms-linear-gradient(110deg,rgba(59,114,255,0.85),rgba(44,102,253,0.96));
    background-image: -moz-linear-gradient(110deg,rgba(59,114,255,0.85),rgba(44,102,253,0.96));
    background-image: -webkit-gradient(linear, 110deg, from(rgba(59,114,255,0.85)), to(rgba(44,102,253,0.96)));
    background-image: -webkit-linear-gradient(110deg,rgba(59,114,255,0.85),rgba(44,102,253,0.96));
    background-image: -o-linear-gradient(110deg,rgba(59,114,255,0.85),rgba(44,102,253,0.96));
    background-image: linear-gradient(110deg,rgba(59,114,255,0.85),rgba(44,102,253,0.96));
    /*background:url('../assets/imgs/rules-1.png') left top no-repeat ,url('../assets/imgs/rules-2.png') left 133px repeat ,url('../assets/imgs/rules-3.png') left 1030px  no-repeat;*/
    /*background:url('../assets/imgs/rules-1.png') left top no-repeat ,url('../assets/imgs/rules-3.png') left bottom  no-repeat;*/
    background-size:contain;

    .el-dialog__title{
      color: #fff;
      font-weight: bold;
    }

    .circle{
      position: absolute;
      width: 16px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid #fff;
    }

    .circle1{
      width: 12px;
      height: 12px;
      top:46px;
      left: 40px;
    }

    .circle2{
      width: 16px;
      height: 16px;
      top:160px;
      right: 38px;
    }

    .circle3{
      bottom:493px;
      left: 64px;
    }

    .circle4{
      width: 18px;
      height: 18px;
      bottom:136px;
      right: 56px;
    }

    .dian{
      position: absolute;
      width: 6px;
      height: 6px;
      background-color: #afafaf;
      border-radius: 50%;
      box-shadow: 0px 0px 10px #fff;
    }

    .dian1{
      top: 809px;
      left: 51px;
    }

    .dian2{
      top: 609px;
      right: 51px;
    }

    .dian3{
      top: 393px;
      left: 51px;
    }

    .dian4{
      top: 309px;
      right: 51px;
    }

    /*.rulesBox{*/
      /*!*background-color: #4678f9;*!*/
      /*!*background-image: linear-gradient(0deg, #3b72ff 85%,#2c66fd 96%);*!*/
      /*margin-right: -25px;*/
      /*margin-left: -25px;*/
    /*}*/

    .rule-text{
      font-size: 16px;
      line-height: 26px;
      padding: 0 30px;
      color: #fff;
    }

  }

  .ulbox{
    position:relative;
    height: 948px;
    margin-top: 38px;
  }

  .progress{
    position:absolute;
    left: 50%;
    margin-left: -1px;
    width:2px;
    /*height:825px;*/
    height:825px;

    .itemStar{
      width: 35px;
      height: 35px;
      position:absolute;
      text-align: center;
      line-height: 38px;
      left: 50%;
      color: #ec2e2e;
      margin-left: -17.5px;
      z-index: 9999;
      /*background-color: #ccc;*/

      .textBox{
        width: 116px;
        font-size: 16px;
        line-height: 20px;
        position: absolute;
        top:3px;
        color: #fff ;

        p{
          margin: 0;
          padding: 0;
        }

        .number{
          font-size: 14px;
        }
      }

      .odd-textBox{
        left: 46px;
        text-align: left;
      }

      .even-textBox{
        right: 46px;
        text-align: right;
      }
    }

    .itemStar-blue{
      color: #fff;
      background: url("../assets/imgs/blue-star42.png") 0 0 no-repeat;
      background-size: contain;

      .textBox{
        opacity: 0.6;
      }
    }

    .itemStar-gold{
      color: #8ca0ff;
      background: url("../assets/imgs/gold-star42.png") 0 0 no-repeat;
      background-size: contain;
    }

    .progress-bg {
      position:absolute;
      height:100%;
      width:2px;
      background:#2757c5;
      border-radius:4px;
      box-shadow: 0 0 5px #bbb;

      .progress-bar{
        position:absolute;
        top:0px;
        left:0;
        width:2px;
        height:0px;
        background:#fff;
        border-radius:3px;

        &:after{
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: -3px;
          /*bottom: -4px;*/
          bottom: 0;
          z-index: 900;
          box-shadow: 0px 0px 12px #fefefe;
        }
      }
    }

    .rules-onebox{
      position: absolute;
      text-align: center;
      top: 820px;
      width: 100px;
      height: 90px;
      margin-left: -50px;
      z-index: 999;

      img{
        width: 48px;
        height: 48px;
        display: inline-block;
      }

      .rules-one{
        font-size: 16px;
        color: #fff;
        opacity: 0.6;
      }
    }

    .rules-one-activebox{
      position: absolute;
      text-align: center;
      top: 790px;
      width: 130px;
      height: 90px;
      margin-left: -60px;

      img{
        width: 116px;
        height: 100px;
        display: inline-block;
      }

      .rules-one-active{
        font-size: 16px;
        color: #fff;
      }
    }


  }


</style>
