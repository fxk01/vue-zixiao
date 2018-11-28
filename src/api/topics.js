import http from './public';

// 话题详情页
export const topicEchodetail = (params) => {
  return http.fetchGet('/topic/echo/detail/answer', params)
};

// 点赞
export const answerLike = (params) => {
  return http.fetchGet('/qa/answer/like', params)
};

// 取消点赞
export const cancelAnswerLike = (params) => {
  return http.fetchGet('/qa/answer/cancel/like', params)
};
