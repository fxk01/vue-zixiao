/**
 * main主入口
 */

import Vue from 'vue';
import 'es6-promise/auto';
import App from './App.vue';
import router from './router';
import store from './store/index';
import '@babel/polyfill';
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';
import './assets/css/quillCore.css';
import './assets/css/quillSnow.css';
import './assets/css/quillBubble.css';
import VueQuillEditor from 'vue-quill-editor';
import infiniteScroll from 'vue-infinite-scroll';

import {
  Pagination,
  Button,
  Select,
  Collapse,
  CollapseItem,
  Input,
  Upload,
  Row,
  Carousel,
  CarouselItem,
  Tabs,
  TabPane,
  Option,
  Loading,
  Table,
  Tag,
  TableColumn,
  Progress,
  Popover,
  Autocomplete,
  Dialog,
  Checkbox,
  Form,
  FormItem,
} from 'element-ui';


Vue.config.productionTip = false;
Vue.use(VueQuillEditor);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(Input.name, Input);
Vue.component(Upload.name, Upload);
Vue.component(Row.name, Row);
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Option.name, Option);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Progress.name, Progress);
Vue.component(Loading.directive);
Vue.component(Popover.name, Popover);
Vue.component(Autocomplete.name, Autocomplete);
Vue.component(Dialog.name, Dialog);
Vue.component(Tag.name, Tag);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);

Vue.prototype.$loading = Loading.service;
Vue.use(infiniteScroll);
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

//设置cookie,放在main.js

Vue.prototype.setCookie = function(c_name,value,expiredays) {
  // alert(c_name,value,'1');
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};


//获取cookie

Vue.prototype.getCookie=function(c_name) {
  if (document.cookie.length>0)
  {
    var  c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1
      var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
};

Vue.prototype.delCookie =function(c_name) {
  document.cookie = c_name + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
};
