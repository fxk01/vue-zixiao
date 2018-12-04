<template>
  <div>
    <div class="box rankingBox">
      <div class="flex flex-justify-between rank-header">
        <div class="flex flex-align-center headerL">
          <img src="../assets/imgs/ranking-Leaderboard.png" alt="">
          <span>大神积分榜</span>
        </div>
        <div class="flex flex-align-center headerR">
          <el-select @change="(value) => SelectChange(value)" v-model="value" placeholder="请选择">
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
      <ul class="rankMain">
        <li  v-for="(item,index) in getterPointsData.pointsData" :key="index" class="flex flex-justify-between flex-align-center rankItem">
          <div class="flex flex-align-center itemL">
            <div class="numBox">
              <img v-if="item.currentRanking==1" src="../assets/imgs/ranking-num1.png" alt="">
              <img v-else-if="item.currentRanking==2" src="../assets/imgs/ranking-num2.png" alt="">
              <img v-else-if="item.currentRanking==3" src="../assets/imgs/ranking-num3.png" alt="">
              <div class="ranknun" v-else>{{item.currentRanking}}</div>
            </div>
            <div class="avatarThumb">
              <img :src="item.userProfile && item.userProfile.avatarHttpd?item.userProfile.avatarHttpd:item.userProfile.avatarUrl" alt="">
              <!--<img src="../assets/imgs/ranking-avatar.png" alt="">-->
            </div>
            <div>
              <div style="width: 100px;" class="nickname limt-1">{{item.userProfile.nickName}}</div>
              <div :class="item.achieveClass" class="level bg-range">LV{{item.achievement}} {{item.levelHonor}}</div>
            </div>
          </div>
          <div class="itemR">
            {{item.points}}
            <small style="font-size: 12px;color: #ddd;font-weight:normal;">分</small>
          </div>
        </li>
      </ul>
      <div v-show="getterPointsData.pointsTotals > 6" class="ranking-pagination">
        <el-pagination style="text-align: center;margin-bottom: 14px;"
                       layout="prev, pager, next"
                       :small="true"
                       :page-size="rankPageSize"
                       :total="getterPointsData.pointsTotals"
                       @current-change="(value) => currentRankChange(value)"
        >
        </el-pagination>
      </div>
    </div>
    <!--积分兑换入口-->
    <div @click="gopointFn()" class="cursor_hand" style="text-align: center;margin-top: 10px;">
      <img style="display: inline-block" src="../assets/imgs/pointBg.jpg" alt="">
    </div>
  </div>

</template>

<script>
  import {
    RANKING
  } from '../store/modules/Ranking/mutation-types';
  import { mapGetters } from 'vuex';
  export default {
    // props: ['data'],
    data() {
      return {
        rankPageSize:6,
        options: [{
          value: 'WEEKLY',
          label: '周榜'
        }, {
          value: 'MONTHLY',
          label: '月榜'
        }, {
          value: 'OVERALL',
          label: '总榜'
        }],
        value: 'OVERALL'
      }
    },
    created() {
      this.$store.dispatch(RANKING, {
        page: 1,
        pagesize: this.rankPageSize,
        key: this.value
      });
    },

    computed: {
      ...mapGetters([
        'getterPointsData',
      ]),
    },
    // watch: {
    //   value(old) {
        // this.$store.dispatch(RANKING, {
        //   page: 1,
        //   pagesize: 10,
        //   key: old
        // });
      // }
    // },
    methods: {
      gopointFn() {
        this.$router.push({path: '/integral'});
      },
      SelectChange(value) {
        this.$store.dispatch(RANKING, {
          page: 1,
          pagesize: this.rankPageSize,
          key: value
        });
      },
      // 当前页改变
      currentRankChange(newpage) {
        this.$store.dispatch(RANKING, {
          page: newpage,
          pagesize: this.rankPageSize,
          key: this.value
        });
      }

    }

  }
</script>

<style lang="less">
  //排行榜
  .rankingBox{
    background: #fff;
    width: 300px;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 0 14px;

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

          .ranknun{
            font-weight: bold;
            text-align: center;
          }
        }

        .avatarThumb{
          width: 50px;
          height: 50px;
          margin-right: 10px;
          border-radius: 50%;
          overflow: hidden;

          img{
            width: 100%;
            height: 100%;
          }
        }

        .nickname{
          font-weight: bold;
          font-size: 16px;
          color: #323232;
          margin-bottom: 8px;
        }

        .level{
          display: inline-block;
          font-weight: normal;
          font-size: 12px;
          /*color: #eaeaea;*/
        }
      }

      .itemR{
        font-weight: bold;
        font-size: 20px;
        color: #323232;
        /*color: #eaeaea;*/
      }
    }

    .el-select .el-input__inner{
      height: 28px !important;
      line-height: 28px !important;
    }

    .el-select .el-input__icon{
      line-height: 28px;
    }

    .el-pager{
      width: 42px;

      .number{
        display: none;
      }
    }

    /*.el-select-dropdown {*/
      /*left: 1125px !important;*/
    /*}*/
  }
   .el-select-dropdown {
    /*left: 1125px !important;*/
  }
</style>
