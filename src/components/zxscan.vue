<template>
  <div class="box scanBox">
    <h4><strong>资晓</strong>小程序</h4>
    <p>可以在小程序端实时查看问答</p>
    <!--<img src="../assets/imgs/jimu.png" alt="">-->
    <img style="width: 182px;" src="../assets/imgs/zx-scan.jpg" alt="">
  </div>
</template>

<script>
  export default {
    name: "scan"
  }
</script>

<style lang="less" scoped>
  .scanBox{
    width: 300px;
    height: 308px;
    background-color: #fff;
    padding: 30px 0px 20px;
    text-align: center;
    margin-bottom: 10px;
    border: 1px solid #eee;
    border-radius: 2px;

    h4{
      font-size: 18px;
      color: #323232;
      margin-bottom: 14px;

      strong{
        position: relative;
        display: inline-block;
        margin-right: 10px;
        top: -1px;
        font-weight: bold;
      }
    }

    p{
      font-size: 14px;
      color: #909090;
      margin-bottom: 8px;
    }
  }
</style>
