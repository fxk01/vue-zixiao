/*
 loginStore
 */

import {
  SEARCH_MSG,
  FOLLOW_GZ,
  CANCEL_FOLLOW_GZ,
} from './mutation-types';
import * as searchApi from '../../../api/searchPage';
const objMsg = {
  data: [],
};

export default {
  state: {
    page: 1,
    searchTotal: '',
    searchStop: false,
    searchData: [],
  },
  actions: {
    [SEARCH_MSG](context, data) {
      searchApi.postSearchMsg({
        input: data.text,
        tip: 1,
        page: data.page,
        pagesize: 10
      }).then(res => {
        context.commit('mutationsMsg', res);
      });
    },
    [FOLLOW_GZ](context, data) {
      searchApi.questFollow({
        qid: data.id
      }).then(res => {
        context.commit('muFollowMsg', {
          data,
          res
        });
      });
    },
    [CANCEL_FOLLOW_GZ](context, data) {
      searchApi.cancelQuestFollow({
        qid: data.id
      }).then(res => {
        context.commit('muCancelFollow', {
          data,
          res
        });
      });
    }
  },
  mutations: {
    mutationsMsg(state, json) {
      if(json.data && json.data.length <= 0) {
        Object.assign(json, objMsg);
      }
      state.searchTotal = json.qstnTotals;
      if(json.data){
        json.data.forEach((item) => {
          state.searchData.push(item);
        });
      }

      if(state.searchData.length && state.searchData.length === parseInt(json.qstnTotals)) {
        state.searchStop = true
      }
    },
    muFollowMsg(state, json) {
      ++state.searchData[json.data.index].totalsNum.numFollow;
      state.searchData[json.data.index].followed = 1;
    },
    muCancelFollow(state, json) {
      --state.searchData[json.data.index].totalsNum.numFollow;
      state.searchData[json.data.index].followed = 0;
    }
  },
  getters: {
    gettersSearchMsg: state => {
      return {
        searchData: state.searchData,
        searchTotal: state.searchTotal,
      }
    },
  },
}
