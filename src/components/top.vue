<template>
  <div style="height: 60px;" class="main-header-box">
    <!--:class="isHaveUp?'is-fix':''"-->
    <header v-bind:style="{'position':isHaveUp == true ? 'fixed':''}" class="main-header main-header unauthorized visible">
      <div class="container">
        <nav role="navigation" class="main-nav">
          <ul class="nav-list">
            <li class="nav-item submit" @click="hrefPushMynews">
              <!--<el-badge :is-dot="myNotification" class="item">-->
                <img v-if="myNotification" src="../assets/imgs/home-mynews-active.png" class="icon">
                <img v-else src="../assets/imgs/home-mynews.png" class="icon">
              <!--</el-badge>-->
              <span class="main-my">我的消息</span>
            </li>
            <li class="nav-item submit" @click="hrefPushSysnews">
              <!--&lt;!&ndash;home-news.png&ndash;&gt;  有红点-->
              <!--<el-badge :is-dot="sysNotification" class="item">-->
                <img v-if="sysNotification" src="../assets/imgs/home-sysnews-active.png" class="icon">
                <img v-else src="../assets/imgs/home-sysnews.png" class="icon">
              <!--</el-badge>-->
              <span class="main-my">系统消息</span>
            </li>
            <!--<el-popover-->
              <!--placement="bottom"-->
              <!--title="标题"-->
              <!--width="200"-->
              <!--trigger="click"-->
              <!--content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">-->
              <!--<el-button slot="reference">click 激活</el-button>-->
            <!--</el-popover>-->
            <li class="nav-item auth" @click="hrefPushMy">
              <img v-if="avatarUrl" :src="avatarUrl" class="icon avatarUrlimg">
              <img v-else src="../assets/imgs/home-my.png" class="icon">
              <span class="main-sys-message">{{nickName}}</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
  import * as common from '../assets/js/common';
  export default {
    props: ['offsettop_mainR', 'information'],
    data() {
      return {
        activeNames: ['1'],
        myNotification:false,
        sysNotification:false,
        avatarUrl:'',
        isHaveUp: false,
        nickName: '',
        // initavatarUrl:require('../assets/imgs/home-my.png')
      }
    },
    created(){
      this.getcookieMyData();
      this.mouseScroll();
      window.onresize = () =>{
        clearTimeout(this.resizetimer);
        this.resize = setTimeout( () =>{
          if(this.offsettop_mainR){
            return this.changeFix();
          }
        },100) //延迟时间

      };
    },

    mounted () {
      let goTop = document.getElementById('gotop');
      let timer = null;
      let target = 0; //目标位置
      let leader = 0; //显示区域自身的位置
      common.addEvent(window,'scroll', () => {
        if(this.offsettop_mainR){
          this.changeFix();     // 改变右侧定位；
        }

        if(goTop){
          if(this.getScrollTop()>700){
            goTop.style.display = "block";
          }else{
            goTop.style.display = "none";
          }
          leader = this.getScrollTop();
        }
      });

     if(goTop){
       goTop.onclick = function () {
         //技术点：window.scrollTo(0,0);
         //要用定时器，先清定时器
         clearInterval(timer);
         timer = setInterval(function () {
           //获取步长
           let step = (target-leader)/10;
           //二次处理步长
           step = step>0?Math.ceil(step):Math.floor(step);
           leader = leader +step;
           //显示区域移动
           window.scrollTo(0,leader);
           //清除定时器
           if(leader === 0){
             clearInterval(timer);
           }
         },20);
       }
     }
    },

    computed: {

    },
    watch: {
      information(old) {
        if(old){
          let new_nickName = old.information.nickName;
          let new_avatarUrl = old.information.avatarUrl;
          if(this.getCookie('nickName')){
            this.delCookie('nickName');
            this.setCookie('nickName',new_nickName,365);
            this.nickName = new_nickName;
          }
          if(this.getCookie('avatarUrl')){
            this.delCookie('avatarUrl');
            this.setCookie('avatarUrl',new_avatarUrl,365);
            this.avatarUrl = new_avatarUrl?new_avatarUrl:'';
          }
        }
      }

    },
    methods: {
      getcookieMyData() {
        let that = this;
        let nickName=that.getCookie('nickName');
        let avatarUrl=that.getCookie('avatarUrl');
        let myNotification=that.getCookie('myNotification');
        let sysNotification=that.getCookie('sysNotification');

        this.myNotification = myNotification?true:false;
        this.sysNotification = sysNotification?true:false;
        this.nickName = nickName?nickName:'我的';
        this.avatarUrl = avatarUrl?avatarUrl:'';
      },
      hrefPushMy() {
        this.$router.push({
          name: 'my',
        })
      },
      // 我的消息
      hrefPushMynews() {
        this.delCookie('myNotification');
        this.$router.push({
          name: 'minenews',
        })
      },
      // 系统消息
      hrefPushSysnews() {
        this.delCookie('sysNotification');
        this.$router.push({
          name: 'sysnews',
        })
      },

      getScrollTop() {
        let scrollPos;
        if (window.pageYOffset) {
          scrollPos = window.pageYOffset; }
        else if (document.compatMode && document.compatMode != 'BackCompat')
        { scrollPos = document.documentElement.scrollTop; }
        else if (document.body) { scrollPos = document.body.scrollTop; }
        return scrollPos;
      },

      changeFix() {
        let that=this;
        let scroll_top = that.getScrollTop();  //滚动条已滑过的高度
        let offsettop_mainR = that.offsettop_mainR;    //来自 main-right 的 offsetTop
        if(scroll_top && scroll_top > offsettop_mainR){
          that.$emit('childByValue',true)
        }else{
          that.$emit('childByValue',false)
        }
      },
  // 滚轮
      mouseScroll() {
        var agent = navigator.userAgent;
        var that= this;
        if (/.*Firefox.*/.test(agent)) {
          document.addEventListener("DOMMouseScroll", function(e) {
            e = e || window.event;
            var detail = e.detail;
            if (detail > 0) {
              // console.log("鼠标向下滚动");
              setTimeout( () =>{
                that.isHaveUp = false;
              },20);
              // that.changeFix();
            } else {
              // console.warn("鼠标向上滚动");
              setTimeout( () =>{
                that.isHaveUp = true;
              },20);
              // that.changeFix();
            }
          });
        } else {
          document.onmousewheel = function(e) {
            e = e || window.event;
            var wheelDelta = e.wheelDelta;
            if (wheelDelta > 0) {
              // console.log("鼠标向上滚动2");
              setTimeout( () =>{
                that.isHaveUp = true;
              },20);
              // that.changeFix();
            } else {
              // console.warn("鼠标向下滚动2");
              setTimeout( () =>{
                that.isHaveUp = false;
              },20);
              // that.changeFix();
            }
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .main-header-box {
    position: relative;
    z-index: 100;
    height: 60px;
    background-color: #313131;
    .main-header.visible {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    .main-header {
      border-bottom: 1px solid #f1f1f1;
      color: #909090;
      height: 60px;
      z-index: 250;
      background-color: #313131;
    }
    .main-header {
      /*position: fixed;*/
      top: 0;
      left: 0;
      right: 0;
      transition: all .2s;
      -webkit-transform: translate3d(0,-100%,0);
      transform: translate3d(0,-100%,0);
    }

    .is-fix{
      position: fixed;
    }
    .main-header .container {
      max-width: 1160px;
      margin: auto;
    }
    .container {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 100%;
      position: relative;
      width: 100%;
    }
    .nav-item.submit {
      color: #ffffff;
      position: relative;
    }
    .nav-item {
      color: #ffffff;
      padding: 0 30px 0 0;
      font-size: 16px;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      cursor: pointer;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 100%;
      margin: 0;
    }
    .nav-item.submit:after {
      content: "|";
      top: 20px;
      left: 100%;
      color: hsla(0, 0%, 100%, 1);
      margin-left: 16px;
    }
    .container:after {
      display: table;
      content: "";
      clear: both;
    }
    .main-nav {
      height: 100%;
      -webkit-box-flex: 1;
      -ms-flex: 1 0 auto;
      flex: 1 0 auto;
      text-align: right;
    }
    .nav-list {
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      position: relative;
    }
    .nav-item, .nav-list {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 100%;
      margin: 0;
    }
    .nav-item:last-child {
      padding-right: 0;
    }
    .main-my {
      padding: 0 15px;
    }
    .main-sys-message {
      padding-left: 15px;
    }
    .avatarUrlimg{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
</style>
