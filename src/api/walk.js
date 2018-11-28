import http from './public';
//获取热门问题
export const hotqsn = (params) => {
  return http.fetchGet('/hot/redis', params)
};

//获取最新问题
export const newqstn = (params) => {
  return http.fetchGet('/top/newqstn', params)
};

// 关注
export const questFollow = (params) => {
  return http.fetchGet('/qa/question/follow', params)
};

// 取消关注
export const cancelQuestFollow = (params) => {
  return http.fetchGet('/qa/question/cancel/follow', params)
};
