import http from './public';
//获取问题
export const questDetail = (params) => {
  return http.fetchGet('/search/dosrch/echo/question/detail', params)
};

// 回答
export const answerList = (params) => {
  return http.fetchPost('/search/dosrch/echo/question/answer/list', params)
};

// 补充的回答
export const supplementAnswer = (params) => {
  return http.fetchPost('/qa/answer/supplement', params)
};
// 关注
export const questFollow = (params) => {
  return http.fetchGet('/qa/question/follow', params)
};

// 取消关注
export const cancelQuestFollow = (params) => {
  return http.fetchGet('/qa/question/cancel/follow', params)
};

//点赞
export const answerLike = (params) => {
  return http.fetchGet('/qa/answer/like', params)
};
//取消点赞
export const cancelAnswerLike = (params) => {
  return http.fetchGet('/qa/answer/cancel/like', params)
};

// 删除回答
export const deleteAnswer = (params) => {
  return http.fetchGet('/me/answer/delete', params)
};

// 获取所有评论
export const answerCommentGet = (params) => {
  return http.fetchGet('/answer/comment/get', params)
};

// 新增评论答案功能（添加评论）
export const answerComment = (params) => {
  return http.fetchPost('/answer/comment/do', params)
};

//删除我的评论
export const deleteComment = (params) => {
  return http.fetchGet('/answer/comment/del', params)
};

// 点赞评论
export const acommentLike = (params) => {
  return http.fetchGet('/qa/acomment/like', params)
};

//取消点赞评论
export const acommentCancelLike = (params) => {
  return http.fetchGet('/qa/acomment/cancel/like', params)
};


// 回答  （--我的回答）
export const myAnswerdetail = (params) => {
  return http.fetchGet('/me/answer/list/detail', params)
};


// 回答  （--我的消息）
export const echoAnsorqstn = (params) => {
  return http.fetchGet('/echo/message/ansorqstn', params)
};




