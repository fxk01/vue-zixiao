/*
 topicStore
 */

import {
  SUB_ANSWER_CREATE,
} from './mutation-types';
import * as writeAnswer from '../../../api/writeAnswer';

export default {
  state: {
    msg: '',
  },
  actions: {
    [SUB_ANSWER_CREATE](context, data) {
      writeAnswer.postSubContent({
        qid: data.qid,
        content: data.content,
        anonymity: data.ck,
      }).then(res => {
        context.commit('subAnswerMaTiOn', res);
      });
    },
  },
  mutations: {
    subAnswerMaTiOn(state, json) {
      state.msg = json.msg;
    },
  },
  getters: {
    subAnswerGetters: state => {
      return {
        subAnswerMsg: state.msg,
      }
    },
  },
}
