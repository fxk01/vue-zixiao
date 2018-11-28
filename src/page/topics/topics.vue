<template>

  <div id="topicsWrap" class="body-warpper">
    <div id="gotop" class="roket cursor_hand">
      <svg class="Zi Zi--BackToTop" title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg>
    </div>
    <top @childByValue="childByValue" :offsettop_mainR="mRoffTop"></top>
    <search @showAskBox="showAskBoxFn" :sendData="isShowqsnBox"></search>
    <carousel :isfather="isfather" @isChangetidFn="isChangetidFn"></carousel>
    <div style="margin-top: 20px;" class="main-container">
      <!--<div class="timeLine-index-view">-->
        <div class="fl main-left">
          <nav class="box topsMain-top main-border">
            <p class="classifyP">话题</p>
            <h2 class="title">{{hData.title}}</h2>
            <p class="content">{{hData.description}}</p>
          </nav>
          <div class="topsMain-main main-border">
            <ul class="itemBox">
              <li v-for="(topicDetail,index) in detailList" :key="topicDetail.id" class="item">
                <div class="cursor_hand" @click="goMoreAnswerPage(topicDetail.id)">
                  <div class="flex item-qsnbox">
                    <img class="bigimg" src="../../assets/imgs/topic-qsn.png" alt="">
                    <div class="limt-5 qsn-title">{{topicDetail.content}}</div>
                  </div>
                  <div class="flex item-ans-user">

                    <div class="flex flex-align-center" style="margin-bottom: 18px;">
                      <img class="bigimg" src="../../assets/imgs/topic-ans.png" alt="">
                      <div class="avalbox">
                        <p>{{topicDetail.answer.userProfile.nickName}}</p>
                        <span>{{topicDetail.answer.totalsNum.times}}</span>
                      </div>
                    </div>

                  </div>
                  <div v-html="topicDetail.answer.contentReplenish.length==0?topicDetail.answer.hot_contents:topicDetail.answer.contentReplenish[0]" class="limt-5 ans-content"></div>
                </div>
                 <div class="flex flex-align-center ans-bom">
                  <div @click="openCode" class="flex flex-align-center icon-share cursor_hand">
                    <i></i>
                    <!--{{topicDetail.answer.totalsNum.numForward}}-->
                    <span>分享</span>
                  </div>
                  <div class="su">|</div>
                  <button :disabled="islikedDisabled" @click="changeLiked(index,topicDetail.answer.id,topicDetail.answer.liked)" class="flex flex-align-center cursor_hand icon-givelike" >
                    <i :class="topicDetail.answer.liked!='1'?'':'liked'"></i>
                    <span>{{topicDetail.answer.totalsNum.numLike}}</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <aside class="fr main-right">
          <operation :style="operationStyle" @showAskBox="showAskBoxFn" :sendData="isShowqsnBox"></operation>
          <div :class="isRfix?'is-fixed':''" :style="isRfix?styleObject:''" class="main-r-inner">
            <ranking></ranking>
          </div>
        </aside>
      <!--</div>-->
    </div>

    <div id="scanBox" style="display: none">
      <shareQrCode></shareQrCode>
    </div>

    <!--提问题-->
    <askwarp :isShowqsnBox="isShowqsnBox" @isCloseqsnBox="closeModal"></askwarp>
  </div>
</template>

<style lang="less" src="./topics.less"></style>

<script>
  import Vue from 'vue';
  // import { mapGetters } from 'vuex';
  import * as common from '../../assets/js/common';
  import top from '../../components/top.vue';
  import search from '../../components/search.vue';
  import carousel from '../../components/carousel.vue';
  import operation from '../../components/operation.vue';
  import ranking from '../../components/ranking.vue';
  import * as topics from '../../api/topics';
  import { MessageBox } from 'element-ui';
  // import { MessageBox } from 'element-ui';
  import shareQrCode from '../../components/shareqrcode.vue';
  import askwarp from '../../components/askwarp.vue';

  export default {
    name: 'topics',
    data() {
      return {
        isfather:true,
        isRfix:false,
        mRoffTop:0,
        styleObject:{
          left:0,
          top: 0,
        },
        isShowqsnBox:false,  //最后要改成false

        islikedDisabled:false,   //点赞回答按钮冷却
        operationStyle: {
          height: '160px'
        },
        // pictLoading: true,
        activeName2: 'first',

        url:'https://hegui.hefupb.com/',
        hData: {},
        detailList: [],
        page: 1,
        pagesize: 5,
        tid: '' ,     //话题分类
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
      let tid=this.$route.query.refId?this.$route.query.refId:17;
      this.tid = tid;
      this.getTopicDetailFn();
      this.pullRefresh();
    },
    mounted(){
      let mRoffTop=this.$el.querySelector('.main-r-inner').offsetTop;
      if(mRoffTop){
        this.mRoffTop = mRoffTop;
      }
    },
    destroyed() {
      common.remove(window, 'scroll',
        this.scrollChange
      );
    },
    methods: {
      isChangetidFn(args) {
        this.tid = args;
        this.hData = {},
        this.detailList = [],
        this.page = 1,
        this.totalNum = 0,
        this.Len = 0,
        this.getTopicDetailFn();
      },
      // mainR FIX 开关
      childByValue(args) {
        let style_left= this.$el.querySelector('.main-right').offsetLeft;
        if(args === true){
          let styleObject={
            left:style_left+'px',
            top: '0px',
          }
          this.styleObject=styleObject;
          // this.mainRLeft = style_left;
          this.isRfix= args;

        }else{
          this.isRfix= args;
        }
      },
      getTopicDetailFn() {
        let self = this;
        topics.topicEchodetail({
          page: this.page,
          pagesize: this.pagesize,
          tid: this.tid
        }).then(res => {
          if(res.data && res.code=='1001'){
            let hData=res.data;
            let Url=this.url;
            if(hData['image']){
              hData['imageN']= Url+hData['image'].match(/..\/(\S*)/)[1]
            };
            let detailList=hData.questions;
            let totalNum=res.totals;
            let size = this.Len + detailList.length;
            detailList.forEach(function (item) {
              if(item['answer']['anonymity']=='1'){    //1匿名；0不匿名
                item['answer']['userProfile']['avatarUrl']='../../asssets/imgs/anonymityImg.png';
                item['answer']['userProfile']['nickName']='匿名用户';
              }
              // 解除样式
              item['answer']['hot_contents']=item['answer']['content'];
              item['answer']['contentReplenish'] = item['answer']['hot_contents'].indexOf("***anonymity***")!='-1'?item['answer']['hot_contents'].split("***anonymity***"):[];
            });
            this.hData=hData;
            this.detailList=this.detailList.concat(detailList);
            this.totalNum=totalNum;
            this.Len=size;
          }
        });
      },

      showAskBoxFn(args) {
        this.isShowqsnBox=args;
      },

      closeModal(args) {
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
      goMoreAnswerPage(qid) {
        this.$router.push({name: 'moreAnswer',query:{ qid: qid, source: 'search'}});
      },

      changeLiked(index,aid,liked) {
        let detailList=this.detailList;
        this.islikedDisabled = true;
        if(liked == 0){
          topics.answerLike({
            aid: aid,
          }).then(res => {
            this.islikedDisabled = false;
            if(res.code=='1000'){
              detailList[index]['answer']['liked']='1';
              detailList[index]['answer']['totalsNum']['numLike']+=1;
              this.detailList=detailList;

            }else if(res.code=='1004'){
              // that_s.attr("disabled",false);
              // console.log('没有找到相关数据');
            }
          })
        } else if(liked == 1){  //取消点赞
          topics.cancelAnswerLike({
            aid: aid,
          }).then(res => {
            this.islikedDisabled = false;
            if(res.code=='1000'){
              detailList[index]['answer']['liked']='0';
              detailList[index]['answer']['totalsNum']['numLike']-=1;

              this.detailList=detailList

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

        common.addEvent(window,'scroll', this.scrollChange);

        // window.onscroll = function () {
        //   _this.scrollChange()
        // }
      },

      scrollChange: function () {
          // currentPage = {page: this.page};
        this.scollY = Math.ceil( this.getScrollTop() + this.getWindowHeight()) - this.getScrollHeight();
        // 把下拉刷新置为false，防止多次请求
        if (this.scollY >= -1) {
          if (this.Len >= this.totalNum) {
            console.log('没有更多数据了。。。');
            return false;
          };
          this.page++;
          this.getTopicDetailFn() ;
        } else {
          // 其他时候把下拉刷新置为true
//            _this.pullRefreshss = true;
        }
      }
    }
  }
</script>
