<template>
  <div class="writeAnswer">
    <top></top>
    <search @showAskBox="showAskBoxFn" :sendData="isShowqsnBox"></search>
    <div class="answer-box">
      <h1 class="h1">{{gettersAnswerContent.gettersAnswer}}</h1>
      <div class="quill-wrap">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          :autofocus="true"
          v-on:change="localStorageContent"
        >
        </quill-editor>
        <div class="write-mt18">
          <el-checkbox  style="float: left;" v-model="checked">匿名回答（将隐藏您的个人信息）</el-checkbox>
          <div class="write-qk" @click="emptyContent">
            <img src="../../assets/img/ques-delete.png" style="vertical-align: middle;">
            <span style="vertical-align: middle;">清空</span>
          </div>
        </div>
        <div @click="submission" class="write-sub" v-bind:style="this.content.length <= 0 ? {backgroundColor: '#bdc0c1'} : ''">提交</div>
      </div>
    </div>

    <!--提问题-->
    <askwarp :isShowqsnBox="isShowqsnBox" @isCloseqsnBox="closeModal"></askwarp>
  </div>
</template>

<script>
  import * as common from '../../assets/js/common';
  import askwarp from '../../components/askwarp.vue';
  import top from '../../components/top.vue';
  import search from '../../components/search.vue';
  import {
    ANSWER_ECHO,
  } from '../../store/mutation-types';
  import {
    SUB_ANSWER_CREATE
  } from '../../store/modules/WriteAnswer/mutation-types';
  import { Message } from 'element-ui';
  import { mapGetters } from 'vuex';
  import { quillEditor, Quill } from 'vue-quill-editor';
  // import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module';
  import { container, ImageExtend, QuillWatch } from '../../assets/js/quillimagefiil';
  Quill.register('modules/ImageExtend', ImageExtend);

  export default {
    name: 'writeAnswer',
    data() {
      return {
        isShowqsnBox:false,  //最后要改成false
        checked: false,
        content: '',
        editorOption: {
          modules: {
            ImageExtend: {
              loading: true,
              name: 'file',
              action: 'http://zxtest.hefupb.com/upload/attach',
              headers: (xhr) => {
                xhr.setRequestHeader('token',this.getCookie('token'))
              },
              change: (xhr, formData) => {
                console.log(xhr, formData);
              },
              response: (res) => {
                return res.data
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function() {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        },
      }
    },
    components: {
      top,
      search,
      askwarp
    },
    created() {
      this.$store.dispatch(ANSWER_ECHO, this.$route.query.qid);
      if(localStorage.getItem('content') !== null) {
        this.content = localStorage.getItem('content');
      }
    },
    computed: {
      ...mapGetters([
        'gettersAnswerContent',
        'subAnswerGetters',
      ]),
    },
    watch: {
      subAnswerGetters(data, k) {
        this.openMsg(data.subAnswerMsg);
      }
    },

    methods: {
      showAskBoxFn(args) {
        this.isShowqsnBox=args;
      },

      closeModal(args) {
        this.isShowqsnBox = args;
      },
      openMsg(data) {
        Message.success({
          message: data,
          duration: 1000,
          onClose: () => {
            localStorage.removeItem("content");
            this.$router.push({
              path: '/moreAnswer',
              query: {
                qid: this.$router.history.current.query.qid,
                source: 'search'
              }
            });
          }
        });
      },
      submission() {
        let content = this.content;
        if(content.length > 0) {
          this.$store.dispatch(SUB_ANSWER_CREATE, {
            qid: this.$route.query.qid,
            content: content,
            ck: this.checked === true ? 1 : 0,
          });
          if(this.$store.state.writeAnswer.msg !== '') {
            this.openMsg(this.subAnswerGetters.subAnswerMsg);
          }
        }
      },
      emptyContent() {
        this.content = '';
      },
      localStorageContent() {
        let content = this.content;
        // content=common.trim(content);
        // console.log(content)
        // this.content = content;
        localStorage.setItem('content', content);
      }
    }
  }
</script>

<style lang="less" src="./writeAnswer.less"></style>
