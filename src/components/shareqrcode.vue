<template>
  <div class="box sharescanBox">
    <div class="share-close"></div>
    <img src="../assets/imgs/zx-scan.jpg" alt="">
    <!--<img src="../assets/imgs/jimu.png" alt="">-->
    <p>打开微信扫描二维码，将网页分享到朋友圈</p>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  .sharescanBox {
    position: relative;
    z-index: 999;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    width: 400px;
    height: auto;
    text-align: center;
    background-color: #fff;
    border-radius: 4px;
    img{
      width: 182px;
      /*height: 170px;*/
      margin-top: 25px;
      margin-bottom: 38px;
    }
    p{
      width: 330px;
      margin: 0 auto;
      padding-top: 16px;
      border-top: 1px solid #d2d2d2;
      font-size: 14px;
    }
    /*.share-close{*/
      /*position: absolute;*/
      /*top: 12px;*/
      /*right: 20px;*/
      /*width: 28px;*/
      /*height: 28px;*/
      /*background: url("../assets/imgs/share-close.png");*/
    /*}*/
  }
</style>
