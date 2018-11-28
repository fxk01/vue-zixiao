<template>
  <!--最新问题 -- 零回复-->
  <div id="zeropage">
    <div v-if="!noData">
      <div v-for="(newList,index) in newListData" :key="newList.id"  class="newItem newItem1">
        <!--三个点-->
        <div class="threeDot">
          <el-popover
            placement="bottom"
            width="75"
            trigger="click">
            <el-button class="report-p" type="text" @click="showReportbox(newList.id)">举报</el-button>
            <!--<el-table :data="gridData">-->
            <!--<el-table-column width="150" property="date" label="日期"></el-table-column>-->
            <!--<el-table-column width="100" property="name" label="姓名"></el-table-column>-->
            <!--<el-table-column width="300" property="address" label="地址"></el-table-column>-->
            <!--</el-table>-->
            <el-button style="border: 0;border: none;" class="dot_three" slot="reference"></el-button>
          </el-popover>

        </div>
        <div @click="goMoreAnswerPage(newList.id)" class="limt-5 title newstitle cursor_hand">{{index+1}}. {{newList.content}}</div>
        <div class="flex flex-align-center  flex-justify-between bottom">
          <div class="flex flex-align-center bottomL">
            <!--<img src="../../public/images/png/stroll_new_time.png">-->
            <div class="flex flex-align-center flex-justify-center box timer">
              <i></i>
              {{newList.totalsNum.times}}</div>

            <div class="box main_askNum">{{newList.totalsNum.numAnswer}}个回答 </div>

            <div class="box main_focusNum">{{newList.totalsNum.numFollow}}个关注 </div>

            <button :disabled="isfollowDisabled" @click="changeFollowed(index,newList.id,newList.followed)" type="button" data-qidx="" data-qid="" data-followed="" :class="newList.followed=='0'?'main_focusVal':''" class="flex flex-align-center box main_focus">{{newList.followed=='1'?'已关注':'关注'}}</button>
          </div>
          <div class="flex flex-align-center flex-justify-center peep_btn1 cursor_hand" @click="writeAnswerHref(newList.id)">
            <i></i>
            写回答
            <!--<span class="report">举报</span> <img src="../../public/images/png/stroll_newreport.png">-->
          </div>
        </div>
      </div>
    </div>
    <div v-else class="noAnsWrapper main-border">{{noData}} ~</div>
    <!--举报弹框-->
    <report @isCloseReportBox="closeReportModal" :dialogVisible="dialogVisible" :qid="dialogQid"></report>
  </div>

</template>

<script>
  import * as walk from '../../api/walk';
  import report from '../../components/report.vue';
  import * as common from '../../assets/js/common';
  export default {
    name: "new",

    data() {
      return {
        dialogVisible: false,
        dialogQid: '',

        noData:'',
        isfollowDisabled:false,  //关注按钮冷却
        scollY: null,// 离底部距离有多少
        pullRefreshss: true, // 代表可以进行下拉加载，false代表不能
        filtertype:1,  //0：全部最新问题； 1：只看没有回答的最新问题
        newListData:[],
        page: 1,  //第一页
        pagesize: 10, //每页条数
        Len:0, //已加载的数据条数
        totalNum:0, //总数据条数
      }
    },

    components: {
      report
    },

    created: function(){
      common.remove(window, 'scroll', () => {
        this.scrollChangeZero()
      });

      this.getNewqstnFn() ;             //0：全部最新问题；1：仅看暂无回答的最新问题
      this.pullRefresh();
    },
    destroyed() {
      common.remove(window, 'scroll',
        this.scrollChangeZero
      );
    },
    mounted() {
      this.loading = this.$loading({
        // lock: true,
        text: 'Loading',
        target:document.querySelector('#zeropage')
        // spinner: 'el-icon-loading',
      });
    },
    methods: {

      showReportbox(id) {
        this.dialogVisible = true;
        this.dialogQid = id;
      },

      closeReportModal(args) {
        this.dialogVisible = args
      },

      writeAnswerHref(qid) {
        this.$router.push({
          path: '/writeAnswer',
          query: {
            qid: qid
          }
        });
//        let routerWriteAnswer = this.$router.resolve({
//          path: '/writeAnswer',
//          query: {
//            qid: qid
//          }
//        });
//        window.open(routerWriteAnswer.href, '_blank');
      },

      getNewqstnFn() {
        let self = this;
        walk.newqstn({
          page: this.page,
          pagesize: this.pagesize,
          filtertype: this.filtertype
        }).then(res => {
          if(res['data'] && res['code'] === 1001) {
            let newListData1 = res.data;
            let totalNum = res.qstntotals;
            let size = this.Len + res.data.length;
            this.newListData = this.newListData.concat(newListData1);
            this.totalNum = totalNum;
            this.Len = size;
            this.loading.close();
          }else {
            this.noData = res.msg?res.msg:'暂无数据';
            this.loading.close();
          }

        });
      },

      // 去一问多答页面
      goMoreAnswerPage(qid) {
        // this.$router.push({name: 'moreAnswer',query:{ qid: qid, source: 'search'}});
        const {href} = this.$router.resolve({
          name: "moreAnswer",
          query:{ qid: qid, source: 'search'}
        });
        window.open(href, '_blank');
      },

      changeFollowed(index,qid,followed) {
        let newListData=this.newListData;
        this.isfollowDisabled = true;
        if(followed == 0){
          walk.questFollow({
            qid: qid,
          }).then(res => {
            this.isfollowDisabled = false;
            if(res.code=='1000'){
              newListData[index].followed='1';
              newListData[index]['totalsNum']['numFollow']++;
              this.newListData=newListData;

            }else if(res.code=='1004'){
              // that_s.attr("disabled",false);
              // console.log('没有找到相关数据');
            }
          })
        } else if(followed == 1){  //取消关注
          walk.cancelQuestFollow({
            qid: qid,
          }).then(res => {
            this.isfollowDisabled = false;
            if(res.code=='1000'){
              newListData[index].followed='0';
              newListData[index]['totalsNum']['numFollow']--;

              this.newListData=newListData

            }else if(res.code=='1004'){
              // that_s.attr("disabled",false);
              // console.log('没有找到相关数据');
            }
          })
        }

      },

      //文档的总高度
      getScrollTop: function () {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
          bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
      },
      //浏览器视口的高度
      getScrollHeight: function () {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
          bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
      },
      //浏览器视口的高度
      getWindowHeight: function () {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
          windowHeight = document.documentElement.clientHeight;
        } else {
          windowHeight = document.body.clientHeight;
        }
        return windowHeight;
      },
      // 下拉加载ajax
      pullRefresh: function () {
        common.addEvent(window,'scroll', this.scrollChangeZero)
      },

      scrollChangeZero: function () {
        var _this = this;
        this.scollY = Math.ceil( this.getScrollTop() + this.getWindowHeight()) - this.getScrollHeight();
        // 把下拉刷新置为false，防止多次请求
        if (this.scollY >= 0) {
          if (this.Len >= this.totalNum) {
            // console.log('没有更多数据了。。。');
            return false;
          }else{
            this.page++;
            this.getNewqstnFn() ;
          }
          if (!this.pullRefreshss) {
            return false;
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
