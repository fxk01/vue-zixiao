import http from './public';
//获取搜索信息
export const postSearchMsg = (params) => {
  return http.fetchGet('/search/dosrch/question/list', params)
};
// 关注
export const questFollow = (params) => {
  return http.fetchGet('/qa/question/follow', params)
};
// 取消关注
export const cancelQuestFollow = (params) => {
  return http.fetchGet('/qa/question/cancel/follow', params)
};
