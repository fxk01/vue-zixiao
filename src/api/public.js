import axIos from 'axios';
axIos.defaults.timeout = 10000;
axIos.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
// axIos.defaults.baseURL = 'https://hegui.hefupb.com/';
// axIos.defaults.baseURL = 'http://192.168.10.182:8081/';
axIos.defaults.baseURL = 'https://hegui.hefupb.com/';

function getCookie(c_name) {
  if (document.cookie.length>0)
  {
    var  c_start=document.cookie.indexOf(c_name + "=");
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1;
      var c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
};

let tokenme='eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1MjM2QSIsInN1YiI6IntcIm9wZW5pZFwiOlwibzFHbTMxWV8xUUNqdjV2QWNVVHhxRERYanlzVVwiLFwiaWRcIjpcIjIxNlwifSIsImlhdCI6MTU0Mjc3ODA1OSwiZXhwIjoxNTc0MzE0MDU5fQ.9Cv0KQXm7Hz56_o8g_e4F4WoZ6oR3Z7jPl5MKAxMJ6A'
let tokenhuaming = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1MjM2QSIsInN1YiI6IntcIm9wZW5pZFwiOlwibzFHbTMxVkhjRFE2M0diNWVTSVVaWWVIc181c1wiLFwiaWRcIjpcIjIwM1wifSIsImlhdCI6MTUzOTg0NTI3OCwiZXhwIjoxNTcxMzgxMjc4fQ.47HiRzynuWlSe7vgOsRnYFZaJ8V7AXGVO1bNTe1TYTA'
let tokenkaiming='eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1MjM2QSIsInN1YiI6IntcIm9wZW5pZFwiOlwibzFHbTMxVHA5VWNRS3E4a2RFTFB4MDhJUXh2MFwiLFwiaWRcIjpcIjQ2XCJ9IiwiaWF0IjoxNTM5MjQyMjgxLCJleHAiOjE1NzA3NzgyODF9.2YYEE-KlcvoLpaF8Ib8dhb1DC61usg-AyzRTIjvluJA';
axIos.defaults.headers.token =  getCookie('token')?getCookie('token'):'';

export default {
  fetchGet(url, params = {}) {
    return new Promise((resolve, reject) => {
      axIos.get(url, {params}).then(res => {
        if(res.data.code === 1003) {
          window.location.href="/";
         console.log('用户未登录')
        } else {
          resolve(res.data);
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchQuickSearch(url) {
    return new Promise((resolve, reject) => {
      axIos.get(url).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost(url, params = {}) {
    return new Promise((resolve, reject) => {
      axIos.post(url, params, {
        timeout: 0,
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        responseType: 'json',
        transformRequest: [function(data) {
          let ret = '';
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then(res => {
        if(res.data.code === 1003) {
          window.location.href="/";
          console.log('用户未登录')
        } else {
          resolve(res.data);
        }
      }).catch(error => {
        reject(error);
      })
    })
  }
}
