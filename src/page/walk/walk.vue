<template>
  <div id="walkWrap" class="body-warpper">
    <div id="gotop" class="roket cursor_hand">
      <svg class="Zi Zi--BackToTop" title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg>
    </div>
    <div style="height: 60px;background-color: #313131;">
      <div v-if="showmineTop">
        <top @childByValue="childByValue" :offsettop_mainR="mRoffTop"></top>
      </div>
    </div>
    <search @showAskBox="showAskBoxFn" @isChangeTab="isChangeTab" :iswalkTop="true" :sendData="isShowqsnBox"></search>
    <!--轮播图-->
    <carousel></carousel>
    <div class="main">
      <div class="fl main-left">
        <div style="position: relative;width:100%;height: 60px;z-index: 10;">
          <ul class="flex flex-align-center tab" style="position: absolute;">
            <li @click="tabActiveChange(tabList.id)" v-for="(tabList) in tabLists" :key="tabList.id" :class="tabList.id === isId?'active':''" class="flex flex-align-center tab-item">
              <i v-bind:style="{'margin-top':tabList.id === 2 ? '3px':''}" :class="tabList.icon_class"></i>
              <span><router-link :to="tabList.a_link">{{tabList.name}}</router-link></span>
            </li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
      <!--:style="{'left':isRfix == true ? mainRLeft:''}"-->
      <div class="fr main-right">
          <scan></scan>
          <div :class="isRfix?'is-fixed':''" :style="isRfix?styleObject:''" class="main-r-inner">
            <ranking></ranking>
          </div>
      </div>
    </div>
    <!--提问题-->
    <askwarp :isShowqsnBox="isShowqsnBox" @isCloseqsnBox="closeModal"></askwarp>
  </div>
</template>

<style lang="less" src="./walk.less"></style>

<script>
  // import {
  //   PERSONAL_INFORMATION
  // } from '../../store/modules/Topic/mutation-types';
  // import { mapGetters, mapState } from 'vuex';
  import * as my from '../../api/topic';
  import top from '../../components/top.vue';
  import search from '../../components/search.vue';
  import carousel from '../../components/carousel.vue';
  import scan from '../../components/zxscan.vue';
  import ranking from '../../components/ranking.vue';
  import askwarp from '../../components/askwarp.vue';

  export default {
    data() {
      return {
        isRfix:false,
        mRoffTop:0,
        styleObject:{
          left:0,
          top: 0,
        },
        showmineTop:false,
        isShowqsnBox:false,  //最后要改成false
        isId:2,
        tabLists:[{
          id:2,
          name:'最新问题',
          icon_class:'news_i',
          a_link:'/walk/'
        },{
          id:1,
          name:'热门问题',
          icon_class:'hot_i',
          a_link:'/walk/hot'
        },{
          id:3,
          name:'消灭零回复',
          icon_class:'no_i',
          a_link:'/walk/zero'
        }]
      }
    },

    components: {
      top,
      search,
      carousel,
      ranking,
      scan,
      askwarp
    },

    created() {
      this.getMyInformation();
      let path=this.$route.path;
      if(path.indexOf('hot')!=-1){
        this.isId=1;
      }else if(path.indexOf('zero')!=-1){
        this.isId=3;
      }else{
        this.isId=2;
      }
    },

    mounted(){
      let mRoffTop = this.$el.querySelector('.main-r-inner').offsetTop;
      this.mRoffTop = mRoffTop;
    },

    methods: {
      // 获取用户信息
      getMyInformation() {
        if(this.getCookie('uid') && this.getCookie('userId') && this.getCookie('userId') == this.getCookie('uid')){
          this.showmineTop = true;
        } else{
          my.personalInformation().then(res => {
            if(res.code=='1001'){
              let myData=res.data;
              this.setCookie('userId',myData.uid,365);
              this.setCookie('nickName',myData.nickName,365);
              this.setCookie('avatarUrl',myData.avatarUrl,365);
              this.setCookie('myNotification',myData.myNotification,365);
              this.setCookie('sysNotification',myData.sysNotification,365);
              this.showmineTop = true;
            }
          });
        }
      },
      // mainR FIX 开关
      childByValue(args) {
        // let style_left= this.$el.querySelector('.main-r-inner').offsetLeft;
        let style_left= this.$el.querySelector('.main-right').offsetLeft;
        if(args === true){
          let styleObject={
            left:style_left+'px',
            top: '0px',
          }
          this.styleObject=styleObject;
          this.isRfix= args;
        }else{
          this.isRfix= args;
        }
      },
      isChangeTab(args) {
        this.isId=2;
      },
      showAskBoxFn(args) {
        this.isShowqsnBox=args;
      },

      closeModal(args) {
        this.isShowqsnBox = args;
      },

      tabActiveChange(id) {
        this.isId=id
      }
    }
  }
</script>
