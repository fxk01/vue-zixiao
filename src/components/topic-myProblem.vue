<template>
  <!--status; //1：草稿 2：已提交，待审核  3：审核未通过  4：认定违规 5：关闭该问题/回答 6：被举报 7：审核通过，已发布-->
  <div class="myProblem">
    <ul>
      <li v-for="item in data" :key="item.id">
        <div class="problem-newItem">
          <div class="title hot-title cursor_hand" @click="goMoreAnswerPage(item.id)">{{item.content}}</div>
          <div class="flex flex-justify-between bottom">
            <div class="flex flex-align-center bottomL">
              <div v-if="item.status" class="main_status">{{item.status?item.status:""}}</div>
              <div class="flex flex-align-center flex-justify-center box timer">
                <i></i>
                {{item.totalsNum.times}}</div>
              <div class="box main_askNum">{{item.totalsNum.numAnswer}}个回答 </div>
              <div class="box main_focusNum">{{item.totalsNum.numFollow}}个关注 </div>
              <!--<button type="button" data-qidx="" data-qid="" data-followed="" class="flex flex-align-center main_focusValBtn main_focus main_focus_new">关注</button>-->
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div v-bind:style="{ display: data.length === 0 ? 'block' : 'none' }">
      暂无问题！
    </div>
  </div>
</template>

<script>

  export default {
    props: ['data'],
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {
      // 去一问多答页面
      goMoreAnswerPage(qid) {
        this.$router.push({name: 'moreAnswer',query:{ qid: qid, source: 'search'}});
      },

    }
  }
</script>

<style lang="less">
  .myProblem {
    ul li {
      margin-bottom: 30px;
      border-bottom: 1px solid #eeeeee;
    }
    .problem-newItem {
      position: relative;
      background-color: #fff;
      padding-bottom: 30px;
      .title {
        color: #323232;
        font-weight: 700;
        line-height: 30px;
        font-size: 16px;
      }
      .hot-title {
        margin-bottom: 16px;
      }
      .bottom {
        .bottomL {
          height: 26px;
          font-size: 14px;

          .main_status{
            padding: 1px 8px;
            background-color: #eaeaea;
            border: 1px solid #eaeaea;
            border-radius: 30px;
            margin-right: 10px;
          }

          .main_askNum, .main_focusNum, .main_focus {
            width: 78px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            background-color: #fefefe;
            margin-right: 10px;
            border: 1px solid #eaeaea;
            border-radius: 2px;
            /*display: inline-block;*/
          }

          .timer{
            width: 94px;
            height: 26px;
            color: #ff7e00;
            line-height: 26px;
            text-align: center;
            background-color: #fff3eb;
            margin-right: 10px;
            border: 1px solid #fff3eb;
            border-radius: 2px;

            i{
              //position: relative;
              //top: 1px;
              display: block;
              width: 14px;
              height: 14px;
              background: url("../assets/imgs/icon-knock.png") 0 0 no-repeat;
              margin-right: 6px;
            }
          }
          .main_focus {
            color: #2e41a1;
            background-color: #ebfaff;
            border: 1px solid #ebfaff;
            border-radius: 2px;
          }
        }
      }
    }
    ul li:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
  }
</style>
