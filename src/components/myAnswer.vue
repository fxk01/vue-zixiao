<template>
  <div class="myAnswer">
    <ul>
      <li v-for="(item,index) in data" :key="item.id">
        <div class="problem-newItem">
          <div class="cursor_hand" @click="goMoreAnswerPage(item.id,item.answer.id)">
            <div class="title hot-title" v-html="item.content"></div>
            <!--ql-editor-->
            <div class="title hot-title fontWeight" v-html="item.answer.content.split('***anonymity***')[0]"></div>
          </div>
          <div class="flex flex-justify-between bottom">
            <div class="flex flex-align-center bottomL">
              <div v-if="item.answer && item.answer.status" class="main_status">{{item.answer.status}}</div>
              <div class="pointer" @click="openCode">
                <img src="../assets/img/delete-share.png">
                <div class="main_askNum">分享</div>
                <div id="scanBox" style="display: none">
                  <shareQrCode></shareQrCode>
                </div>

              </div>
              <div class="pointer"
                   @click="likes({id: index, love: item.answer.id, liked: item.answer.liked})"
              >
                <img v-if="item.answer.liked === 1" src="../assets/img/topic-like.png">
                <img v-if="item.answer.liked === 0" src="../assets/imgs/icon-topic-nolike.png">
                <div class="main_focusNum" v-text="item.answer.totalsNum.numLike"></div>
              </div>
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
  import {
    MY_LIKES,
    CANCEL_LIKES,
  } from '../store/modules/Topic/mutation-types';
  import { MessageBox } from 'element-ui';
  import shareQrCode from '../components/shareqrcode.vue';

  export default {
    props: ['data'],
    data() {
      return {
        urlCodeImg: require('../assets/imgs/share-qrcode.png'),
      }
    },
    components: {
      shareQrCode,
    },
    computed: {

    },
    methods: {
      // 去一问多答页面
      goMoreAnswerPage(qid,aid) {
//        myAnswerlist
        this.$router.push({name: 'moreAnswer',query:{ qid: qid,aid:aid, source: 'search'}});
      },

      likes(data) {
        if(data.liked === 1) {
          this.$store.dispatch(CANCEL_LIKES, {
            id: data.id,
            love: data.love
          });
        } else {
          this.$store.dispatch(MY_LIKES, {
            id: data.id,
            love: data.love
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
      }
    }
  }
</script>

<style lang="less">
  .myAnswer {
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
          img, div {
            vertical-align: middle;
          }
          height: 26px;
          font-size: 14px;

          .main_status{
            padding: 1px 8px;
            background-color: #eaeaea;
            border: 1px solid #eaeaea;
            border-radius: 30px;
            margin-right: 14px;
          }
          .timer, .main_askNum, .main_focusNum, .main_focus {
            width: auto;
            height: 24px;
            line-height: 24px;
            border-radius: 2px;
            display: inline-block;
            margin: 0 13px;
          }
          .main_focus {
            color: #2e41a1;
            background-color: #ebfaff;
            border: 1px solid #ebfaff;
            border-radius: 2px;
          }
          .main_askNum:after {
            content: "|";
            left: 100%;
            color: black;
            margin-left: 15px;
          }
          .pointer {
            cursor: pointer;
          }
        }
      }
      .fontWeight {
        font-weight: normal;

        img{
          max-width: 100%;
        }
      }
    }
    ul li:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
  }

</style>
