<template>
  <div class="askWrapper">
    <el-dialog top="20vh" title="提问" :close-on-click-modal="false" :visible.sync="isShowqsnBox" :before-close="handleClose" width="46%">
      <div class="main-border">
        <el-input class="ask-textarea"
                  ref="asktextarea"
                  type="textarea"
                  id="asktextarea"
                  v-on:input="askContentChange()"
                  :autosize="{ minRows: 2}"
                  :maxlength="1000"
                  v-model="askContText"
                  placeholder="提问以匿名形式发布"
                  cols="30" rows="10">
        </el-input>
        <!--针对输入的回显-->
        <div v-show="moredata && questKey.length>0" class="moreBox main-border">
          <h3 class="flex flex-align-center flex-justify-between"><span>您的问题可能已经有答案</span><span @click="closeMoreWapper()" class="icon-more-close cursor_hand"></span></h3>
          <ul class="more-ul">
            <li v-for="(keyItem) in questKey" :key="keyItem.id" @click="goSearchPage(keyItem.content)" class="flex flex-justify-between more-item cursor_hand">
              <p class="limt-1 flex-1 item-content">{{keyItem.content}}</p>
              <!--<p class="item-ansnum">{{keyItem.rate}}个回答</p>-->
            </li>
            <!--<li class="flex flex-justify-between more-item">-->
              <!--<p class="limt-1 flex-1 item-content">我是问题我是问题我是问题我是问题我是问题我是问题我是问题我是问题我是问题我是问题我是问题我是问题</p>-->
              <!--<p class="item-ansnum">1个回答</p>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="">

        </div>
      </div>


      <!--底部-->
      <div class="more-bom">
        <div class="flex flex-justify-between flex-align-center more-bom-plus">
          <div class="flex">
            <!--input-->
            <div v-show="!isShowAddtag" class="ask-inp-tag">
              <el-input ref="addinput"
                        v-on:blur="inpBlurFn()"
                        autofocus="true"
                        placeholder=""
                        v-model="inputQsnTag"
                        clearable>
              </el-input>
            </div>

            <h4 v-show="isShowAddtag" @click="changeInptag()" class="title main-border cursor_hand">
              <i></i><span>添加问题标签</span>
            </h4>
          </div>

          <div @click="clearqsnFn()" class="flex flex-align-center cursor_hand clearBox">
            <img src="../assets/imgs/ask-more-delete.png" alt="">
            清空
          </div>
        </div>
        <ul v-show="tagList.length > 0" class="tagbox">
          <li v-for="(tagItem) in tagList" :key="tagItem.id" class="item-tag">
            {{tagItem.content}}
            <i @click="tagClose(tagItem.content)" style="position: relative;left: 4px;" class="el-tag__close el-icon-close cursor_hand"></i>
          </li>
          <!--<li class="item-tag">私募股权</li>-->
        </ul>
        <!--<el-tag id="item-tag"-->
          <!--:key="tag"-->
          <!--v-for="tag in dynamicTags"-->
          <!--closable-->
          <!--:disable-transitions="false"-->
          <!--@close="tagClose(tag)">-->
          <!--{{tag}}-->
        <!--</el-tag>-->
      </div>

      <span slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
          <el-button :disabled="askContText.length < 1 || isdisabled" class="qsnSubmitBtn" type="primary" @click="createQuestion()">发布问题</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>

  import * as createQsn from '../api/create_qsn';
  import * as common from '../assets/js/common';
  import { Message } from 'element-ui';

  export default {
    props: ['isShowqsnBox'],
    data() {
      return {
        isdisabled: false,
        questKey:[],
        isShowAddtag: true,
        qlabelIds: [],                 //标签组 id
        tagList: [],
        inputQsnTag:'',    //问题标签
        askContText:'',   //问题的内容
        anonymity:1 ,   //匿名
        moredata:true
      }
    },

    created: function(){
      let comment_val=localStorage.getItem('ask_val');
      if(comment_val){
        this.askContText = comment_val;
      }
    },

    methods: {
      closeAskBox(that) {
        that.$emit('isCloseqsnBox',false)
      },

      handleClose() {
        this.$emit('isCloseqsnBox',false);
      },

      tagClose(tag) {
        this.tagList.splice(this.tagList.indexOf(tag), 1);
        this.qlabelIds.splice(this.tagList.indexOf(tag), 1);
      },

      // 去搜索页面
      goSearchPage(text) {
        this.$router.push({name: 'searchPage',query:{ text: text}});
      },

      // 提问内容改变,则 1.可能有答案回显改变 2.问题标签相应改变
      askContentChange() {
        let that=this;
        let askContText=that.askContText;
        askContText=common.trim(askContText);
        that.askContText = askContText;
        console.log(askContText,askContText.length)
        if(askContText && askContText.length>1){
          clearTimeout(this.timer);
          this.timer = setTimeout(function(){
            that.searchEcho(askContText);
            that.queryQsnLabel(askContText);
            localStorage.setItem('ask_val', askContText);
          },300) //延迟时间
        }else{
          this.qlabelIds = [];
          that.moredata = false;
          this.tagList = [];
          return false;
        }
      },

      // 添加问题标签失去焦点，并 向后台提供标签-查重，标签入库
      inpBlurFn() {
        let inputQsnTag=this.inputQsnTag;
        this.isShowAddtag=!this.isShowAddtag;
        if(inputQsnTag){
          createQsn.qsnInsertTag({
            name: inputQsnTag,
          }).then(res => {
            if(res.code=='1000'){
              let insertId=res.labelId;    //返回新插入便桥的id;
              let insertTag={
                content:inputQsnTag,
                id:insertId
              };
              this.tagList.push(insertTag);
              this.qlabelIds.push(insertId);
              this.inputQsnTag='';
            }else{
              // console.log(res.msg?res.msg:'请求异常~');
            }
          });

        }else {
          return false;
        }
      },

      // 1. 可能有答案回显改变
      searchEcho(askContText) {
        let that=this;
        createQsn.searchEcho({
          input: askContText,
          tip: 1       //查询关于问题的回显
        }).then(res => {
          if(res.code=='1001'){
            that.moredata=true;
            that.questKey=res.data;
            // console.log('查询相关问题回显成功～');
          }else{
            // console.log(res.msg?res.msg:'请求异常~');
          }
        });
      },

      // 2. 问题标签相应改变
      queryQsnLabel(askContText) {
        let that = this;
        createQsn.queryQsnLabel({
          input: askContText,
          tip: 16
        }).then(res => {
          if(res.code=='1001'){
            that.tagList = res.data;
            let qlabelIds = that.qlabelIds;
            res.data.forEach(function (item) {
              qlabelIds.push(item.id)
            });
            that.qlabelIds = qlabelIds;
          }else{
            // console.log(res.msg?res.msg:'请求异常~');
          }
        });
      },

      changeInptag() {
        this.isShowAddtag=!this.isShowAddtag;
        if(!this.isShowAddtag){
          this.$nextTick(function () {
            this.$refs.addinput.$el.querySelector('input').focus();
          });
        }
      },

//      清空
      clearqsnFn() {
        this.askContText = '';
        this.moredata = '';
        this.qlabelIds = [];
        this.tagList = [];
        localStorage.removeItem("ask_val");
      },

      uniq(array){   //去重
        var temp = []; //一个新的临时数组
        for(var i = 0; i < array.length; i++){
          if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
          }
        }
        return temp;
      },

//      提问(发布问题)
      createQuestion() {
        let that = this;
        let qlabelIds = this.qlabelIds;
        qlabelIds=this.uniq(qlabelIds).join(",");
        let content = this.askContText;
        let anonymity = this.anonymity;
        if(content){
          let isEmojiCharacter = common.isEmojiCharacter(content);
          if(isEmojiCharacter){
            alert("不支持emoji表情,请删除~");
            return ;
          };
          that.isdisabled = true;
          createQsn.qsnCreate({
            qlabelIds: qlabelIds,
            content: content,
            anonymity: anonymity
          }).then(res => {
            that.isdisabled = false;
            if(res.code=='1000'){
              Message.success('提交成功～');
              this.askContText='';
              this.closeAskBox(that);
              localStorage.removeItem("ask_val");
            }else{
              Message.warning(res.msg?res.msg:'请求异常~');
              // console.log(res.msg?res.msg:'请求异常~');
            }

          });

        }else{
          return false;
        }

      },

      closeMoreWapper() {
        this.moredata = false
      }
    },
  }
</script>

<style lang="less">
  .askWrapper{

    .el-dialog__wrapper

    .el-dialog__header{
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }

    .ask-textarea textarea{
      border: 0;
      border: none;
    }
  }

  .moreBox{
    padding-top: 14px;
    margin: 0 20px 10px;

    h3{
      /*padding: 0 24px;*/
      padding: 0 24px 10px;
      font-size: 18px;
      color: #2e41a1;
      /*margin-bottom: 24px;*/

      span{
        display: block;
      }

      .icon-more-close{
        position: relative;
        left: 16px;
        width: 28px;
        height: 28px;
        background: url("../assets/imgs/ask-more-close.png") no-repeat;
      }
    }
    .more-ul{

    }

    .more-item{
      padding: 0 24px;
      font-size: 16px;
      line-height: 36px;

      &:hover{
        background-color: #e7e7e7;
      }
    }

    .item-content{
      color: #323232;
      font-weight: bold;
    }

    .item-ansnum{
      margin-left: 30px;
      color: #909090;
    }
  }

  //底部
  .more-bom{
    padding: 20px 24px 0;
  }

  .more-bom-plus{
    padding-bottom: 12px;
  }

  .ask-inp-tag{


    input{
      width: 190px;
      height: 30px;
    }
  }

  h4{
    //position: relative;
    padding: 4px 6px;
    color: #2e41a1;

    i{
      display: inline-block;
      margin-right: 4px;
      width: 12px;
      height: 12px;
      background: url("../assets/imgs/ask-more-plus.png") 0 0 no-repeat;
    }
  }

  .clearBox{
    color: #909090;

    img{
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }

  //底部标签
  .tagbox{
    overflow: hidden;

    .item-tag{
      min-width: 80px;
      line-height: 22px;
      text-align: center;
      height: 22px;
      float: left;
      padding: 4px 10px;
      background-color: #e7e7e7;
      border-radius: 15px;
      margin-right: 4px;

      &:nth-of-type(even){
        background-color: #daf6ff;
      }
    }
  }

  .qsnSubmitBtn{
    width: 120px;
    line-height: 42px;
    color: #fff;
    font-size: 18px;
    padding: 0;
    background-color: #2e41a1;
    border: 0;

    &:hover{
      background: #2e41a1;
      background-color: #2e41a1;
    }
  }
</style>
