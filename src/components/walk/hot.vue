<template>
  <!--热门问题-->
  <div id="hotpage">
    <div v-if="!noData">
      <div class="newItem" v-for="(hotList,index) in hotListData" :key="hotList.id">
        <div class="box sort_num">
          <!--<div>TOP</div>-->
          <div style="font-size: 14px;">{{index>8?index+1:'0'+(index+1)}}</div>
        </div>
        <!--三个点-->
        <div class="threeDot">
          <el-popover
            placement="bottom"
            width="75"
            trigger="click">
            <el-button class="report-p" type="text" @click="showReportbox(hotList.id)">举报</el-button>
            <!--<el-table :data="gridData">-->
            <!--<el-table-column width="150" property="date" label="日期"></el-table-column>-->
            <!--<el-table-column width="100" property="name" label="姓名"></el-table-column>-->
            <!--<el-table-column width="300" property="address" label="地址"></el-table-column>-->
            <!--</el-table>-->
            <el-button style="border: 0;border: none;" class="dot_three" slot="reference"></el-button>
          </el-popover>

        </div>
        <!--<div class="cursor_hand dot_three">-->
        <!--<div class="reportBox" style="display: none;">-->
        <!--<p>举报</p>-->
        <!--</div>-->
        <!---->
        <!--</div>-->
        <div class=""></div>
        <!--{{hotList.content}}-->
        <div class="cursor_hand" @click="goMoreAnswerPage(hotList.id)">
          <div class="limt-5 title hot-title">{{hotList.content}}</div>
          <div v-if="hotList.answer && hotList.answer.content">
            <div class="limt-2 content"  v-html="hotList.answer.contentReplenish.length==0?hotList.answer.content:hotList.answer.contentReplenish[0]"></div>
          </div>
        </div>
        <div class="flex flex-align-center flex-justify-between bottom">
          <div class="flex flex-align-center bottomL">

            <div class="box main_askNum">{{hotList.totalsNum.numAnswer}}个回答 </div>

            <div class="box main_focusNum">{{hotList.totalsNum.numFollow}}个关注 </div>

            <button :disabled="isfollowDisabled" @click="changeFollowed(index,hotList.id,hotList.followed)" type="button" data-qidx="" data-qid="" data-followed="" class="flex flex-align-center box main_focus" :class="hotList.followed=='0'? 'main_focusVal':''">{{hotList.followed=='1'?'已关注':'关注'}}</button>
          </div>
          <div @click="goMoreAnswerPage(hotList.id)" class="flex flex-justify-center flex-align-center peep_btn cursor_hand">
            <i></i>
            查看
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
  import * as common from '../../assets/js/common';

  import report from '../../components/report.vue';
    export default {
        name: "hot",
      data() {
          return {
            dialogVisible: false,
            dialogQid: '',

            noData:'',
            isfollowDisabled:false,  //关注按钮冷却
            scollY: null,// 离底部距离有多少
            pullRefreshss: true, // 代表可以进行下拉加载，false代表不能
            ms:'s',
            hotListData:[],
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
          this.scrollChangeHot()
        });

        this.getnewData() ;             //定义方法
        this.pullRefresh();
      },
      destroyed() {
        common.remove(window, 'scroll',
          this.scrollChangeHot
        );
      },
      mounted() {
        this.loading = this.$loading({
          // lock: true,
          text: 'Loading',
          target:document.querySelector('#hotpage')
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

        getnewData(loading) {
          let self = this;
          walk.hotqsn({
            page: this.page,
            pagesize: this.pagesize
          }).then(res => {
            if(res.data && res.code=='1001'){
              let hotListData1=res.data;
              let totalNum=res.totals;
              let size = this.Len + res.data.length;
              hotListData1.forEach(function (item) {
                // 是否为补充的答案
                if(item['answer'] && item['answer']['content']){
                  item['answer']['contentReplenish'] = item['answer']['content'].indexOf("***anonymity***")!='-1'?item['answer']['content'].split("***anonymity***"):[];
                }
              });
              this.hotListData=this.hotListData.concat(hotListData1);
              this.totalNum=totalNum;
              this.Len=size;
              this.loading.close();
            }else{
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
          let hotListData=this.hotListData;
          this.isfollowDisabled = true;
          if(followed == 0){
            walk.questFollow({
              qid: qid,
            }).then(res => {
              this.isfollowDisabled = false;
              if(res.code=='1000'){
                hotListData[index].followed='1';
                hotListData[index]['totalsNum']['numFollow']++;
                this.hotListData=hotListData;

              }else if(res.code=='1004'){
                // that_s.attr("disabled",false);
              }
            })
          } else if(followed == 1){  //取消关注
            walk.cancelQuestFollow({
              qid: qid,
            }).then(res => {
              this.isfollowDisabled = false;
              if(res.code=='1000'){
                hotListData[index].followed='0';
                hotListData[index]['totalsNum']['numFollow']--;

                this.hotListData=hotListData

              }else if(res.code=='1004'){
                // that_s.attr("disabled",false);
                // console.log('没有找到相关数据');
              }
            })
          }

        },

        //获取滚动条当前的位置
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

        //获取文档完整的高度
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
        //获取当前可视范围的高度
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
          var _this = this;
          common.addEvent(window,'scroll', this.scrollChangeHot)

          // window.addEventListener('scroll',this.scrollChangeHot);


          // window.onscroll = function () {
          //   _this.scrollChangeHot()
          // }
        },

        scrollChangeHot: function () {

          var _this = this,
            currentPage = {page: this.page};
          this.scollY = Math.ceil( this.getScrollTop() + this.getWindowHeight()) - this.getScrollHeight();

          // 把下拉刷新置为false，防止多次请求
          if (this.scollY >= 0) {
            if (this.Len >= this.totalNum) {
              // console.log('没有更多数据了。。。')
              return false;
            }else{
              this.page++;
              this.getnewData() ;
            }
            if (!this.pullRefreshss) {
              return false;
            }
          }
        }
      }
    }
</script>


