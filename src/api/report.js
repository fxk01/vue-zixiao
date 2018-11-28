import http from './public';
//举报
export const complain_qa = (params) => {
  return http.fetchPost('/cpln/complain', params)
};


