import http from './public';
// banner列表
export const getCarous = (params) => {
  return http.fetchPost('/banner/echo/list', params)
};
