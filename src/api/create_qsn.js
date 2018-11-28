import http from './public';
//提交问题
export const qsnCreate = (params) => {
  return http.fetchPost('/qa/question/create', params)
};

// 您的问题可能已有答案（tip:1 问题； 2：回答 4：话题 8知识树 ）
export const searchEcho = (params) => {
  return http.fetchGet('/search/echo', params)
};

// 标签入库
export const qsnInsertTag = (params) => {
  return http.fetchPost('/qa/label/insert', params)
};

// 根据问题查询所属标签
export const  queryQsnLabel= (params) => {
  return http.fetchGet('/qa/questionLabel/query', params)
};

