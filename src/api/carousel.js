import http from './public';
// banner列表
export const getCarous = (params) => {
  return http.fetchGet('/banner/echo/list', params)
};
