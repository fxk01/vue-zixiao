<template>
  <div class="main-search">
    <div class="container">
      <!--href="/#/walk"-->
      <div @click="gowalkPage()" class="logo cursor_hand">
        <img src="../assets/img/home-logo.png" alt="资晓" class="logo-img">
        <span class="search-zsk">大资管人的小知识库</span>
      </div>
      <div class="demo-input-size">
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="state3"
          :fetch-suggestions="querySearch"
          placeholder="提问前养成“搜一搜”的好习惯哟~"
          @select="handleSelect"
          @keyup.enter.native="handleIconClick"
          v-debounce="search"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="handleIconClick"
          >
          </i>
          <template slot-scope="{item}">
            <div class="name">{{item.value}}</div>
            <span class="addr">{{item.address}}</span>
          </template>
        </el-autocomplete>
      </div>
      <el-button @click="showAskBox()"
        type="primary"
        icon="el-icon-arrow-right"
        class="el-questions"
      >
        直接提问
      </el-button>
    </div>
  </div>
</template>

<script>
  import { SEARCH_LIST } from '../store/mutation-types';
  import { mapGetters } from 'vuex';
  import * as searchApi from '../api/search';
  let restaurants;
  let cbTs;

  export default {
    props: ['iswalkTop'],
    data() {
      return {
        inputText: '',
        restaurants: [],
        state3: '' || this.$route.query.text,
        gettersSearchData: [],
      }
    },
    mounted() {
//      this.restaurants = this.loadAll();
    },
    beforeUpdate() {
      this.gettersSearchData = [...this.$store.getters.gettersSearch.gettersSearch];
    },
    computed: {
      ...mapGetters([
        'gettersSearch',
      ]),
    },
    directives: {
      debounce: {
        inserted: function(el, binding) {
          let timer;
          el.addEventListener('keyup', () => {
            if (timer) {
              clearTimeout(timer)
            }
            timer = setTimeout(() => {
              binding.value()
            }, 300)
          })
        }
      }
    },
    methods: {
      showAskBox() {
        this.$emit('showAskBox',true);//select事件触发后，自动触发showAskBox事件
      },
      gowalkPage() {
        let iswalkTop = this.iswalkTop;
        this.$router.push({
          path: '/walk/',
        });
        if(iswalkTop){
          this.$emit('isChangeTab',iswalkTop);
        }
      },
      querySearch(queryString, cb) {
        restaurants = this.restaurants;
//        if(this.state3.length > 0) {
//          searchApi.searchEchoList({
//            input: this.state3,
//          }).then(res => {
//            restaurants = this.loadAll(res);
//            this.restaurants = restaurants;
//            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
//            cb(results);
//          }).catch((err) => {
//            restaurants = this.loadAll();
//            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
//            cb(results);
//          });
//        }
        cbTs = cb;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          if (restaurant.str) return false;
          return (restaurant.value.indexOf(queryString) >= 0);
        };
      },
      loadAll(data) {
        let serIer = [];
        if (data) {
          for (let i = 0, l = data.data.length; i < l; i++) {
            let a = data.data[i];
            let b = '';
            if (typeof a === 'object') {
              a = a.content;
              b = a.id;
            }
            serIer.push({
              value: a,
              address: b ,
            })
          }
        } else {
          serIer.push({
            str: '暂无数据',
          })
        }
        return serIer;
      },
      handleSelect(item) {
      },
      handleIconClick() {
        let routeData = this.$router.resolve({
          path: '/search',
          query: {
            text: this.state3
          }
        });
        window.open(routeData.href);
      },
      search() {
        if(this.state3 && this.state3.length > 0) {
          searchApi.searchEchoList({
            input: this.state3,
          }).then(res => {
            restaurants = this.loadAll(res);
            this.restaurants = restaurants;
            cbTs(restaurants);
          }).catch((err) => {
            this.loadAll();
          });
//          this.$store.dispatch(SEARCH_LIST, this.state3);
        }
      },
    },
  }
</script>

<style lang="less">
  .main-search {
    background-color: #ffffff;
    width: 100%;
    position: relative;
    z-index: 99;
    height: 70px;
    padding-top: 10px;
    .container {
      max-width: 1160px;
      margin: auto;
    }
    .logo {
      text-decoration: none;
      display: inline-block;
    }
    .logo-img {
      vertical-align: middle;
    }
    .search-zsk {
      display: inline-block;
      margin-left: 10px;
      width: 75px;
      vertical-align: middle;
      color: #2d41a1;
      font-size: 14px;
      font-weight: bold;
    }
    .demo-input-size {
      display: inline-flex;
      margin-left: 35px;
      width: 71%;
    }
    .el-questions {
      margin-left: 20px;
      background-color: #2e41a1;
      border-color: #2e41a1;
    }
    .el-input__suffix {
      cursor: pointer;
    }

    .my-autocomplete {
      li {
        line-height: normal;
        padding: 7px;
        .name {
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .addr {
          font-size: 12px;
          color: #b4b4b4;
        }
        .highlighted .addr {
          color: #ddd;
        }
      }
    }
    .el-input--suffix .el-input__inner {
      width: 825px;
    }
  }
  .el-autocomplete-suggestion li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-autocomplete-suggestion li .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
