<template>
  <div class="topic body-warpper"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="1"
       infinite-scroll-throttle-delay="500"
  >
    <div id="gotop" class="roket cursor_hand">
      <svg class="Zi Zi--BackToTop" title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg>
    </div>
    <top @childByValue="childByValue" :offsettop_mainR="mRoffTop" :information="information"></top>
    <search @showAskBox="showAskBoxFn" :sendData="isShowqsnBox"></search>
    <carousel></carousel>
    <div class="main-container">
      <div class="fl main-left">
        <nav class="user-action-nav user-action-nav hg160">
          <div class="profileHeader-main">
            <div class="userAvatarEditor profileHeader-avatar">
              <div class="userAvatar">
                <el-upload
                  class="avatar-uploader"
                  action="http://zxtest.hefupb.com/upload/avatar"
                  :headers=this.headers
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>

                  <img class="avatar avatar--large userAvatar-inner"
                       width="160"
                       height="160"
                       :src="information.information.avatarUrl"
                       @mouseover="changeMask()"
                       @mouseout="changeMask()"
                  >
                </el-upload>

                <div class="mask userAvatarEditor-mask mask-hidden" :style="this.mask ? { opacity: 1 } : { opacity: 0 }">
                  <div class="mask-mask mask-mask--black userAvatarEditor-maskInner"></div>
                  <div class="mask-content">
                    <svg class="Zi Zi--Camera userAvatarEditor-cameraIcon" fill="currentColor" viewBox="0 0 24 24" width="36" height="36">
                      <path d="M20.094 6S22 6 22 8v10.017S22 20 19 20H4.036S2 20 2 18V7.967S2 6 4 6h3s1-2 2-2h6c1 0 2 2 2 2h3.094zM12 16a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0 1.5a5 5 0 1 0-.001-10.001A5 5 0 0 0 12 17.5zm7.5-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill-rule="evenodd"></path>
                    </svg>
                    <div class="userAvatarEditor-maskInnerText">修改我的头像</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="profileHeader-content">
              <div class="profileHeader-contentHead">
                <h1 class="profileHeader-title">
                  <span class="profileHeader-name limt-1" style="vertical-align: middle; max-width: 200px;" :title="information.information.nickName">
                    {{information.information.nickName}}
                  </span>
                  <div style="display: inline-block; vertical-align: middle;">
                    <span class="RichText zText profileHeader-headline"></span>
                    <img src="../../assets/img/topic-like.png" class="dz">
                    <span class="praise">{{information.information.totalsLikeForward}}</span>
                  </div>
                  <button type="button" class="Button ModifyButton Field-modify Field-modify-hidden Button--link" @click="dialogFormVisible = true">
                    <svg viewBox="0 0 12 12" class="Icon ModifyButton-icon Icon--modify" width="12" height="16" aria-hidden="true" style="height: 16px; width: 12px; vertical-align: sub;">
                      <title></title><g>
                      <path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z" fill-rule="evenodd"></path>
                    </g>
                    </svg>
                    修改
                  </button>
                  <el-dialog title="修改名称" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="modifyName()">确 定</el-button>
                    </div>
                  </el-dialog>
                </h1>

                <span @click="showRulesFn()" class="rankRule cursor_hand">等级规则</span>
              </div>

              <div class="profileHeader-contentBody">
                <div class="profileHeader-detail">
                  <div class="profileHeader-detailItem">
                    <span class="profileHeader-detailLabel">积分：</span>
                    <span class="w2e41a1">{{information.information.pointsAchievementEnergy.points}}</span>

                    <span style="width: 100px;" class="profileHeader-detailLabel">能量余额：</span>
                    <span class="w2e41a1">{{information.information.pointsAchievementEnergy.energy}}</span>
                    <div v-if="information.information.pointsAchievementEnergy" :class="information.information.pointsAchievementEnergy.achieveClass" class="profileHeader-detailValue">
                      <!--LV.1 才高一斗-->LV{{information.information.pointsAchievementEnergy.achievement}} {{information.information.pointsAchievementEnergy.levelHonor}}
                    </div>
                  </div>
                </div>
              </div>

              <div class="profileHeader-contentBody">
                <el-progress
                  :percentage="(information.information.pointsAchievementEnergy.points / information.information.pointsAchievementEnergy.pointMax) * 100"
                  :show-text="false"
                >
                </el-progress>
              </div>
            </div>
          </div>
        </nav>

        <div class="timeLine-entry-list">
          <el-tabs type="border-card" @tab-click="handleSwitch">
            <el-tab-pane
              :label="'我的问题（'+information.information.numQuestion+'）'"
              class="loadingText0"
            >
              <topicMyProblem :data="getterMyQuestion.myQuestionData"></topicMyProblem>
            </el-tab-pane>
            <el-tab-pane
              :label="'我的回答（'+information.information.numAnswer+'）'"
              class="loadingText1"
            >
              <my-Answer :data="getterMyAnswer.myAnswerData"></my-Answer>
            </el-tab-pane>
            <el-tab-pane
              :label="'我的关注（'+information.information.numFollow+'）'"
              class="loadingText2"
            >
              <topicMyProblem :data="getterMyFollow.myFollowData"></topicMyProblem>
            </el-tab-pane>
            <div v-bind:style="{ display: getterTotalsTrue.qstnTotalsTrue ? 'block' : 'none' }"><span class="my-dx"></span><span class="my-dxColor">我是有底线的</span><span class="my-dx"></span></div>
          </el-tabs>
        </div>
      </div>
      <aside class="fr main-right">
        <operation :style="operationStyle" @showAskBox="showAskBoxFn" :sendData="isShowqsnBox"></operation>
        <div :class="isRfix?'is-fixed':''" :style="isRfix?styleObject:''" class="main-r-inner">
          <ranking></ranking>
        </div>
      </aside>
    </div>
    <!--等级规则-->
    <ruleswarp :myinfoData="information.information.pointsAchievementEnergy" :isShowRulesBox="isShowRulesBox" @isCloseRulesBox="closeRulesModal"></ruleswarp>
    <!--提问题-->
    <askwarp :isShowqsnBox="isShowqsnBox" @isCloseqsnBox="closeModal"></askwarp>

    <!--成就弹框-->
    <div class="moduleWarpper" v-if="showModalStatus"></div>
    <div class="container-column buydes-dialog-container" :class="showModalStatus == true?'animated bounceInUp':''" v-if="showModalStatus">
      <img class="dialog-close" @click="hideModal" src="../../assets/imgs/dialog-close.png" />
      <!--<view class="bg-box">-->
      <img class="dialog-bg" :src="information.information.pointsAchievementEnergy.levelImageUrl" />
      <!--</view>-->

      <div class="dialog-content">
        <div class="bgText">恭喜你!</div>
        <div>获得【{{information.information.pointsAchievementEnergy.levelHonor}}】的称号</div>
        <div v-if="information.information.pointsAchievementEnergy.achievement === 12" class="most-text">你已经无人能及啦~</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import * as mydata from '../../api/topic';
  import { mapGetters, mapState } from 'vuex';
  import top from '../../components/top.vue';
  import search from '../../components/search.vue';
  import carousel from '../../components/carousel.vue';
  import topicMyProblem from '../../components/topic-myProblem.vue';
  import operation from '../../components/operation.vue';
  import ranking from '../../components/ranking.vue';
  import myAnswer from '../../components/myAnswer.vue';
  import unit from '../../utils/unit';
  import askwarp from '../../components/askwarp.vue';
  import ruleswarp from '../../components/rules.vue';
  import { Message } from 'element-ui';

  import {
    PERSONAL_INFORMATION,
    MY_QUESTION,
    MY_FOLLOW,
    MY_ANSWER,
    MODIFY_NAME,
  } from '../../store/modules/Topic/mutation-types';

  export default {
    extends: unit,
    name: 'my',
    data() {
      return {
        showModalStatus:false,  //是否显示成就弹框
        isShowRulesBox: false,  //是否显示等级规则弹框
        isShowqsnBox: false,  //最后要改成false
        isRfix:false,
        mRoffTop:0,
        styleObject:{
          left:0,
          top: 0,
        },
        content: '',
        operationStyle: {
          height: '160px'
        },
        pictLoading: true,
        activeName2: 'first',
        id: '',
        busy: false,
        mask: false,
        imageUrl: '',
        headers: {
          token: this.getCookie('token'),
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    components: {
      top,
      search,
      carousel,
      topicMyProblem,
      ranking,
      operation,
      myAnswer,
      askwarp,
      ruleswarp
    },
    created() {
      this.$store.dispatch(PERSONAL_INFORMATION);
      this.$store.dispatch(MY_QUESTION, {
        more: '',
        page: 1
      });
    },

    mounted(){
      let mRoffTop = this.$el.querySelector('.main-r-inner').offsetTop;
      this.mRoffTop = mRoffTop;
      this.loadingTab('.loadingText0');

      let pointsAchievementEnergy =this.information.information.pointsAchievementEnergy;
      let isShow = this.information.information.pointsAchievementEnergy.isShow;
      let levelImageUrl = this.information.information.pointsAchievementEnergy.levelImageUrl;
      let initImage = new Image();
      initImage.src = levelImageUrl;
      initImage.onload = ()=> {

        if(pointsAchievementEnergy && pointsAchievementEnergy.points!=0 && isShow!= 1){
          this.showModal();
        }
      }
    },
    updated() {
      const getMyQuestionData = this.$store.getters.getterMyQuestion.myQuestionData;
      const getMyFollowData = this.$store.getters.getterMyFollow.myFollowData;
      const getMyAnswerData = this.$store.getters.getterMyAnswer.myAnswerData;
      this.$nextTick(() => {
        try {
          if(getMyQuestionData === undefined || getMyAnswerData === undefined || getMyFollowData === undefined) {
            return;
          }
          if(getMyQuestionData.length > 0 || this.$store.getters.getterMyQuestion.tab1 === true) {
            loadingInstance0.close();
          }
          if(getMyAnswerData.length > 0 || this.$store.getters.getterMyAnswer.tab2 === true) {
            loadingInstance1.close();
          }
          if(getMyFollowData.length > 0 || this.$store.getters.getterMyFollow.tab3 === true) {
            loadingInstance2.close();
          }
        } catch(e) {
          console.log(e.message);
        }
      });
    },
    computed: {
      ...mapGetters([
        'information',
        'getterMyQuestion',
        'getterMyFollow',
        'getterMyAnswer',
        'getterTotalsTrue',
      ]),
    },

    methods: {
      // --------------成就----------
      hasAchieved() {    //点亮isshow
        mydata.hasAchieved({
          uid: this.information.information.uid,
        }).then(res => {
          if(res.code=='1001'){

          }
        });
      },
      showModal() {
        this.showModalStatus = true;
      },
      hideModal() {
       this.showModalStatus = false;
       this.hasAchieved();
      },
      // -----------chengjiu-------------

      // 显示等级弹框
      showRulesFn() {
        this.isShowRulesBox=true;
      },
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
      closeRulesModal(args) {
        this.isShowRulesBox = args;
      },
      closeModal(args) {
        this.isShowqsnBox = args;
      },
      handleSwitch(tab) {
        this.id = tab.$el.id;
        this.scrollToTop(485, 200);
        this.$store.dispatch(PERSONAL_INFORMATION);
        if(tab.$el.id === 'pane-0') {
          if(document.querySelectorAll('.el-loading-mask').length <= 0) {
            this.loadingTab('.loadingText0');
            this.$store.dispatch(MY_QUESTION, {
              more: '',
              page: 1
            });
          }
        }
        if(tab.$el.id === 'pane-1') {
          if(document.querySelectorAll('.el-loading-mask').length <= 0) {
            this.loadingTab1('.loadingText1');
            this.$store.dispatch(MY_ANSWER, {
              more: '',
              page: 1
            });
          }
          if(window.loadingInstance1 === undefined) {
            this.loadingTab1('.loadingText1');
            this.$store.dispatch(MY_ANSWER, {
              more: '',
              page: 1
            });
          }
        }
        if(tab.$el.id === 'pane-2') {
          if(document.querySelectorAll('.el-loading-mask').length <= 0) {
            this.loadingTab2('.loadingText2');
            this.$store.dispatch(MY_FOLLOW, {
              more: '',
              page: 1
            });
          }
          if(window.loadingInstance2 === undefined) {
            this.loadingTab2('.loadingText2');
            this.$store.dispatch(MY_FOLLOW, {
              more: '',
              page: 1
            });
          }
        }
      },
      loadingTab(str) {
        window.loadingInstance0 = this.$loading({
          text: '请稍等',
          target: document.querySelector(str)
        });
      },
      loadingTab1(str) {
        window.loadingInstance1 = this.$loading({
          text: '请稍等',
          target: document.querySelector(str)
        });
      },
      loadingTab2(str) {
        window.loadingInstance2 = this.$loading({
          text: '请稍等',
          target: document.querySelector(str)
        });
      },
      gotopicsPage() {
        this.$router.push({name: 'topics'});
      },
      loadMore() {
        if(this.$store.state.topic.qstnTotalsTrue === true) {
          return;
        } else {
          if(this.id === '' || this.id === 'pane-0') {
            this.$store.dispatch(MY_QUESTION, {
              more: 'more',
              page: ++this.$store.state.topic.page
            });
            this.busy = false
          }
          if(this.id === 'pane-1') {
            this.$store.dispatch(MY_ANSWER, {
              more: 'more',
              page: ++this.$store.state.topic.page
            });
            this.busy = false
          }
          if(this.id === 'pane-2') {
            this.$store.dispatch(MY_FOLLOW, {
              more: 'more',
              page: ++this.$store.state.topic.page
            });
            this.busy = false
          }
        }
      },
      changeMask() {
        this.mask = !this.mask;
      },
      handleAvatarSuccess(res, file) {
        this.$store.dispatch(PERSONAL_INFORMATION);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type;
        const isLt2M = file.size;
        return isJPG && isLt2M;
      },
      modifyName() {
        if(this.form.name === '') {
          Message('名称内容不能为空！');
        } else {
          this.$store.dispatch(MODIFY_NAME, this.form.name).then(() => {
            this.dialogFormVisible = false;
          });
        }
      }
    }
  }
</script>

<style lang="less" src="./my.less"></style>
