<template>
  <div class="login">
    <span class="text_login">asdsadas</span>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="一致性 Consistency" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>

    <!--<div>-->
      <!--{{name}}-->
      <!--<button @click="fun">点击改变msg</button>-->
      <!--<br>-->
      <!--msg: {{msg}}-->
    <!--</div>-->
    <img src="../../assets/img/logo.png">
    <div>
      <h1>{{doneTodosCount.text}}</h1>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <ul>
        <li v-for="item in doneTodosCount.arr" :key="item.id">
          {{item.name}}
        </li>
      </ul>
      <span @click="useName">点击我</span>
    </div>

    <div>
      <ul>
        <li v-for="(item, $index) in items" :key="item.id" @click="selectStyle(item, $index)"
            :class="{'active': item.active, 'unactive': !item.active, 'active0': $index === index}">
          {{item.select}}
          <span class="icon" v-show="item.active">当我是图标</span>
        </li>
      </ul>
    </div>

    <router-link to="/list">
      <button class="btn btn-default">点击跳转</button>
    </router-link>

    <router-link to="/topic">
      <button class="btn btn-default">点击跳转</button>
    </router-link>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Login',
    data() {
      return {
        activeNames: ['1'],
        index: 0,
        name: 'List',
        input: '123',
        arrTop: '',
        active: false,
        items: [
          {select:'第一行'},
          {select:'第二行'},
          {select:'第三行'},
        ]
      }
    },
    components: {

    },
    created() {
    },
    computed: {
      doneTodosCount() {
        return this.$store.getters.doneText
      },
      ...mapGetters(['msg'])
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      useName() {
        this.arrTop = '底部';
        this.$store.dispatch('CHANGE_TEXT');
      },
      selectStyle(item, index) {
        this.index = false;
        this.$nextTick(function() {
          this.items.forEach(function(item) {
            Vue.set(item, 'active', false);
          });
          Vue.set(item, 'active', true);
        });
      },
      ...mapActions(['fun'])
    }
  }
</script>

<style lang="less" src="./login.less"></style>
