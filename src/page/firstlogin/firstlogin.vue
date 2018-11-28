<template>
  <div class="loginWrap">
    <img src="../../assets/imgs/login-bg.jpg" alt="">
    <!--<div class="loginBox">-->
      <div class="login-content">
        <img src="../../assets/img/wh.png" alt="" class="rotateWh">
        <img src="../../assets/img/xqer.png" alt="" class="translateY2">
        <div class="tpl-login-logo"></div>
        <p class="p1">大资管人的小知识库</p>
        <h6 class="h6-text" style="font-size: 18px;font-weight: normal;"></h6>
        <div @click="openscanpage()" class="cursor_hand">
          <ul class="more-sign">
            <li class="wechat_li">
              <a class="weixin" href="#"><i class="iconfont ic-wechat"></i></a>
            </li>
          </ul>
          <p class="p2">点击登录</p>
        </div>
        <img src="../../assets/img/whfb.png" alt="" class="whfb">
        <img src="../../assets/img/xqy.png" alt="" class="translateXxq">
      </div>
    <!--</div>-->
  </div>
</template>

<style lang="less" scoped>
  body{
    min-height: 100px !important;
  }

  .loginWrap{
    position: relative;
    /*width: 1920px;*/
    width: 100%;
    /*max-width: 1920px;*/


    img{
      vertical-align: middle;
    }


    .login-content {
      box-sizing: border-box;
      background-color: #feffff;
      z-index: 100;
      position: absolute;
      top:0;
      width: 370px;
      height: 400px;
      left: 50%;
      top:50%;
      margin-left: -185px;
      margin-top: -200px;
      border: 1px solid #fff;
      border-radius: 4px;

      .whfb {
        margin-top: -50%;
        margin-left: -90px;
        position: absolute;
        animation:whfb 2s linear 0.2s infinite;
      }

      @keyframes whfb {
        0% {
          transform: rotate(360deg);
        }
        50% {
          transform: rotate(20deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }


      .rotateWh {
        left: 96%;
        margin-top: -70px;
        position: absolute;
        animation:changRotate 2s linear 0.2s infinite;
      }

      @keyframes changRotate {
        0% {
          transform: rotate(360deg);
        }
        50% {
          transform: rotate(20deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }

      .translateY2 {
        margin-left: 450px;
        position: absolute;
        animation:translateY2 4s linear 1s infinite;
      }

      @keyframes translateY2 {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(-50%);
        }
        100% {
          transform: translateX(0);
        }
      }

      .translateXxq {
        margin-top: -80px;
        margin-left: -130px;
        position: absolute;
        animation: translateXxq 4s infinite;
      }

      @keyframes translateXxq {
        0% {
          transform: translate(0px, 0px);
        }
        50% {
          transform: translate(0px, 40px);
        }
        100% {
          transform: translate(0px, 0px);
        }
      }
    }

    .tpl-login-logo {
      width: 106px;
      height: 106px;
      margin: 40px auto 0;
      background: url('../../assets/imgs/login-small.png') center no-repeat;
    }

    p{
      margin: 0;
    }

    .p1{
      padding-top: 20px;
      padding-bottom: 30px;
      font-size: 18px;
      color: #26399c;
      text-align: center;
    }

    .h6-text{
      width: 270px;
      border-bottom: 1px solid #5b73fc;
      margin: 0 auto 28px;
    }

    .more-sign{
      text-align: center;
    }

    .wechat_li{
      display: inline-block;
      margin: 0 5px;
      padding: 0;
    }

    li i {
      display: inline-block;
      width: 70px;
      height: 70px;
      font-size: 28px;
    }

    li .ic-wechat {
      color: #00bb29;
      background: url('../../assets/imgs/login-weixin.png') no-repeat;
      background-size: contain;
    }

    .p2{
      padding-top: 20px;
      font-size: 16px;
      text-align: center;
      color: #575757;
    }
  }
</style>
<script>
  export default{
    data() {
      return {
        // url:'http://192.168.10.182:8081/',
        url:'http://zxtest.hefupb.com/'
      }
    },

    methods: {
      openscanpage() {
        let href=this.url+'scan/login';
        window.open(href, '_blank');
      }
    }

  }
</script>
