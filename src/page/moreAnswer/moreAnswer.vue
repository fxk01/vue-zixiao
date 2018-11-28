<template>

  <div id="moreAnsWrap" class="body-warpper">
    <div id="gotop" class="roket cursor_hand">
      <svg class="Zi Zi--BackToTop" title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg>
    </div>
    <top @childByValue="childByValue" :offsettop_mainR="mRoffTop"></top>
    <search @showAskBox="showAskBoxFn" :sendData="isShowqsnBox"></search>

    <div style="margin-top: 20px" class="main-container">
      <!--<div class="view timeLine-index-view">-->
        <div class="fl main-left">
          <!--问题-->
          <div class="">
            <div class="newItem newItem1 main-border">
              <!--<div class="box sort_num">-->
              <!--<div>TOP</div>-->
              <!--<div style="font-size: 14px;">01</div>-->
              <!--</div>-->
              <!--三个点-->
              <div class="threeDot">
                <el-popover
                  placement="bottom"
                  width="75"
                  trigger="click">
                  <el-button class="report-p" type="text" @click="showReportbox(questData.id,'report_qid')">举报</el-button>
                  <!--<el-table :data="gridData">-->
                  <!--<el-table-column width="150" property="date" label="日期"></el-table-column>-->
                  <!--<el-table-column width="100" property="name" label="姓名"></el-table-column>-->
                  <!--<el-table-column width="300" property="address" label="地址"></el-table-column>-->
                  <!--</el-table>-->
                  <el-button style="border: 0;border: none;" class="dot_three" slot="reference"></el-button>
                </el-popover>
              </div>
              <div class="limt-5 title newstitle cursor_hand">{{questData.content}}</div>
              <div class="flex flex-align-center flex-justify-between bottom">
                <div class="flex flex-align-center bottomL">
                  <!--<img src="../../public/images/png/stroll_new_time.png">-->
                  <div class="flex flex-align-center flex-justify-center box timer">
                    <i></i>
                    {{questData.totalsNum?questData.totalsNum.times:''}}
                  </div>

                  <div class="box main_askNum">{{questData.totalsNum?questData.totalsNum.numAnswer:''}}个回答 </div>

                  <div class="box main_focusNum">{{questData.totalsNum?questData.totalsNum.numFollow:''}} 个关注 </div>

                  <button :disabled="isfollowDisabled" @click="changeFollowed(questData.id,questData.followed)" type="button" :class="questData.followed=='0'?'main_focusVal':''" class="flex flex-align-center box main_focus">{{questData.followed=='1'?'已关注':'关注'}}</button>
                </div>
                <div class="flex flex-justify-center flex-align-center peep_btn1 cursor_hand" data-qid="" @click="writeAnswerHref">
                  <i></i>
                  写回答
                 </div>
              </div>
            </div>
          </div>

          <!--回答-->
          <div v-if="!noansData"  class="box main-border ansWrapper">
            <ul style="min-height: 232px;">
              <li v-for="(answerList,index) in answerData" :key="answerList.id"  class="item-ans">
                <div class="flex flex-justify-between flex-align-center ansTop">
                  <div class="flex flex-align-center">
                    <div class="bgThumb">
                      <img v-if="answerList.anonymity=='1'" src="../../assets/imgs/anonymityImg.png" alt="">
                      <img v-else :src="answerList.userProfile && answerList.userProfile.avatarHttpd?answerList.userProfile.avatarHttpd:answerList.userProfile.avatarUrl" alt="">
                    </div>
                    <div class="availableBox">
                      <span class="nickName">{{answerList.userProfile.nickName}}</span><span :class="answerList.levelClass" class="level"> LV{{answerList.level?answerList.level:''}} {{answerList.levelHonor?answerList.levelHonor:''}}</span>
                      <p>{{answerList.totalsNum.times}}</p>
                    </div>
                  </div>

                  <button :disabled="islikedDisabled" @click="changeLiked(index,answerList.id,answerList.liked)" class="likedBox cursor_hand">
                    <transition name="bounce">
                      <div class="praise" style="position: absolute; margin-top: -15px;" v-if="answerList.liked == 1">
                      <span id="add-num" style="display: inline-block;">
                        <em class="add-animation" v-bind:class="{ 'hover': answerList.liked == 1 ? 'hover' : '' }">+1</em>
                      </span>
                      </div>
                    </transition>
                    <img v-show="answerList.liked == 1" src="../../assets/imgs/icon-topic-like.png" alt="">
                    <img v-show="answerList.liked != 1" src="../../assets/imgs/icon-more-noliked.png" alt="">
                    <p>{{answerList.totalsNum.numLike}}</p>
                  </button>
                </div>

                <div class="ansMain">
                  <div :class="answerList['contentLength']>240?'foldcontent-panel':''">
                    <div :class="answerList['contentLength']>240?'part-content':''">
                      <div style="max-height: 120px;overflow: hidden;" v-html="answerList.newAnswerData0?answerList.newAnswerData0:answerList.content" class="limt-5 ansContent">
                      </div>
                    </div>
                    <div :class="answerList['contentLength']>240?'all-content ql-editor':''" style="display: none;">
                      <div v-html="answerList.newAnswerData0?answerList.newAnswerData0:answerList.content" class="all-ansContent">
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-justify-between flex-align-center ansBom">
                    <div class="flex flex-align-center ansBomL">
                      <div class="flex flex-align-center share cursor_hand" @click="openCode">
                        <img class="small-icon" src="../../assets/imgs/icon-share.png" alt="">
                        分享
                      </div>
                      <div class="su">|</div>
                      <div class="flex flex-align-center report cursor_hand" @click="showReportbox(answerList.id,'report_aid')">
                        <img class="small-icon" src="../../assets/imgs/icon-report.png" alt="">
                        举报
                      </div>
                      <div v-if="answerList.owner ==1" class="su">|</div>
                      <div v-if="answerList.owner ==1" @click="showSupplementFn(index,answerList.supplementStyle)" class="flex flex-align-center report cursor_hand">
                        <img class="small-icon" src="../../assets/imgs/icon-report.png" alt="">
                        {{answerList.supplementStyle?'收起补充':'补充'}}
                      </div>
                      <div v-if="answerList.owner ==1" class="su">|</div>
                      <div v-if="answerList.owner ==1" @click="deleteAnsFn(index,answerList.id)" class="flex flex-align-center cursor_hand report">
                        <img class="small-icon" src="../../assets/imgs/icon-report.png" alt="">
                        删除
                      </div>
                    </div>
                    <div class="ansBomR">

                      <!--补充答案-->
                      <!--<div v-if="answerList.owner=='1'" class="flex flex-align-center flex-justify-center cursor_hand commentsBox">-->
                      <!--<img class="small-icon" src="../../assets/imgs/icon-ans-supplement.png" alt="">-->
                      <!--补充答案-->
                      <!--</div>-->

                      <!--非自己则可评论回答-->
                      <!--<div v-else >-->
                      <div @click="get_answerCommentFn(index,answerList.id,answerList.dissStyle,answerList.com_page)"  class="flex flex-align-center flex-justify-center cursor_hand commentsBox">
                        <img class="small-icon" src="../../assets/imgs/icon-comment.png" alt="">
                        {{answerList.dissStyle?'收起评论':answerList.totalsNum.commentNum +'条评论'}}
                        <img v-if="answerList.dissStyle" class="small-up-icon" src="../../assets/imgs/icon-up-small.png" alt="">
                        <img v-else class="small-down-icon" src="../../assets/imgs/icon-down-small.png" alt="">
                      </div>
                      <!--</div>-->
                    </div>
                  </div>

                  <!--补充答案框框-->
                  <div v-show="answerList.supplementStyle" class="supplementForm main-border">

                    <el-input class="disscuss-textarea" type="textarea"
                              v-on:focus="supplementBgFocus(index)"
                              v-on:blur="supplementBgBlue(index)"
                              :ref="'ans_supplement'+index"
                              :autosize="{ minRows: 1}"
                              :maxlength="1000"
                              v-model="answerList.supplementText"
                              placeholder="请填写您要补充的回答～"
                              cols="30" rows="10">

                    </el-input>
                    <div class="flex flex-justify-between dissForm-bom supplementForm-bom">
                      <div class="limitNum">
                        <span>{{answerList.supplementText.length}} / 1000</span>
                      </div>
                      <div class="flex flex-align-center dissFormR">
                        <button class="commentBtn" v-bind:style="{'background-color':answerList.supplement_gray === true ? 'rgb(189, 192, 193) ':''}"  @click="sendSupplementFn(index,answerList.id)" type="button">提交</button>
                      </div>
                    </div>
                  </div>

                  <!--补充的答案-->
                  <div v-if="answerList.newAnswerData1"  class="supplementWrap main-border">
                    <div class="supplement-item" v-for="(newAnswerData,index1) in answerList.newAnswerData1" :key="index1">
                      <h4>{{newAnswerData[0]}}</h4>
                      <div v-html='newAnswerData[1]' class="ansContent" style="margin-bottom: 10px;"></div>
                    </div>
                  </div>

                  <!--评论的答案-->
                  <div :id="'anchor-'+index" v-show="answerList.dissStyle" class="discussWrapper main-border">
                    <div v-if="answerList.discussList.length>0">
                      <ul class="discussMain fade-transition">
                        <li v-for="(discuss,c_index) in answerList.discussList" :key="discuss.id" class="diss-item">
                          <!--右上方删除评论-->
                          <!--<div v-if="discuss.owner" @click="deleteCommentFn(index,c_index,discuss.id)" class="delete-comment cursor_hand">-->
                          <!--<img src="../../assets/imgs/icon-delete-comment.png" alt="">删除-->
                          <!--</div>-->
                          <div class="flex flex-align-center flex-justify-between diss-personOne" @click="changePlaceholderFn1(index,c_index,discuss.userProfile?discuss.userProfile.nickName:'',discuss.userProfile?discuss.userProfile.uid:'')">
                            <div class="flex flex-align-center">
                              <div class="thumb-box cursor_hand">
                                <img v-if="discuss.anonymity=='1'" src="../../assets/imgs/anonymityImg.png" alt="">
                                <img v-else :src="discuss.userProfile && discuss.userProfile.avatarHttpd?discuss.userProfile.avatarHttpd:discuss.userProfile.avatarUrl" alt="">
                              </div>
                              <span class="cursor_hand">{{discuss.userProfile?discuss.userProfile.nickName:''}}</span>
                            </div>
                            <p class="diss-timmer">{{discuss.cTimes}}</p>
                          </div>
                          <div class="diss-personTwo-box"><span class="cursor_hand" v-if="discuss.referenceUid" >@ <span @click="changePlaceholderFn1(index,c_index,discuss.refUserProfile?discuss.refUserProfile.nickName:'',discuss.refUserProfile?discuss.refUserProfile.uid:'')" class="diss-personTwo">{{discuss.refUserProfile.nickName}} </span>：</span><span class="diss-content">{{discuss.content}}</span></div>
                          <div class="flex flex-align-center diss-bom">
                            <button :disabled="isdissLikeDisabled" @click="changeDissLikeFn(index,c_index,discuss.id,discuss.likeStatus)" class="flex flex-align-center diss-icon-box cursor_hand">
                              <img v-show="discuss.likeStatus" src="../../assets/imgs/icon-topic-like.png" alt="">
                              <img v-show="!discuss.likeStatus" src="../../assets/imgs/icon-topic-nolike.png" alt="">
                              {{discuss.likeNum}}
                            </button>
                            <div style="color: #909090;">|</div>
                            <div @click="changePlaceholderFn1(index,c_index,discuss.userProfile?discuss.userProfile.nickName:'',discuss.userProfile?discuss.userProfile.uid:'')" class="flex flex-align-center diss-icon-box cursor_hand">
                              <img style="margin-top: 1px;" src="../../assets/imgs/icon-more-replay.png" alt="">回复
                            </div>
                            <div v-if="discuss.owner" style="color: #909090;">|</div>
                            <div v-if="discuss.owner" @click="deleteCommentFn(index,c_index,discuss.id)" class="flex flex-align-center diss-icon-box cursor_hand">
                              <img src="../../assets/imgs/icon-delete-comment.png" alt="">删除
                            </div>
                          </div>

                          <!--评论框1-->
                          <div v-show="discuss.diss_comStyle" style="margin-top: 10px;"  class="disscussForm">
                            <el-input class="disscuss-textarea"
                                      :ref="'dissinput_'+index+'_'+c_index"
                                      type="textarea"
                                      :autosize="{ minRows: 1}"
                                      v-on:focus="dissFocus(index,c_index)"
                                      v-on:blur="dissBlue(index,c_index)"
                                      :maxlength="1000"
                                      v-model="discuss.diss_commentText"
                                      :placeholder="discuss.diss_complaceHolder"
                                      cols="30" rows="10">
                            </el-input>
                            <div class="flex flex-justify-between dissForm-bom">
                              <div class="limitNum">
                                <!--<span>{{discuss.diss_commentText?discuss.diss_commentText.length:'0'}} / 1000</span>-->
                              </div>
                              <div class="flex flex-align-center dissFormR">
                                <div class="flex flex-align-center aninymityBox cursor_hand" @click="changeDissAnomity(index,c_index)">
                                  <img v-show="discuss.diss_anonymity" src="../../assets/imgs/icon-anonymity-active.png" alt="">
                                  <img v-show="!discuss.diss_anonymity" src="../../assets/imgs/icon-anonymity.png" alt="">
                                  <span style="width: 56px;text-align: center;">{{discuss.diss_anonymity?'匿名':'不匿名'}}</span>
                                </div>
                                <!--:disabled="discuss.diss_gray"-->
                                <button  v-bind:style="{'background-color':discuss.diss_gray === true ? 'rgb(189, 192, 193) ':''}" class="commentBtn" @click="sendCommentFn1(index,c_index,answerList.id)" type="button">提交</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div v-show="answerList.com_totalNum>10" class="pagination-warpper">
                        <el-pagination
                          layout="prev, pager, next"
                          :total="answerList.com_totalNum"
                          @current-change="(value) => currentChange(value,'#anchor-'+index, index,answerList.id,answerList.dissStyle)"
                        >
                        </el-pagination>
                      </div>
                    </div>

                    <!--评论框-->
                    <!--<div style="padding: 15px 20px 0;">{{answerList.commentPlaceHolder}}</div>-->
                    <div :id="'disscussform-'+index" class="disscussForm">

                      <el-input class="disscuss-textarea" type="textarea"
                                v-on:focus="dissBgFocus(index)"
                                v-on:blur="dissBgBlue(index)"
                                :ref="'ansinp_'+index"
                                :autosize="{ minRows: 1}"
                                :maxlength="1000"
                                v-model="answerList.commentText"
                                placeholder="请填写您的评论..."
                                cols="30" rows="10">
                      </el-input>
                      <div class="flex flex-justify-between dissForm-bom">
                        <div class="limitNum">
                          <span>{{answerList.commentText.length}} / 1000</span>
                        </div>
                        <div class="flex flex-align-center dissFormR">
                          <div class="flex flex-align-center aninymityBox cursor_hand" @click="changeCommentAnomity(index)">
                            <img v-show="answerList.commentAnonymity" src="../../assets/imgs/icon-anonymity-active.png" alt="">
                            <img v-show="!answerList.commentAnonymity" src="../../assets/imgs/icon-anonymity.png" alt="">
                            <span style="width: 56px;text-align: center;">{{answerList.commentAnonymity?'匿名':'不匿名'}}</span>
                          </div>
                          <button class="commentBtn" v-bind:style="{'background-color':answerList.diss_gray === true ? 'rgb(189, 192, 193) ':''}" @click="sendCommentFn(index,answerList.id)" type="button">提交</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <!--我是有底线的~-->
            <div style="margin-top: 30px;border-top: 1px solid #ddd;" id="line_ans" class="Card Answers-none">
              <div class="EmptyState">
                <div class="EmptyState-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" width="150" height="120" viewBox="0 0 150 120" class="EmptyState-image">
                    <title></title>
                    <g>
                      <g fill="none" fill-rule="evenodd">
                        <path fill="#EBEEF5" fill-rule="nonzero" d="M67.757 83H45c-1.66 0-3-1.338-3-2.998V37.998A3.003 3.003 0 0 1 45 35h53.42v-3H45c-3.31 0-6 2.686-6 5.998v42.004A5.994 5.994 0 0 0 45 86h21.515l6.853 6.854a2.99 2.99 0 0 0 4.234 0L84.456 86H105c3.31 0 6-2.686 6-5.998v-36.54h-3v36.54A3.003 3.003 0 0 1 105 83H83.214l-7.728 7.728L67.756 83z"></path><path fill="#F7F8FA" d="M55 48.5c0-.828.67-1.5 1.508-1.5h26.984a1.5 1.5 0 1 1 0 3H56.508A1.5 1.5 0 0 1 55 48.5zm0 11c0-.828.677-1.5 1.495-1.5h37.01c.826 0 1.495.666 1.495 1.5 0 .828-.677 1.5-1.495 1.5h-37.01A1.494 1.494 0 0 1 55 59.5zm0 11c0-.828.677-1.5 1.495-1.5h37.01c.826 0 1.495.666 1.495 1.5 0 .828-.677 1.5-1.495 1.5h-37.01A1.494 1.494 0 0 1 55 70.5z"></path><path fill="#EBEEF5" fill-rule="nonzero" d="M94.868 50.46l18.92-18.92-2.83-2.827-18.918 18.92-2.12-2.123 18.917-18.918a3.005 3.005 0 0 1 4.245-.002l2.828 2.828a3.004 3.004 0 0 1-.002 4.245L96.99 52.58l-2.122-2.12zm-7.193 2.377l2.244-7.327 7.07 7.07-7.328 2.245c-1.575.482-2.473-.405-1.988-1.988z">

                      </path>
                      </g>
                    </g>
                  </svg>
                  <div class="answerBtn">到底线了 ~,
                    <!--，开始-->
                    <span @click="writeAnswerHref" style="text-decoration: underline;color: #175199;" type="button" class="Button QuestionAnswers-answerLink Button--plain Button--blue cursor_hand">我来回答</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="noAnsWrapper main-border" v-else>暂无回答~</div>
        </div>


        <aside class="fr main-right">
          <div>
            <zxscan></zxscan>
            <div :class="isRfix?'is-fixed':''" :style="isRfix?styleObject:''" class="main-r-inner">
              <ranking></ranking>
            </div>

          </div>
        </aside>
      <!--</div>-->
    </div>

    <div id="scanBox" style="display: none">
      <shareQrCode></shareQrCode>
    </div>
    <!--提问题-->
    <askwarp :isShowqsnBox="isShowqsnBox" @isCloseqsnBox="closeModal"></askwarp>
    <!--举报弹框-->
    <report @isCloseReportBox="closeReportModal" :dialogVisible="dialogVisible" :qid="dialogQid" :aid="dialogAid"></report>
  </div>
</template>

<style lang="less" src="./moreAnswer.less"></style>
<style lang="less" src="../../assets/css/foldcontent.less"></style>

<script>
  import Vue from 'vue';
  import * as common from '../../assets/js/common';
  import top from '../../components/top.vue';
  import search from '../../components/search.vue';
  import zxscan from '../../components/zxscan.vue';
  import ranking from '../../components/ranking.vue';
  import * as moreAnswer from '../../api/moreAnswer';
  import { MessageBox } from 'element-ui';
  import shareQrCode from '../../components/shareqrcode.vue';
  import askwarp from '../../components/askwarp.vue';
  import report from '../../components/report.vue';
  import { Message } from 'element-ui';
  let cb={};

  class foldcontent {
    constructor(option) {
      const defaultOption = {
        container: document.getElementsByClassName('foldcontent-panel'),
        btnBg: '#eff6fa',
        btnColor: '#0c5897',
        fixBtnBg: '#81baeb',
        fixBtnColor: '#fff',
        fontSize: '12px',
        padding: '5px',
        initialText: '展开',
        fixText: '收起',
        bottom: '15px',
        right: '0px',
        // bottom: '1px',
        lineHeight: '1'
      };
      for(let defauleKey in defaultOption) {
        if(defaultOption.hasOwnProperty(defauleKey) && !option.hasOwnProperty(defauleKey)) {
          option[defauleKey] = defaultOption[defauleKey];
        }
      }
      this.container = option.container;
      this.init(option);
    }

    init(option) {
      let doc = document,
        win = window,
        fold = doc.getElementsByClassName('unfold'),
        btnRight = parseInt(option.right),
        initialText = option.initialText,
        fixText = option.fixText;

      let html = `<div class="unfold" style="background-color: ${option.btnBg}; color: ${option.btnColor}; font-size: ${parseInt(option.fontSize) + 'px'};
 line-height: ${option.lineHeight}; right: ${option.right};bottom: ${option.bottom}; padding: ${option.padding};">${option.initialText}</div>`;
      // Array.from(this.container).forEach(function (i) {
      //     i.innerHTML += html;
      // });
      var aa=this.container;
      Array.from = function (aa) {
        return Array.apply(this, aa);
      };

      Array.from(this.container).forEach(function (i) {
        i.innerHTML += html;
      });

      for(let i = 0; i < fold.length; i++){
        fold[i].addEventListener('click', (e) => {
          let target = e.target,
            part = doc.getElementsByClassName('part-content')[i],
            all = doc.getElementsByClassName('all-content')[i],
            btnBottom = parseInt(target.style.padding);
          if(target.innerHTML !== fixText) {
            target.innerHTML = fixText;
            this.toggle(part, all);
            let panel = target.parentNode,
              panelWidth = parseInt(window.getComputedStyle(panel,null).getPropertyValue('width')),
              h = win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight || 0,
              w = doc.documentElement.getBoundingClientRect().width || 0,
              // jquery width() 方法, 不包含滚动条宽度 vs document.body.clientWidth == document.body.offsetWidth  window.innerWidth)
              s = win.pageYOffset || doc.body.scrollTop || doc.documentElement.scrollTop || 0;
            h = h + s;
            let t = panel.offsetTop,
              p = panel.offsetParent;
            while (p !== null) {
              t += p.offsetTop;
              p = p.offsetParent;
            }
            t += panel.clientHeight;
            let right = (w - panelWidth) / 2 + btnRight > btnRight ?
              (w - panelWidth) / 2 + btnRight : btnRight,
              allContent = document.getElementsByClassName('all-content')[i],
              allShow = allContent.style.display;
            if (h - t < btnBottom) {
              let fixBtn = doc.querySelector('.fix-btn');
              if (fixBtn) {
                this.changeStyle(fixBtn, option);
              }
              target.style.right = right + 'px';
              this.changeFix(target, option);
              if (allShow === 'block') {
                target.classList.add('slide-btn')
              }
            }

            cb = {
              onscroll: () => {
                let h = win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight || 0,
                  w = doc.documentElement.getBoundingClientRect().width || 0,
                  s = win.pageYOffset || doc.body.scrollTop || doc.documentElement.scrollTop || 0;
                h = h + s;
                let t = panel.offsetTop,
                  p = panel.offsetParent;
                while (p !== null) {
                  t += p.offsetTop;
                  p = p.offsetParent;
                }
                let th = t + panel.clientHeight,
                  right = (w - panelWidth) / 2 + btnRight > btnRight ?
                    (w - panelWidth) / 2 + btnRight : btnRight,
                  allContent = document.getElementsByClassName('all-content')[i],
                  allShow = allContent.style.display;

                if (th - h > 0 && h - t > 90 && target.innerHTML !== initialText) {
                  target.style.right = right + 'px';
                  this.changeFix(target, option);
                  if (allShow === 'block') {
                    target.classList.remove('slide-btn')
                  }
                } else {
                  this.changeStyle(target, option);
                }
                common.remove(window, 'scroll',
                  cb.onscroll
                );
                // doc.removeEventListener("scroll", cb.onscroll, false);
                setTimeout(() => {
                  common.addEvent(window,'scroll', cb.onscroll);
                  // doc.addEventListener("scroll", cb.onscroll);
                }, 50);
              }
            };
            common.addEvent(window,'scroll',cb.onscroll);
            // doc.addEventListener('scroll', cb.onscroll, false);
          } else {
            this.changeStyle(target, option);
            target.innerHTML = initialText;
            this.toggle(part, all);
          }
        });
      }
    }
    // ES6 布丁参数, 停止使用 arguments
    toggle(...list) {
      for(let i of list) {
        if (window.getComputedStyle(i,null).getPropertyValue('display') !== 'none') {
          i.style.display = 'none'
        } else {
          i.style.display = 'block'
        }
      }
    }
    changeStyle(i, option) {
      let style = i.style;
      style.right = option.right;
      style.color = option.btnColor;
      style.backgroundColor = option.btnBg;
      style.position = 'absolute';
      i.classList.remove('fix-btn');
    }
    changeFix(i, option) {
      let style = i.style;
      style.color = option.fixBtnColor;
      style.backgroundColor = option.fixBtnBg;
      style.position = 'fixed';
      i.classList.add('fix-btn');
    }
  }

  export default {
    name: 'topic',
    data() {
      return {
        isRfix:false,
        mRoffTop:0,
        styleObject:{
          left:0,
          top: 0,
        },
        isfollowDisabled:false,   //关注问题按钮冷却
        islikedDisabled:false,   //点赞回答按钮冷却
        isdissLikeDisabled:false,   //点赞评论按钮冷却
        isShowqsnBox:false,  //最后要改成false
        dialogVisible: false,
        dialogQid: -1,
        dialogAid: -1,

        noansData: false,
        urlCodeImg: require('../../assets/imgs/share-qrcode.png'),
        operationStyle: {
          height: '160px'
        },
        questData:{},
        answerData:[],  //初始化
        totalNum:0, //总数据条数
        Len:0, //已加载的数据条数
        pagesize: 10, //每页条数
        page: 1,  //第一页
        source: '',
        qid:'' ,     //测试用
        // qid:2272 ,     //测试用
        anonymity:1,   //默认不匿名
      }
    },
    components: {
      top,
      search,
      ranking,
      zxscan,
      shareQrCode,
      askwarp,
      report
    },
    created() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      let qid=this.$route.query.qid?this.$route.query.qid:this.$route.query.attachid;
      let source=this.$route.query.source;
      this.qid=qid;
      this.source=source;
      this.getQuestionFn();
      this.getAnswerList();     //回答list
      this.pullRefresh();
    },
    mounted(){
      let mRoffTop = this.$el.querySelector('.main-r-inner').offsetTop;
      this.mRoffTop = mRoffTop;
    },
    // watch: {
    //   answerData(old, o) {
    //     if(old.length > 0) {
    //       setTimeout(() =>{
    //         let foldContentDemo = new foldcontent({
    //           'btnBg': '#ddd',
    //           'btnColor': '#fff',
    //           'fixBtnBg': '#81baeb',
    //           'fixBtnColor': '#fff',
    //           'fontSize': '12px',
    //           'padding': '5px',
    //           'initialText': '展开',
    //           'fixText': '收起',
    //           'bottom': '1px',
    //           'right': '0',
    //           'lineHeight': '1'
    //         });
    //       },10);
    //     }
    //   }
    // },
    destroyed() {
      common.remove(window, 'scroll',
        cb.onscroll
      );
      common.remove(window, 'scroll',
        this.scrollChange,
      );
    },
    methods: {
      supplementBgFocus(a_index) {
        this.answerData[a_index]['supplement_gray'] = false;
      },
      supplementBgBlue(a_index) {
        this.answerData[a_index]['supplement_gray'] = true;
      },
      // 失去焦点变灰
      dissBlue(a_index,c_index) {
        this.answerData[a_index]['discussList'][c_index]['diss_gray'] = true;
        // console.log(12)
      },
      dissFocus(a_index,c_index) {
        // discuss
        // console.log(1)
        this.answerData[a_index]['discussList'][c_index]['diss_gray'] = false;

      },

      dissBgFocus(a_index) {
        this.answerData[a_index]['diss_gray'] = false;

      },
      // 失去焦点变灰
      dissBgBlue(a_index) {
        this.answerData[a_index]['diss_gray'] = true;
      },
      writeAnswerHref() {
        this.$router.push({
          path: '/writeAnswer',
          query: {
            qid: this.qid
          }
        });
//        let routerWriteAnswer = this.$router.resolve({
//          path: '/writeAnswer',
//          query: {
//            qid: this.qid
//          }
//        });
//        window.open(routerWriteAnswer.href, '_blank');
      },
      showAskBoxFn(args) {
        this.isShowqsnBox=args;
      },

      closeModal(args) {
        this.isShowqsnBox = args;
      },
      // mainR FIX 开关
      childByValue(args) {
        let style_left= this.$el.querySelector('.main-right').offsetLeft;
        // fixed
        if(args === true){
          let styleObject={
            left:style_left+'px',
            top: '0',
          }
          this.styleObject=styleObject;
          this.isRfix= args;

        }else{
          this.isRfix= args;
        }
      },

      showReportbox(id,qaId) {
        this.dialogVisible = true;
        if(qaId == 'report_qid'){
          this.dialogQid = id;
        }else if(qaId == 'report_aid'){
          this.dialogAid = id;
        }
      },

      closeReportModal(args) {
        this.dialogVisible = args
      },

      // 改变评论当前页
      currentChange(options,anchor,a_index,refaid,dissStyle) {
        // options  当前页
        // document.querySelector("#app").scrollTop = this.$el.querySelector(anchor).offsetTop;
        this.get_answerCommentFn(a_index,refaid,false,options);
         document.body.scrollTop = document.documentElement.scrollTop = this.$el.querySelector(anchor).offsetTop;
      },

      getQuestionFn() {
        let self = this;
        let source = this.source;
//        if(source == 'search'){
          moreAnswer.questDetail({
            qid: this.qid
          }).then(res => {
            if(res.data && res.code=='1001'){
              this.questData=res.data;
            }
          });
//        }
      },

      getAnswerList() {
        let self = this;
        let source = this.source;
        if(source == 'myAnswerlist'){
          moreAnswer.myAnswerdetail({
            aid: this.$route.query.aid
          }).then(res => {
            if(res.data && res.code=='1001'){
              let answerData=res.data.answer;
              let totalNum=1;
              let size = this.Len + res.data.answer.length;

              answerData.forEach(function (item) {
                item['supplementStyle']=false;
                item['supplementText']='';   //补充的回答
                item['supplement_gray']=false;

                item['com_page']=1;
                item['com_totalNum']=0;
                item['dissStyle']=false;
                item['diss_gray']=false;
                item['discussList']=[];
                item['commentText']='';
                // item['commentPlaceHolder']='';
                item['commentAnonymity']=0;    //默认不匿名
                item['ata_uid']='';   //默认没有@任何人，仅仅是评论答案

                if(item['level']){
                  item['levelClass']=common.getlevelClass(item['level']);
                }

                // 是否为补充的答案
                if(item['content'].indexOf("***anonymity***")!='-1'){   //有补充回答
                  let contents=item['content'].split("***anonymity***");
                  let contentNew=contents[0];
                  let contentReplenish=contents.slice(1);
                  let result=[];
                  // console.log(answerData['contentNew'],contentReplenish,'----2222222222222---------')
                  for(let i=0;i<contentReplenish.length;i+=2){
                    result.push(contentReplenish.slice(i,i+2))
                  }
                  item['newAnswerData0']=contentNew;
                  item['newAnswerData1']=result;

                  item['contentLength'] = item['newAnswerData0'].length;
                  console.log(item['newAnswerData0'].length)
                }else{
                  item['contentLength'] = item['content'].length;
                  console.log(item['content'].length)
                }

                if(item['anonymity']=='1'){    //1匿名；0不匿名
                  // item['userProfile']['avatarUrl']='../../assets/imgs/anonymityImg.png';
                  item['userProfile']['nickName']='匿名用户';
                }
              });
              console.log(this.answerData);
              this.answerData=this.answerData.concat(answerData);

                  if(this.answerData.length > 0) {
                    setTimeout(() =>{
                      let foldContentDemo = new foldcontent({
                        'btnBg': '#ddd',
                        'btnColor': '#fff',
                        'fixBtnBg': '#81baeb',
                        'fixBtnColor': '#fff',
                        'fontSize': '12px',
                        'padding': '5px',
                        'initialText': '展开',
                        'fixText': '收起',
                        'bottom': '1px',
                        'right': '0',
                        'lineHeight': '1'
                      });
                    },10);
                  }

            }else if(res.code=='1004') {
              this.noansData=true;
            }
          });
        }
        else {
          moreAnswer.answerList({
            page: this.page,
            pagesize: this.pagesize,
            qid: this.qid
          }).then(res => {
            if(res.data && res.code=='1001'){
              let answerData=res.data;
              let totalNum=res.ansTotals;
              let size = this.Len + res.data.length;

              answerData.forEach(function (item) {
                item['supplementStyle']=false;
                item['supplementText']='';   //补充的回答

                item['com_page']=1;
                item['com_totalNum']=0;
                item['dissStyle']=false;
                item['discussList']=[];
                item['commentText']='';
                // item['autofocus']=false;
                // item['commentPlaceHolder']='';
                item['commentAnonymity']=0;    //默认不匿名
                item['ata_uid']='';   //默认没有@任何人，仅仅是评论答案

                if(item['level']){
                  item['levelClass']=common.getlevelClass(item['level']);
                }
                // 是否为补充的答案
                if(item['content'].indexOf("***anonymity***")!='-1'){   //有补充回答
                  let contents=item['content'].split("***anonymity***");
                  let contentNew=contents[0];
                  let contentReplenish=contents.slice(1);
                  let result=[];
                  // console.log(answerData['contentNew'],contentReplenish,'----2222222222222---------')
                  for(let i=0;i<contentReplenish.length;i+=2){
                    result.push(contentReplenish.slice(i,i+2))
                  }
                  item['newAnswerData0']=contentNew;
                  item['newAnswerData1']=result;
                  item['contentLength'] = item['newAnswerData0'].length;
                }else{
                  item['contentLength'] = item['content'].length;
                };

                if(item['anonymity']=='1'){    //1匿名；0不匿名
                  // item['userProfile']['avatarUrl']='../../assets/imgs/anonymityImg.png';
                  item['userProfile']['nickName']='匿名用户';
                }
              });
              this.answerData=this.answerData.concat(answerData);

              if(this.answerData.length > 0) {
                setTimeout(() =>{
                  let foldContentDemo = new foldcontent({
                    'btnBg': '#ddd',
                    'btnColor': '#fff',
                    'fixBtnBg': '#81baeb',
                    'fixBtnColor': '#fff',
                    'fontSize': '12px',
                    'padding': '5px',
                    'initialText': '展开',
                    'fixText': '收起',
                    'bottom': '1px',
                    'right': '0',
                    'lineHeight': '1'
                  });
                },10);
              }
            }else if(res.code=='1004') {
              this.noansData=true;
            }
          });
        }
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

      // 删除回答
      deleteAnsFn(a_index,aid) {
        let questData=this.questData;
        let answerData=this.answerData;
        moreAnswer.deleteAnswer({
          aid: aid,
        }).then(res => {
          if(res.code=='1000' || res.code=='1001'){
            questData.totalsNum.numAnswer--;
            // 此项答案消失
            answerData.splice(a_index,1);
            this.questData=questData;
            this.answerData=answerData;
            Message.success('删除成功~');
            if(this.answerData.length<1){
              this.noansData = true;
            }

          }else{
            alert(res.msg);
          }
        });
      },

      // 删除某条评论
      deleteCommentFn(a_index,c_index,id) {
        let questData=this.questData;
        let answerData=this.answerData;
        moreAnswer.deleteComment({
          id: id,
        }).then(res => {
          if(res.code=='1000'){
            // questData.totalsNum.numAnswer--;
            // // 此项评论消失
            if(answerData[a_index]['totalsNum'] && answerData[a_index]['totalsNum']['commentNum']){
              -- answerData[a_index]['totalsNum']['commentNum'];
            };
            answerData[a_index]['discussList'].splice(c_index,1);
            // this.questData=questData;
            this.answerData=answerData;
            Message.success('删除评论成功~');
          }else{
            Message.warning('res.msg');
          }
        });
      },

      // 显示补充回答框框
      showSupplementFn(a_index,supplementStyle) {
        let answerData=this.answerData;
        if(supplementStyle){
          answerData[a_index]['supplementStyle']=false;
        }else{
          answerData[a_index]['supplementStyle']=true;
        }
        this.answerData=answerData;
        // ans_supplement
        this.$nextTick(function () {
          let ans_supplements='ans_supplement'+a_index;
          this.$refs[ans_supplements][0].$el.querySelector('textarea').focus();
        });
      },

//      提交补充的回答
      sendSupplementFn(a_index,aid) {
        let timer=this.formatTime(new Date());
        let supplementText=this.answerData[a_index]['supplementText'];
        if(supplementText===''){
          return false;
        }
      // 得到当前的补充时间date;为补充内容添加特殊字符***anonymity***
        moreAnswer.supplementAnswer({
          aid:aid,
          content:'***anonymity***'+"补充于"+timer+'***anonymity***'+supplementText,
        }).then(res => {

          if(res.code=='1000'){
            // that.$message('提交成功！');
            this.answerData[a_index]['supplementText']='';   //清空
            this.answerData[a_index]['supplementStyle']=false;
            Message.success('提交成功,我们正在加速审核~');
          }else{
            Message.warning('res.msg');
          }
        });
      },

      // 获取答案的评论列表
      get_answerCommentFn(a_index,refaid,dissStyle,com_page) {
        let that=this;
        let answerData=that.answerData;
        if(!dissStyle){
          moreAnswer.answerCommentGet({
            page: com_page,
            pagesize: 10,
            refaid: refaid
          }).then(res => {
            if(res.data && res.code=='1001'){
              let discussList=res.data;
              discussList.forEach(function (item) {
                item['diss_comStyle']=false;     //评论的回复框
                item['diss_anonymity']=0;    //默认不匿名
                item['diss_complaceHolder']='';
                item['diss_commentText']='';      //评论的回复内容
                item['diss_gray'] = false;
              });
              answerData[a_index]['com_totalNum']=res.totals?res.totals:0;
              answerData[a_index]['dissStyle']=true;
              answerData[a_index]['discussList']=discussList;
              that.answerData=answerData;
              console.log(that.answerData)
            }else if(res.code=='1004'){
              answerData[a_index]['dissStyle']=true;
              that.answerData=answerData;
            }
            this.$nextTick(function () {
              let ansinp_s='ansinp_'+a_index;
              this.$refs[ansinp_s][0].$el.querySelector('textarea').focus();
            });
          });
        }else{
          that.answerData[a_index]['dissStyle']=false;
          // that.answerData[a_index]['autofocus']=false;
          // that.answerData[a_index]['commentPlaceHolder']='';
          that.answerData[a_index]['ata_uid']='';
        }
      },

      // 更改评论的回复框
      changePlaceholderFn1(a_index,c_index,nickName,ata_uid) {
        let that = this;
        let answerData=this.answerData;
        let userId =  this.getCookie('userId');
        console.log(ata_uid,userId,'userId--');
        if( userId && ata_uid == userId){
          Message.warning('对不起，自己不能回复自己~');
          return false;
        }
        answerData[a_index]['ata_uid']=ata_uid;
        // 评论 @
        // answerData[a_index]['commentPlaceHolder']='回复'+nickName+":";
        answerData[a_index]['discussList'][c_index]['diss_comStyle'] = true;
        answerData[a_index]['discussList'][c_index]['diss_complaceHolder']='@' +nickName;
        this.answerData=answerData;
        this.$nextTick(function () {
          let dissinputs='dissinput_'+a_index+'_'+c_index;
          this.$refs[dissinputs][0].$el.querySelector('textarea').focus();
        });
        // document.body.scrollTop = document.documentElement.scrollTop = this.$el.querySelector(disscussform).offsetTop;

      },

      // changePlaceholderFn(a_index,disscussform,nickName,ata_uid) {
      //   let answerData=this.answerData;
      //   answerData[a_index]['ata_uid']=ata_uid;
      //   // 评论 @
      //   answerData[a_index]['commentPlaceHolder']='回复'+nickName+":";
      //   this.answerData=answerData;
      //   document.body.scrollTop = document.documentElement.scrollTop = this.$el.querySelector(disscussform).offsetTop;
      //
      // },

      // 评论点赞
      changeDissLikeFn(a_index,c_index,acid,likeStatus){
        this.isdissLikeDisabled = true;
        if(!likeStatus){
          moreAnswer.acommentLike({   //点赞评论
            acid:acid,
          }).then(res => {
            this.isdissLikeDisabled = false;
            if(res.code=='1000'){
              this.answerData[a_index]['discussList'][c_index]['likeStatus']=true;
              this.answerData[a_index]['discussList'][c_index]['likeNum']++ ;
            }
          });
        }else{
          moreAnswer.acommentCancelLike({   //取消评论点赞
            acid:acid,
          }).then(res => {
            this.isdissLikeDisabled = false;
            if(res.code=='1000'){
              this.answerData[a_index]['discussList'][c_index]['likeStatus']=false;
              this.answerData[a_index]['discussList'][c_index]['likeNum']-- ;
            }
          });
        }
      },

      // 回复评论匿名/不匿名
      changeDissAnomity(a_index,c_index) {
        let answerData=this.answerData;
        if(answerData[a_index]['discussList'][c_index]['diss_anonymity'] === 1){
          answerData[a_index]['discussList'][c_index]['diss_anonymity'] = 0
        }else{
          answerData[a_index]['discussList'][c_index]['diss_anonymity'] = 1
        }
        this.answerData=answerData;
      },

      changeCommentAnomity(a_index) {
        let answerData=this.answerData;
        if(answerData[a_index]['commentAnonymity'] === 1){
          answerData[a_index]['commentAnonymity'] = 0
        }else{
          answerData[a_index]['commentAnonymity'] = 1
        }
        this.answerData=answerData;
      },

      // 提交回复的评论
      sendCommentFn1(a_index,c_index,refaid) {
        let that=this;
        let anonymity=this.answerData[a_index]['discussList'][c_index]['diss_anonymity'];
        let commentText=this.answerData[a_index]['discussList'][c_index]['diss_commentText'];
        let refuid=this.answerData[a_index]['ata_uid'];

        if(commentText===''){
          return false;
        }
        // console.log(a_index,refaid,refuid,anonymity,commentText);
        moreAnswer.answerComment({
          refaid:refaid,
          refuid:refuid,
          anonymity:anonymity,
          content:commentText
        }).then(res => {
          if(res.data && res.code=='1000'){
            console.log(res.data);
            let resdataDiss=res.data[0];
            // 初始化
            resdataDiss['diss_comStyle']=false;     //评论的回复框
            resdataDiss['diss_anonymity']=0;    //默认不匿名
            resdataDiss['diss_complaceHolder']='';
            resdataDiss['diss_commentText']='';      //评论的回复内容
            // that.answerData[a_index]['discussList'].unshift(res.data[0]);
            that.answerData[a_index]['discussList'][c_index]['diss_comStyle'] = false;
            that.answerData[a_index]['discussList'][c_index]['diss_commentText']='';   //清空
            that.answerData[a_index]['discussList'].splice(c_index+1,0,resdataDiss);
            Message.success('提交评论成功~');
          }else{
            Message.warning(res.msg);
          }
        });
      },

      // 提交评论
      sendCommentFn(a_index,refaid) {
        let that=this;
        let anonymity=this.answerData[a_index]['commentAnonymity'];
        let commentText=this.answerData[a_index]['commentText'];
        // let refuid=this.answerData[a_index]['ata_uid'];
        let refuid='';

        if(commentText===''){
          return false;
        }
        // console.log(a_index,refaid,refuid,anonymity,commentText);
        moreAnswer.answerComment({
          refaid:refaid,
          refuid:refuid,
          anonymity:anonymity,
          content:commentText
        }).then(res => {
          that.answerData[a_index]['commentText']='';   //清空
          if(res.data && res.code=='1000'){
            console.log('提交评论成功~');
            if(that.answerData[a_index]['totalsNum'] && that.answerData[a_index]['totalsNum']['commentNum']){
              ++ that.answerData[a_index]['totalsNum']['commentNum'];
            }
            // that.answerData[a_index][]
            that.answerData[a_index]['discussList'].unshift(res.data[0]);
            Message.success('提交评论成功~');
          }else{
            Message.warning(res.msg);
          }
        });
      },

      changeFollowed(qid,followed) {
        let questData=this.questData;
        this.isfollowDisabled = true;
        if(followed == 0){
          moreAnswer.questFollow({
            qid: qid,
          }).then(res => {
            this.isfollowDisabled = false;
            if(res.code=='1000'){
              questData.followed='1';
              questData['totalsNum']['numFollow']++;
              this.questData=questData;
            }else if(res.code=='1004'){
              // that_s.attr("disabled",false);
              // console.log('没有找到相关数据');
            }
          })
        } else if(followed == 1){  //取消关注
          moreAnswer.cancelQuestFollow({
            qid: qid,
          }).then(res => {
            this.isfollowDisabled = false;
            if(res.code=='1000'){
              questData.followed='0';
              questData['totalsNum']['numFollow']--;
              this.questData=questData
            }else if(res.code=='1004'){
              // that_s.attr("disabled",false);
              // console.log('没有找到相关数据');
            }
          })
        }
      },

      changeLiked(a_index,aid,liked) {
        let that=this;
        that.show = !that.show;
        that.islikedDisabled = true;
        let answerData=this.answerData;
        if(liked == 0){
          moreAnswer.answerLike({
            aid: aid,
          }).then(res => {
            that.islikedDisabled = false;
            if(res.code=='1000'){
              answerData[a_index]['liked']='1';
              answerData[a_index]['totalsNum']['numLike']+=1;
              that.answerData=answerData;

            }else if(res.code=='1004'){
              // that_s.attr("disabled",false);
              // console.log('没有找到相关数据');
            }
          })
        } else if(liked == 1){  //取消点赞
          moreAnswer.cancelAnswerLike({
            aid: aid,
          }).then(res => {
            that.islikedDisabled = false;
            if(res.code=='1000'){
              answerData[a_index]['liked']='0';
              answerData[a_index]['totalsNum']['numLike']-=1;
              that.answerData=answerData
            }else if(res.code=='1004'){
              // that_s.attr("disabled",false);
              // console.log('没有找到相关数据');
            }
          })
        }
      },

      formatTime: function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        return year+'年'+month+'月'+day+'日';
        // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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
        // var _this = this;
        // window.onscroll = function () {
        //   _this.scrollChange()
        // }
        common.addEvent(window,'scroll', this.scrollChange);
      },

      scrollChange: function () {
        var _this = this,
          currentPage = {page: this.page};
        this.scollY = Math.ceil( this.getScrollTop() + this.getWindowHeight()) - this.getScrollHeight();
        // console.log(this.scollY);
        // 把下拉刷新置为false，防止多次请求
        if (this.scollY >= 0) {
          if (this.Len >= this.totalNum) {
            console.log('没有更多数据了。。。');
            return false;
          }

          console.log('0')

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
