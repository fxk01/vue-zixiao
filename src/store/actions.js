import {
  SEARCH_LIST,
  ANSWER_ECHO,
} from './mutation-types';
import * as searchApi from '../api/search';
import * as swerApi from '../api/writeAnswer';

export const actions = {
  [SEARCH_LIST](context, text) {
    searchApi.searchEchoList({
      input: text
    }).then(res => {
      context.commit('searchFormation', {res, text})
    });
  },
  [ANSWER_ECHO](context, text) {
    swerApi.writeAnswerEcho({
      qid: text
    }).then(res => {
      context.commit('writeAnswerMutations', res)
    });
  }
};
