<template>

  <div id="newsWrap" class="body-warpper">
    <div id="gotop" class="roket cursor_hand">
      <svg class="Zi Zi--BackToTop" title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg>
    </div>
    <top @childByValue="childByValue" :offsettop_mainR="mRoffTop"></top>
    <search @showAskBox="showAskBoxFn" :sendData="isShowqsnBox"></search>
    <carousel></carousel>
    <div class="main-container">
      <!--<div class="view timeLine-index-view">-->
        <div class="fl main-left">
          <!--正文-->
          <div v-if="!noData">
            <ul class="main-wrapper">
              <li v-for="(messageList,index) in messageData" :key="messageList.id" @click="goAnswerPage(index,messageList.isRead,messageList.id,messageList.qid,messageList.attachId,messageList.notificationFlag)"  class="flex flex-align-center cursor_hand item-news">
                <!--<div class="bg-thumb">-->
                <!--<img src="../../assets/imgs/mine-news-icon.png" alt="">-->
                <!--</div>-->
                <div :class="messageList.isRead=='1'?'innerTxt_active':''" class="flex-1 item-main">
                  <h3>{{messageList.title}}</h3>
                  <div v-if="messageList.hot_contents">
                    <div v-html="messageList.contentReplenish.length==0?messageList.hot_contents:messageList.contentReplenish[0]" class="p-content"></div>
                  </div>
                  <p class="p-timmer">{{messageList.createTime}}</p>
                </div>
              </li>

            </ul>
          </div>
          <div v-else class="noAnsWrapper main-border">{{noData}} ~</div>

        </div>


        <aside class="fr main-right">
          <operation :style="operationStyle" @showAskBox="showAskBoxFn" :sendData="isShowqsnBox"></operation>
          <div :class="isRfix?'is-fixed':''" :style="isRfix?styleObject:''" class="main-r-inner">
            <ranking></ranking>
          </div>
        </aside>
      </div>
    <!--</div>-->

    <div id="scanBox" style="display: none">
      <shareQrCode></shareQrCode>
    </div>
    <!--提问题-->
    <askwarp :isShowqsnBox="isShowqsnBox" @isCloseqsnBox="closeModal"></askwarp>
  </div>
</template>

<style lang="less" src="./minenews.less"></style>

<script>
  import Vue from 'vue';
  // import { mapGetters } from 'vuex';
  import top from '../../components/top.vue';
  import search from '../../components/search.vue';
  import carousel from '../../components/carousel.vue';
  import operation from '../../components/operation.vue';
  import ranking from '../../components/ranking.vue';
  import * as minenews from '../../api/minenews';
  import { MessageBox } from 'element-ui';
  // import { MessageBox } from 'element-ui';
  import shareQrCode from '../../components/shareqrcode.vue';
  import askwarp from '../../components/askwarp.vue';
  import * as common from '../../assets/js/common';
  import { Message } from 'element-ui';

  export default {
    name: 'topics',
    data() {
      return {
        isShowqsnBox:false,  //最后要改成false
        isRfix:false,
        mRoffTop:0,
        styleObject:{
          left:0,
          top: 0,
        },

        noData:'',
        operationStyle: {
          height: '160px'
        },
        // pictLoading: true,
        activeName2: 'first',
        messageData: [],
        page: 1,
        pagesize: 10,
        type: 1 ,     //我的消息
        totalNum: 0,
        Len: 0,
      }
    },
    components: {
      top,
      search,
      carousel,
      ranking,
      operation,
      shareQrCode,
      askwarp
    },
    created() {
      this.getmessageDataFn();
      this.pullRefresh();
    },
    destroyed() {
      common.remove(window, 'scroll',
        this.scrollChange
      );
    },
    // updated() {
    //   const pointsData = this.$store.getters.getterPointsData.pointsData;
    //   this.$nextTick(() => {
    //     if(pointsData === undefined) {
    //       return;
    //     }
    //   });
    // },
    // computed: {
    //   ...mapGetters([
    //     'getterPointsData',
    //   ]),
    // },

    mounted(){
      let mRoffTop = this.$el.querySelector('.main-r-inner').offsetTop;
      this.mRoffTop = mRoffTop;
    },

    methods: {
      // mainR FIX 开关
      childByValue(args) {
        let style_left= this.$el.querySelector('.main-right').offsetLeft;
        // console.log(this.isRfix,style_left);
        // fixed
        if(args === true){
          let styleObject={
            left:style_left+'px',
            top: '0px',
          }
          this.styleObject=styleObject;
          this.isRfix= args;

        }else{
          this.isRfix= args;
        }
      },
      // 去一问多答页面
      goAnswerPage(index,isRead,id,qid,attachId,notificationFlag) {
//         if(notificationFlag=='3' || notificationFlag=='6'){
          console.log(qid);
          if(qid){
            this.$router.push({name: 'moreAnswer',query:{ qid:qid,source: 'mineMessage'}});
          }else{
            Message.warning('数据已被删除~');
          }
          // }else{
        //   console.log('暂未能跳转');
        // };

        if(isRead=='1'){
          return false;
        }else {
          minenews.mineOpenMessage({
            nid:id
          }).then(res => {
            console.log(res)
            if(res.code=='1000'){
              this.messageData[index].isRead = '1';
            }
          })
        }

//        if(notificationflag=='3' || notificationflag=='6'){
//          wx.navigateTo({
//            url: '/pages/moreAnswer/moreAnswer?source=mineMessage='+'&attachid='+attachid+'&notificationflag='+notificationflag
//          })
//        }
//        else{
//          wx.navigateTo({
//            url: '/pages/answerDetail/answerDetail?source=mineMessage='+'&attachid='+attachid+'&notificationflag='+notificationflag
//          })
//        }
//
      },
      getmessageDataFn() {
        let self = this;
        minenews.mineMessage({
          page: this.page,
          pagesize: this.pagesize,
          type: this.type
        }).then(res => {
          if(res.data && res.code=='1001'){
            let messageData=res.data;
            // console.log(messageData);
            let totalNum=res.ntotals;
            let size = this.Len + messageData.length;
            messageData.forEach(function (item) {
              // 解除样式
              if (item['content']) {
                item['hot_contents'] = item['content'];
                item['contentReplenish'] = item['hot_contents'].indexOf("***anonymity***") != '-1' ? item['hot_contents'].split("***anonymity***") : [];

              }
            });
            this.messageData=this.messageData.concat(messageData);
            this.totalNum=totalNum;
            this.Len=size;
          }else {
            this.noData = res.msg?res.msg:'暂无数据';
          }
        });
      },

      showAskBoxFn(args) {
        this.isShowqsnBox=args;
        console.log(this.isShowqsnBox);
      },

      closeModal(args) {
        console.log(args);
        this.isShowqsnBox = args;
      },

      openCode() {
        MessageBox.alert('', '', {
          message: document.getElementById('scanBox').innerHTML,
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          center: true,
          callback: action => {
          }
        });
      },

      // 去一问多答页面
//      goMoreAnswerPage(qid) {
//        this.$router.push({name: 'moreAnswer',query:{ qid: qid, source: 'search'}});
//      },


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
        // var _this = this;
        // window.onscroll = function () {
        //   _this.scrollChange()
        // }
        common.addEvent(window,'scroll', this.scrollChange);
        // window.addEventListener('scroll',this.scrollChange);
      },

      scrollChange: function () {
//          alert('1')
        var _this = this,
          currentPage = {page: this.page};
        this.scollY = Math.ceil( this.getScrollTop() + this.getWindowHeight()) - this.getScrollHeight();
        // console.log(this.scollY);
        // 把下拉刷新置为false，防止多次请求
        if (this.scollY >= 0) {
          if (this.Len >= this.totalNum) {
            console.log('没有更多数据了。。。')
            return false;
          }

          console.log('0')

          this.page++;
          // alert(this.page)
          this.getmessageDataFn() ;

        } else {
          // 其他时候把下拉刷新置为true
//            _this.pullRefreshss = true;
        }
      }
      // handleSwitch(tab) {
      //   if(tab.$el.id === 'pane-0') {
      //     this.loadingTab('.loadingText0');
      //     this.$store.dispatch(PERSONAL_INFORMATION);
      //   }
      //   if(tab.$el.id === 'pane-2') {
      //     this.loadingTab('.loadingText2');
      //     this.$store.dispatch(MY_FOLLOW);
      //   }
      // },
      // loadingTab(str) {
      //   window.loadingInstance = this.$loading({
      //     text: '请稍等',
      //     target: document.querySelector(str)
      //   });
      // }
    }
  }
</script>
