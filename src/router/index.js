/**
 * 路由
 */

import Vue from 'vue';
import Router from 'vue-router';
const Login = () => import('../page/Login/Login.vue');
const List = () => import('../page/List/List.vue');
const my = () => import('../page/my/my.vue');
const firstlogin = () => import('../page/firstlogin/firstlogin.vue');
const walk = () => import('../page/walk/walk.vue');
const hotComponent = () => import('../components/walk/hot.vue');
const newComponent = () => import('../components/walk/new.vue');
const zeroComponent = () => import('../components/walk/zero.vue');
const topics = () => import('../page/topics/topics.vue');
const moreAnswer = () => import('../page/moreAnswer/moreAnswer.vue');
const searchPage = () => import('../page/searchPage/searchPage.vue');
const minenews = () => import('../page/minenews/minenews.vue');
const sysnews = () => import('../page/sysnews/sysnews.vue');
const writeAnswer = () => import('../page/writeAnswer/writeAnswer.vue');
const notfount = () => import('../page/404/404.vue');
Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    name: 'firstlogin',
    component: firstlogin
  },{
    path: '/list',
    name: 'List',
    component: List
  }, {
    path: '/my',
    name: 'my',
    component: my
  }, {
    path: '/walk',
    name: 'walk',
    component: walk,
    children: [
      {path: '/',component: newComponent},
      {path: 'hot',component: hotComponent},
      // {path: '/',component: hotComponent},
      // {path: 'new',component: newComponent},
      {path: 'zero',component: zeroComponent},
    ],
  },{
    path: '/topics',
    name: 'topics',
    component: topics
  },{
    path: '/moreAnswer',
    name: 'moreAnswer',
    component: moreAnswer
  },{
    path: '/search',
    name: 'searchPage',
    component: searchPage
  },
    {
    path: '/minenews',
    name: 'minenews',
    component: minenews
  },
    {
    path: '/sysnews',
    name: 'sysnews',
    component: sysnews
  },
    {
      path: '/writeAnswer',
      name: 'writeAnswer',
      component: writeAnswer
    },
    {
      path: "*",
      name: 'notfount',
      component: notfount
    }]
})
