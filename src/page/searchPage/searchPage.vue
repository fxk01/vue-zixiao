<template>
  <div class="searchPage body-warpper"
       v-infinite-scroll="loadMoreSearch"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="1"
       infinite-scroll-throttle-delay="500"
  >
    <div id="gotop" class="roket cursor_hand">
      <svg class="Zi Zi--BackToTop" title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg>
    </div>
    <top @childByValue="childByValue" :offsettop_mainR="mRoffTop"></top>
    <search @showAskBox="showAskBoxFn" :sendData="isShowqsnBox"></search>

    <main class="search-container">
      <div class="main">
        <div class="fl main-left search-left">
          <p class="search-total">{{gettersSearchMsg.searchTotal?gettersSearchMsg.searchTotal:'0'}}个搜索结果</p>
          <div class="flex flex-align-center tab">
            <div class="flex flex-align-center tab-item active" style="display: table;">
              <div class="newItem" v-for="(item,index) in gettersSearchMsg.searchData" :key="item.id">
                <!--三个点-->
                <div class="threeDot">
                  <el-popover
                    placement="bottom"
                    width="75"
                    trigger="click">
                    <el-button class="report-p" type="text" @click="showReportbox(item.id)">举报</el-button>
                    <!--<el-table :data="gridData">-->
                    <!--<el-table-column width="150" property="date" label="日期"></el-table-column>-->
                    <!--<el-table-column width="100" property="name" label="姓名"></el-table-column>-->
                    <!--<el-table-column width="300" property="address" label="地址"></el-table-column>-->
                    <!--</el-table>-->
                    <el-button style="border: 0;border: none;" class="dot_three" slot="reference"></el-button>
                  </el-popover>
                </div>
                <div class="cursor_hand" @click="hrefAnswer(item.id)">
                  <div class="limt-5 title hot-title cursor_hand" v-html="item.content"></div>
                  <div class="limt-2 content" v-html="item.answer.content" style="display: block;"></div>
                </div>
                <div class="flex flex-align-center flex-justify-between bottom">
                  <div class="flex flex-align-center bottomL">
                    <div class="flex flex-align-center flex-justify-center box timer">
                      <i></i>
                      {{item.totalsNum.times}}</div>
                    <div class="box main_focusNum">{{item.totalsNum.numAnswer}}个回答</div>
                    <button type="button" class="flex flex-align-center box main_focus" style="width: 80px;display:block;">{{item.totalsNum.numFollow}}个关注</button>
                    <button
                      type="button"
                      :class="item.followed === 0 ? 'flex flex-align-center box main_focusVal' : 'flex flex-align-center box main_focus'"
                      style="width: 80px;display: block;"
                      v-html="item.followed === 0 ? '关注' : '已关注'"
                      @click="notFollowWay({index, id: item.id, followed: item.followed})">
                      关注
                    </button>
                  </div>
                  <div class="flex flex-justify-center flex-align-center peep_btn cursor_hand" @click="hrefAnswer(item.id)">
                    <i></i>
                    查看</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fr main-right">
          <scan></scan>
          <div :class="isRfix?'is-fixed':''" :style="isRfix?styleObject:''" class="main-r-inner">
            <ranking></ranking>
          </div>
        </div>
      </div>
    </main>
    <!--提问题-->
    <askwarp :isShowqsnBox="isShowqsnBox" @isCloseqsnBox="closeModal"></askwarp>
    <!--举报弹框-->
    <report @isCloseReportBox="closeReportModal" :dialogVisible="dialogVisible" :qid="dialogQid"></report>
  </div>
</template>

<script>
  import top from '../../components/top.vue';
  import search from '../../components/search.vue';
  import scan from '../../components/zxscan.vue';
  import ranking from '../../components/ranking.vue';
  import askwarp from '../../components/askwarp.vue';
  import report from '../../components/report.vue';

  import {
    SEARCH_MSG,
    FOLLOW_GZ,
    CANCEL_FOLLOW_GZ,
  } from '../../store/modules/SearchPage/mutation-types';
  import { mapGetters } from 'vuex';

  export default {
    name: 'searchPage',
    data() {
      return {
        isShowqsnBox:false,  //最后要改成false
        isRfix:false,
        mRoffTop:0,
        styleObject:{
          left:0,
          top: 0,
        },

        dialogVisible: false,
        dialogQid: '',
      }
    },
    components: {
      top,
      search,
      scan,
      ranking,
      askwarp,
      report
    },
    created() {
      this.$store.dispatch(SEARCH_MSG, {
        text: this.$route.query.text,
        page: 1
      });
    },

    mounted(){
      let mRoffTop = this.$el.querySelector('.main-r-inner').offsetTop;
      this.mRoffTop = mRoffTop;

      this.searchLoading = this.$loading({
        text: '请稍等',
        target: document.querySelector('.search-left')
      });
    },
    updated() {
      this.$nextTick(() => {
        if(this.gettersSearchMsg.searchData.length >= 0) {
          this.searchLoading.close();
        }
      });
    },
    computed: {
      ...mapGetters([
        'gettersSearchMsg',
      ]),
    },
    methods: {
      showAskBoxFn(args) {
        this.isShowqsnBox=args;
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
          this.isRfix= args;
        }else{
          this.isRfix= args;
        }
      },

      closeModal(args) {
        this.isShowqsnBox = args;
      },

      showReportbox(id) {
        this.dialogVisible = true;
        this.dialogQid = id;
      },

      closeReportModal(args) {
        this.dialogVisible = args
      },

      loadMoreSearch() {
        if(this.$store.state.search.searchStop === true) {
          return;
        } else {
          this.$store.dispatch(SEARCH_MSG, {
            text: this.$route.query.text,
            page: ++this.$store.state.search.page
          });
        }
      },
      notFollowWay(data) {
        if(data.followed === 0) {
          this.$store.dispatch(FOLLOW_GZ, {
            index: data.index,
            id: data.id,
          });
        } else {
          this.$store.dispatch(CANCEL_FOLLOW_GZ, {
            index: data.index,
            id: data.id,
          });
        }
      },
      hrefAnswer(id) {
        let routeData = this.$router.resolve({
          path: '/moreAnswer',
          query: {
            source: 'search',
            qid: id,
          }
        });
        window.location.href = routeData.href;
      }
    }
  }
</script>

<style lang="less" src="./searchPage.less"></style>
