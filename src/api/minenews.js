import http from './public';

// 我的消息
export const mineMessage = (params) => {
  return http.fetchGet('/me/message', params)
};

export const mineOpenMessage = (params) => {
  return http.fetchGet('/me/open/message', params)
};

