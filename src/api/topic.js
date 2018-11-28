import http from './public';
//获取个人信息
export const personalInformation = (params) => {
  return http.fetchPost('/me', params)
};
//获取我的问题
export const myQuestion = (params) => {
  return http.fetchGet('/me/question/list', params)
};
//获取我的关注
export const myFollow = (params) => {
  return http.fetchGet('/me/followq/list', params)
};
//获取我的回答
export const myAnswer = (params) => {
  return http.fetchGet('/me/answer/list', params)
};
//点赞
export const answerLike = (params) => {
  return http.fetchGet('/qa/answer/like', params)
};
//取消点赞
export const cancelAnswerLike = (params) => {
  return http.fetchGet('/qa/answer/cancel/like', params)
};
//修改名称
export const modifyName = (params) => {
  return http.fetchGet('/setting/update/usrinfo', params)
};
//点亮成就isshow
export const hasAchieved = (params) => {
  return http.fetchGet('/achieve', params)
};


