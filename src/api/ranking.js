import http from './public';
//获取排行榜信息
export const pointsUser = (params) => {
  return http.fetchGet('/top/points/user', params)
};


