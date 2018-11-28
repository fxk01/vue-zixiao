<template>
  <div class="broadcast cursor_hand">
    <el-carousel
    :interval=5000
    trigger="click"
    height="220px"
    >
    <el-carousel-item v-for="item in carouselList" :key="item.id">
      <img :src="item.top_image" alt="banner" @click="gotopicsPage(item.refId)">
    </el-carousel-item>
    </el-carousel>
    </div>
</template>

<script>
  import * as carousel from '../api/carousel';
  export default {
    props: ['isfather'],
    data() {
      return {
        url:'http://zxtest.hefupb.com/',
        carouselList:[]
      }
    },
    created(){
      this.getCarouselList();
    },
    mounted() {
      this.loading = this.$loading({
        // lock: true,
        text: 'Loading',
        target:document.querySelector('.broadcast')
        // spinner: 'el-icon-loading',
      });
    },

    methods: {
      gotopicsPage(refId) {
        if(refId){
          this.$router.push({path: '/topics',query:{refId:refId}});
          if(this.isfather){
            this.$emit('isChangetidFn',refId);
          }
        }else{
          alert('缺少必要字段');
        }
      },
      getCarouselList() {
        let that = this;
        carousel.getCarous({
          page: 1,
          pagesize: 10,
          status: 1
        }).then(res => {
          if(res.code=='1001'){
            // console.log('标签回显成功～');
            let carouselList = res.data;
            carouselList.forEach(function (item) {
              if(item['image']){
                item['top_image']= that.url+item['image'].match(/..\/(\S*)/)[1]
              }
            });
            that.carouselList = carouselList;
            that.loading.close();
          }else{
            // console.log(res.msg?res.msg:'请求异常~');
          }
        });
      }
    }
  }
</script>

<style lang="less">
  .broadcast {
    position: relative;
    width: 1160px;
    height: 210px;
    max-width: 1160px;
    margin: 0 auto;
    overflow: hidden;
  }

  .el-carousel-item img{
    width: 100%;
    height: 100%;
  }
</style>
