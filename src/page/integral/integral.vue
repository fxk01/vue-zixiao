<template>
  <div id="integralWarp" class="body-warpper">
    <div id="gotop" class="roket cursor_hand">
      <svg class="Zi Zi--BackToTop" title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg>
    </div>
    <top></top>
    <search @showAskBox="showAskBoxFn" :sendData="isShowqsnBox"></search>
    <carousel></carousel>
    <div class="main-container">
      <div class="main">
        <div class="flex flex-align-center flex-justify-end main-top">
          <div v-if="avatarUrl" class="owner-img-thumb">
            <img class="owner-img" :src="avatarUrl" alt="">
          </div>
          <div class="owner-nickname">{{nickName}}</div>
          <div class="owner-point">当前积分 <span>{{pointmoney}}</span> 分</div>
        </div>
        <div v-if="!noData">
          <ul class="main-content">
            <li v-for="(productItem) in productList" :key="productItem.id" class="box item">
              <img :src="productItem.imgUrl" class="thumb-img" />
              <p class="item-title">{{productItem.description}}</p>
              <div class="flex flex-justify-between flex-align-center">
                <div class="item-point"><span>{{productItem.price}}</span> 积分</div>
                <button class="exchangeBtn" @click="showPointDialogFn()">兑换</button>
              </div>
            </li>
          </ul>
          <p class="moreExpect">更多干货敬请期待 ~</p>
        </div>
        <div v-else class="noAnsWrapper main-border">{{noData}}</div>
      </div>
    </div>

    <!--填写信息-->
    <el-dialog
      :center="true"
      :visible.sync="showPointDialog"
      width="32%"
      :close-on-click-modal="false"
      :before-close="handlePointClose"
    >
      <div slot="title" class="dialog-title">
        <h4 class="title-h4">填写信息</h4>
        <p class="title-p">我们会在1-2个工作日联系您兑换</p>
      </div>
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="integral_form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="integral_form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="integral_form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input
            v-model="integral_form.address"
            type="textarea"
            :autosize="{ minRows: 2}"
            autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!--:class="com_achieveId === '-1'?'is-disabled':''" :disabled="com_achieveId === '-1'"-->
        <el-button style="width: 100px;height: 30px;padding: 0;background-color: #2e41a1;border-color: #2e41a1;" type="primary" @click="submitPointInfo()">提 交</el-button>
      </span>
    </el-dialog>
    <!--提问题-->
    <askwarp :isShowqsnBox="isShowqsnBox" @isCloseqsnBox="closeModal"></askwarp>
  </div>
</template>
<style lang="less" src="./integral.less"></style>
<script>
  import top from '../../components/top.vue';
  import search from '../../components/search.vue';
  import carousel from '../../components/carousel.vue';
  import askwarp from '../../components/askwarp.vue';
  import * as integral from '../../api/integral';
  // import * as common from '../../assets/js/common';
  import { Message } from 'element-ui';

  export default {
    name: 'integral',
    data() {
      return {
        integral_form:{
          name:'',
          phone:'',
          email:'',
          address:''
        },
        url:'http://zxtest.hefupb.com/',
        pointmoney:0,  //初始化积分余额；
        showPointDialog:false,
        noData:'',
        isShowqsnBox:false,  //最后要改成false
        productList: [],
        page: 1,
        pagesize: 10,
        type: 1 ,     //我的消息
        totalNum: 0,
        Len: 0,
      }
    },
    components: {
      top,
      search,
      carousel,
      askwarp
    },
    created() {
      let nickName=this.getCookie('nickName');
      let avatarUrl=this.getCookie('avatarUrl');
      this.nickName = nickName?nickName:'我的';
      this.avatarUrl = avatarUrl?avatarUrl:'';
      this.getOwnerpointsMoneyFn();    //当前积分
      this.getProductListFn();
      // this.pullRefresh();
    },
    // destroyed() {
    //   common.remove(window, 'scroll',
    //     this.scrollChange
    //   );
    // },



    methods: {
      // 当前积分可用余额
      getOwnerpointsMoneyFn() {
        let self = this;
        integral.getOwnerpointsMoney({}).then(res => {
          if(res.data && res.code=='1001'){
            console.log(res);
            const pointmoney = res.data.money;
            if(pointmoney){
              this.pointmoney=pointmoney;
            }
          }else {

          }
        });
      },
      getProductListFn() {
        let that = this;
        integral.getProductList({
          page: this.page,
          pagesize: this.pagesize,
        }).then(res => {
          if(res.data && res.code=='1001'){
            let productList=res.data;
            // console.log(messageData);
            let totalNum=res.ntotals;
            let size = this.Len + productList.length;
            productList.forEach(function (item) {
              if (item['imgUrl']) {
                item['imgUrl'] = that.url+item['imgUrl'].match(/..\/(\S*)/)[1];
              }
            });
            this.productList=this.productList.concat(productList);
            this.totalNum=totalNum;
            this.Len=size;
          }else {
            this.noData = res.msg?res.msg:'暂无数据';
          }
        });
      },

      showAskBoxFn(args) {
      console.log(args);
        this.isShowqsnBox=args;
        console.log(this.isShowqsnBox);
      },

      closeModal(args) {
        this.isShowqsnBox = args;
      },

      showPointDialogFn() {
        this.showPointDialog=true;
      },

      handlePointClose() {
        this.showPointDialog=false;
      },

      // 提交表单，兑换商品
      submitPointInfo() {
        let self = this;
        let products = [{'id':'2','buyNum':'1','price':'20'}];
        let name = '商品';
        let phone = '18261779540';
        let address = '上海市松江区哈哈哈';
        let totalMoney = '20';
        integral.buyProduct({
          products:JSON.stringify(products),
          name:name,
          phone:phone,
          address:address,
          totalMoney:totalMoney
        }).then(res => {
          if(res.data && res.code=='1001'){
            console.log(res);
          }else {

          }
        });
      },

//       // 去一问多答页面
// //      goMoreAnswerPage(qid) {
// //        this.$router.push({name: 'moreAnswer',query:{ qid: qid, source: 'search'}});
// //      },
//
//
//       //文档的总高度
//       getScrollTop: function () {
//         var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
//         if (document.body) {
//           bodyScrollTop = document.body.scrollTop;
//         }
//         if (document.documentElement) {
//           documentScrollTop = document.documentElement.scrollTop;
//         }
//         scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
//         return scrollTop;
//       },
//       //浏览器视口的高度
//       getScrollHeight: function () {
//         var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
//         if (document.body) {
//           bodyScrollHeight = document.body.scrollHeight;
//         }
//         if (document.documentElement) {
//           documentScrollHeight = document.documentElement.scrollHeight;
//         }
//         scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
//         return scrollHeight;
//       },
//       //浏览器视口的高度
//       getWindowHeight: function () {
//         var windowHeight = 0;
//         if (document.compatMode == "CSS1Compat") {
//           windowHeight = document.documentElement.clientHeight;
//         } else {
//           windowHeight = document.body.clientHeight;
//         }
//         return windowHeight;
//       },
//       // 下拉加载ajax
//       pullRefresh: function () {
//         // var _this = this;
//         // window.onscroll = function () {
//         //   _this.scrollChange()
//         // }
//         common.addEvent(window,'scroll', this.scrollChange);
//         // window.addEventListener('scroll',this.scrollChange);
//       },
//
//       scrollChange: function () {
// //          alert('1')
//         var _this = this,
//           currentPage = {page: this.page};
//         this.scollY = Math.ceil( this.getScrollTop() + this.getWindowHeight()) - this.getScrollHeight();
//         // console.log(this.scollY);
//         // 把下拉刷新置为false，防止多次请求
//         if (this.scollY >= 0) {
//           if (this.Len >= this.totalNum) {
//             console.log('没有更多数据了。。。')
//             return false;
//           }
//
//           console.log('0')
//
//           this.page++;
//           // alert(this.page)
//           this.getmessageDataFn() ;
//
//         } else {
//           // 其他时候把下拉刷新置为true
// //            _this.pullRefreshss = true;
//         }
//       }
//
    }
  }
</script>
