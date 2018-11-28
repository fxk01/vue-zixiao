/*
 topicStore
 */

import {
  PERSONAL_INFORMATION,
  MY_QUESTION,
  MY_FOLLOW,
  MY_ANSWER,
  MY_LIKES,
  CANCEL_LIKES,
  MODIFY_NAME,
} from './mutation-types';
import * as topic from '../../../api/topic';
import * as common from '../../../assets/js/common';

export default {
  state: {
    page: 1,
    qstnTotals: 0,
    qstnTotalsTrue: false,
    tab1: false,
    tab2: false,
    tab3: false,
    information: {
      avatarUrl: '',
      myNotification: '',
      nickName: '',
      numAnswer: '',
      numFollow: '',
      numQuestion: '',
      pointsAchievementEnergy:'',
      sysNotification: '',
      totalsLikeForward: '',
      uid: '',
    },
    myQuestionData: [],
    myFollowData: [],
    myAnswerData: [],
  },
  actions: {
    [PERSONAL_INFORMATION](context) {
      topic.personalInformation().then(res => {
        context.commit('information', res);
      });
    },
    [MY_QUESTION](context, data) {
      if(data.more === '') {
        context.commit('muTaMyQuestion', []);
        topic.myQuestion({
          page: data.page,
          pagesize: 10
        }).then(res => {
          context.commit('muTaMyQuestion', res);
        });
      } else {
        topic.myQuestion({
          page: data.page,
          pagesize: 10
        }).then(res => {
          context.commit('muTaMyQuestion', res);
        });
      }
    },
    [MY_FOLLOW](context, data) {
      if(data.more === '') {
        context.commit('muTaMyFollow', []);
        topic.myFollow({
          page: data.page,
          pagesize: 10
        }).then(res => {
          context.commit('muTaMyFollow', res);
        });
      } else {
        topic.myFollow({
          page: data.page,
          pagesize: 10
        }).then(res => {
          context.commit('muTaMyFollow', res);
        });
      }
    },
    [MY_ANSWER](context, data) {
      if(data.more === '') {
        context.commit('muTaMyAnswer', []);
        topic.myAnswer({
          page: data.page,
          pagesize: 10
        }).then(res => {
          context.commit('muTaMyAnswer', res);
        });
      } else {
        topic.myAnswer({
          page: data.page,
          pagesize: 10
        }).then(res => {
          context.commit('muTaMyAnswer', res);
        });
      }
    },
    [MY_LIKES](context, data) {
      topic.answerLike({
        aid: data.love,
      }).then(res => {
        context.commit('muTaMyLikes', {
          res,
          id: data.id,
        });
      });
    },
    [CANCEL_LIKES](context, data) {
      topic.cancelAnswerLike({
        aid: data.love,
      }).then(res => {
        context.commit('muTaMyCancelLikes', {
          res,
          id: data.id
        });
      });
    },
    [MODIFY_NAME](context, data) {
      topic.modifyName({
        nme: data,
      }).then(res => {
        context.dispatch(PERSONAL_INFORMATION);
      });
    }
  },
  mutations: {
    information(state, json) {
      state.information = json.data;
    },
    muTaMyQuestion(state, json) {
      if(!Array.isArray(json) && json.data === undefined) {
        state.tab1 = true;
      } else {
        state.tab1 = false;
        if(json.length === 0) {
          state.page = 1;
          state.qstnTotalsTrue = false;
          state.myQuestionData = json;
        } else {
          state.qstnTotals = json.qstnTotals;
          json.data.forEach((item) => {
            state.myQuestionData.push(item);
          });
          if(state.myQuestionData.length === state.qstnTotals) {
            state.qstnTotalsTrue = true;
          }
        }
      }
    },
    muTaMyFollow(state, json) {
      if(!Array.isArray(json) && json.data === undefined) {
        state.tab3 = true;
      } else {
        state.tab3 = false;
        if(json.length === 0) {
          state.page = 1;
          state.qstnTotalsTrue = false;
          state.myFollowData = json;
        } else {
          state.qstnTotals = json.followQstnTotals;
          json.data.forEach((item) => {
            state.myFollowData.push(item);
          });
          if(state.myFollowData.length === state.qstnTotals) {
            state.qstnTotalsTrue = true;
          }
        }
      }
    },
    muTaMyAnswer(state, json) {
      if(!Array.isArray(json) && json.data === undefined) {
        state.tab2 = true;
      } else {
        state.tab2 = false;
        if(json.length === 0) {
          state.page = 1;
          state.qstnTotalsTrue = false;
          state.myAnswerData = json;
        } else {
          state.qstnTotals = json.ansTotals;
          json.data.forEach((item) => {
            state.myAnswerData.push(item);
          });
          if(state.myAnswerData.length === state.qstnTotals) {
            state.qstnTotalsTrue = true;
          }
        }
      }
    },
    muTaMyLikes(state, json) {
      let numLike = state.myAnswerData[json.id].answer.totalsNum.numLike;
      state.myAnswerData[json.id].answer.totalsNum.numLike = ++numLike;
      state.myAnswerData[json.id].answer.liked = 1;
    },
    muTaMyCancelLikes(state, json) {
      let numLike = state.myAnswerData[json.id].answer.totalsNum.numLike;
      state.myAnswerData[json.id].answer.totalsNum.numLike = --numLike;
      state.myAnswerData[json.id].answer.liked = 0;
    },
  },
  getters: {
    information: state => {
      let information = state.information;
      if(information.pointsAchievementEnergy && information.pointsAchievementEnergy.achievement){
        information.pointsAchievementEnergy['achieveClass'] = common.getlevelClass(information.pointsAchievementEnergy.achievement);
      }
      return {
        information: information,
      }
    },
    getterMyQuestion: state => {
      let myQuestionData=state.myQuestionData;
      myQuestionData.forEach(function (item) {
        if(item['status']){
          item['status']=common.getStatus(item['status']);
        }
      });
      return {
        myQuestionData: myQuestionData,
        tab1: state.tab1,
      }
    },
    getterMyFollow: state => {
      let myFollowData=state.myFollowData;
      myFollowData.forEach(function (item) {
        if(item.status){
          item.status=common.getStatus(item.status);
        }
      });
      return {
        myFollowData: myFollowData,
        tab3: state.tab3,
      }
    },
    getterMyAnswer: state => {
      let myAnswerData=state.myAnswerData;
      myAnswerData.forEach(function (item) {
        if(item['answer'] && item['answer']['status']){
          item['answer']['status']=common.getStatus(item['answer']['status']);
        }
      });
      return {
        myAnswerData: myAnswerData,
        tab2: state.tab2,
      }
    },
    getterTotalsTrue: state => {
      return {
        qstnTotalsTrue: state.qstnTotalsTrue,
      }
    },
  },
}
