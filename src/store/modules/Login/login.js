/*
 loginStore
 */

import {
  CHANGE_TEXT
} from './mutation-types';
import * as loginApi from '../../../api/login';

export default {
  state: {
    text: '你好呀！',
    arr: [],
  },
  actions: {
    [CHANGE_TEXT](context) {
      loginApi.getAllGoods({
        action: 'yonghuJiaoyi',
        cid: 2,
        idCard: 2017092001,
      }).then(res => {
        context.commit('incrementMs', res);
      });
    }
  },
  mutations: {
    incrementMs(state, json) {
      if(json.result === 'OK') {
        state.text = '今天我生病了！';
        state.arr = json['jiaoyi'];
      }
    }
  },
  getters: {
    doneText: state => {
      return {
        text: state.text,
        arr: state.arr,
      }
    }
  },
}
