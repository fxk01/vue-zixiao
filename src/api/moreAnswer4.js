import http from './public';
//获取问题
export const questDetail = (params) => {
  return http.fetchPost('/search/dosrch/echo/question/detail', params)
};

// 回答
export const answerList = (params) => {
  return http.fetchGet('/search/dosrch/echo/question/answer/list', params)
};

// 关注
export const questFollow = (params) => {
  return http.fetchGet('/qa/question/follow', params)
};

// 取消关注
export const cancelQuestFollow = (params) => {
  return http.fetchGet('/qa/question/cancel/follow', params)
};

// 获取所有评论
export const answerCommentGet = (params) => {
  return http.fetchGet('/answer/comment/get', params)
};

// 新增评论答案功能（添加评论）
export const answerComment = (params) => {
  return http.fetchGet('/answer/comment/do', params)
};
