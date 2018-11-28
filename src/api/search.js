import http from './public';
//获取搜索列表数据
export const searchEchoList = (params) => {
  return http.fetchGet('/search/echo', params)
};
