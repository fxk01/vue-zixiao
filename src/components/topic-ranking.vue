<template>
  <div class="box rankingBox">
    <div class="flex flex-justify-between rank-header">
      <div class="flex flex-align-center headerL">
        <img src="../assets/imgs/ranking-Leaderboard.png" alt="">
        <span>大神榜</span>
      </div>
      <div class="headerR">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="rankHeng"></div>
    <div class="rankMain">
      <div class="flex flex-justify-between flex-align-center rankItem">
        <div class="flex flex-align-center itemL">
          <div class="numBox">
            <img src="../assets/imgs/ranking-num1.png" alt="">
            <!--<img src="../assets/imgs/Ranking-num1.png" alt="">-->
            <!--<img src="../assets/imgs/Ranking-num1.png" alt="">-->
          </div>
          <div class="avatarThumb">
            <img src="../assets/imgs/ranking-avatar.png" alt="">
          </div>
          <div>
            <div class="nickname">大白兔</div>
            <div class="level">lv.01</div>
          </div>
        </div>
        <div class="itemR">
          10000
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '周榜'
        }, {
          value: '选项2',
          label: '月榜'
        }, {
          value: '选项3',
          label: '总榜'
        }],
        value: '选项1'
      }
    }
  }
</script>

<style lang="less" scoped>
  //排行榜
  .rankingBox{
    background: #fff;
    width: 300px;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 0 10px;

    .rank-header{
      padding-top: 20px;
      padding-bottom: 20px;


      .headerL{
        img{
          display: block;
          margin-right: 10px;
        }

        span{
          display: block;
          font-weight: bold;
          font-size: 18px;

        }

      }

      .headerR{
        width: 90px;

        .el-input__inner{
          height: 28px !important;
        }

        .el-select-dropdown{
          //top: 226px !important;
        }
      }

    }

    .rankHeng{
      width: 270px;
      height: 1px;
      background-color:#eee ;
      margin: 0 auto;
    }

    .rankMain{
      padding-top: 10px;
    }
    .rankItem{
      padding: 15px 0;

      .itemL{


        .numBox{
          width: 22px;
          height: 22px;
          margin-right: 10px;
        }

        .avatarThumb{
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }

        .nickname{
          font-weight: bold;
          font-size: 18px;
          color: #323232;
          margin-bottom: 8px;
        }

        .level{
          font-weight: bold;
          font-size: 14px;
          color: #eaeaea;
        }
      }

      .itemR{
        font-weight: bold;
        font-size: 20px;
        color: #eaeaea;
      }
    }
  }
</style>
