import http from './public';
// 话题详情页
export const writeAnswerEcho = (params) => {
  return http.fetchGet('/search/dosrch/echo/question/detail', params)
};
// 提交内容
export const postSubContent = (params) => {
  return http.fetchPost('/qa/answer/create', params)
};
