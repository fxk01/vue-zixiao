import http from './public';
//获取排行榜信息
export const pointsUser = (params) => {
  return http.fetchPost('/top/points/user', params)
};


