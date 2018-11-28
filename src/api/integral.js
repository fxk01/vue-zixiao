import http from './public';
// 查询当前用户可用余额
export const getOwnerpointsMoney = (params) => {
  return http.fetchGet('/points/shop/money', params)
};
// 可兑换商品列表查询
export const getProductList = (params) => {
  return http.fetchGet('/points/shop/product/list', params)
};
// 兑换(购买)商品
export const buyProduct = (params) => {
  return http.fetchPost('/points/shop/buy/product', params)
};
// 查询当前用户已兑换商品信息
export const orderList = (params) => {
  return http.fetchGet('/points/shop/order/list', params)
};
