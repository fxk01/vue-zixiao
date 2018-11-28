/**
 * store入口
 */

import Vue from 'vue';
import VueX from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import state from './rootState';
import login from './modules/Login/login';
import topic from './modules/Topic/topic';
import search from './modules/SearchPage/searchPage';
import Ranking from './modules/Ranking/ranking';
import writeAnswer from './modules/WriteAnswer/writeAnswer';
Vue.use(VueX);

const store = new VueX.Store({
  state,
  getters: getters.getters,
  actions: actions.actions,
  mutations: mutations.mutations,
  modules: {
    login,
    topic,
    search,
    Ranking,
    writeAnswer,
  }
});
export default store;
