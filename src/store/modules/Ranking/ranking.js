/*
 rankingStore
 */

import {
  RANKING,
  RANKING_CHANGED
} from './mutation-types';
import * as ranking from '../../../api/ranking';
import * as common from '../../../assets/js/common';

export default {
  state: {
    pointsTotals: 0,
    pointsData: [],
  },
  actions: {
    [RANKING](context, data) {
        ranking.pointsUser({
          page: data.page,
          pagesize: data.pagesize,
          key: data.key
        }).then(res => {
          context.commit('pointsUser', res);
        });
    },
  },
  mutations: {
    pointsUser(state, json) {
      if(json.length === 0) {
        state.pointsData = json;
      } else {
        state.pointsTotals = json.totals;
        state.pointsData=[];
        if(json.data){
          json.data.forEach((item) => {
            state.pointsData.push(item);
          });
        }
      }
    },
  },
  getters: {
    getterPointsData: state => {
      let pointsData=state.pointsData;
      let pointsTotals = state.pointsTotals;
      pointsData.forEach(function (item) {
        if(item['achievement']){
          item['achieveClass']=common.getlevelClass(item['achievement']);
        }
      });
      return {
        pointsData: pointsData,
        pointsTotals:pointsTotals
      }
    },
  },
}
