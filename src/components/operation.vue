<template>
  <div class="flex flex-justify-between box operationBox">
      <div class="operation cursor_hand">
        <el-button @click="gowalkPage()" type="text" >
        <img src="../assets/imgs/walk-icon.png" alt="">
        <p>逛一逛</p>
        </el-button>
      </div>

    <div class="operation cursor_hand">
      <el-button type="text"  @click="showAskBox()" >
        <img src="../assets/imgs/ask-icon.png" alt="">
        <p>去提问</p>
      </el-button>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['operationStyle'],
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {
      showAskBox() {
        this.$emit('showAskBox',true);//select事件触发后，自动触发showAskBox事件
      },

      gowalkPage() {
        this.$router.push( {path: '/walk'});
      }
    }

  }
</script>

<style lang="less" scoped>
  //问答icon
  .operationBox {
    width: 300px;
    padding: 12px 38px;
    background-color: #fff;
    margin-bottom: 12px;
    border: 1px solid #eee;
    border-radius: 2px;
    .operation {
      text-align: center;

      img{
        margin-bottom: 6px;
      }

      p{
        font-size: 15px;
        color: #323232;
        font-weight: bold;
        /*font-size: 16px;*/
        /*line-height: 30px;*/
      }
    }
  }
</style>
