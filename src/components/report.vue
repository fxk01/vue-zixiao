<template>
  <div>
    <!--<el-button class="report-p" type="text" @click="showReportbox(hotList.id)">举报</el-button>-->
    <div class="reportWarpper">
      <el-dialog
        title="举报"
        :visible.sync="dialogVisible"
        width="32%"
        :before-close="handleReportClose"
      >
        <p class="small-P">请选择您举报的原因</p>
        <div class="report-main">
          <el-collapse accordion>
            <el-collapse-item v-for="(reportItem) in comlist" :key="reportItem.id">
              <template slot="title">
                {{reportItem.title}}
              </template>
              <div v-if="reportItem.content">
                <div class="flex flex-align-center cursor_hand flex-justify-between report-item" v-for="(itemConList,contidx) in reportItem.content" :key="itemConList.subid" @click="changereportItem(itemConList.subid)">
                  <div class="">
                    {{contidx+1}}.{{itemConList.subtitle}}
                  </div>
                  <img v-show="com_achieveId === itemConList.subid" class="achieveThumb" src="../assets/imgs/icon-report-achieve.png" alt="">
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <!--<ul class="report-main">-->
        <!--<li class="report-item" v-for="(reportItem) in comlist" :key="reportItem.id">{{reportItem.title}}</li>-->
        <!--</ul>-->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :class="com_achieveId === '-1'?'is-disabled':''" :disabled="com_achieveId === '-1'" @click="submitComplainFnNew()">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>

  import * as report from '../api/report';
  import { Message } from 'element-ui';

  export default {
    props: ['dialogVisible','qid','aid'],
    data() {
      return {
        comlist:[
          {
            id:"0",
            title:"广告",
            content: [
              {
                subid:'0',
                subtitle:'垃圾广告信息'
              }],
          },
          {
            id:"1",
            title:'低质问题或低质回答',
            content:[
              {
                subid:'1',
                subtitle:'不构成提问或回答'
              },
              {
                subid:'2',
                subtitle:'包含主观判断'
              },
              {
                subid:'3',
                subtitle:'缺乏可信来源'
              },
              {
                subid:'4',
                subtitle:'辱骂等人身攻击'
              },
              {
                subid:'5',
                subtitle:'引战争议等非真实问题'
              },
              {
                subid:'6',
                subtitle:'针对具体病情的求医问药'
              },
              {
                subid:'7',
                subtitle:'寻人、征友、作业等个人任务'
              },
            ]
          },
          {
            id:"2",
            title:'有害信息',
            content:[
              {
                subid:'8',
                subtitle:'政治敏感'
              },
              {
                subid:'9',
                subtitle:'色情低俗'
              },
              {
                subid:'10',
                subtitle:'有人意图自杀或自残'
              },
              {
                subid:'11',
                subtitle:'违法违规'
              },
              {
                subid:'12',
                subtitle:'看相、算命、星盘等迷信活动'
              }
            ]
          },
          {
            id:"3",
            title:"涉嫌侵权",
            content:[
              {
                subid:'13',
                subtitle:'个人侵权'
              },
              {
                subid:'14',
                subtitle:'企业侵权'
              }
            ]
          },
          {
            id:"4",
            title:"其他",
            content: [
              {
                subid:'15',
                subtitle:'其他原因'
              }],
          }
        ],
        com_achieveId: '-1'
      }
    },
    methods: {

      handleReportClose() {
        this.$emit('isCloseReportBox',false)
      },

      submitComplainFnNew() {
       let that = this;
        if(Number(this.aid)>-1){
         let pramObj={
           complainflag:this.com_achieveId,
           aid:this.aid
         };
          that.submitComplainFn(pramObj);
        }else if(Number(this.qid)>-1){
          let pramObj={
            complainflag:this.com_achieveId,
            qid:this.qid
          }
          that.submitComplainFn(pramObj);
        }
      },

      submitComplainFn(pramObj) {
        let that = this;
        this.com_achieveId = '-1';
        report.complain_qa(pramObj).then(res => {
          if(res.code=='1000'){
            that.handleReportClose();
//            alert('提交成功');
            Message.success('提交成功');
          }else{
            // console.log(res.msg?res.msg:'请求异常~');
          }
        });
      },



      changereportItem(subId) {
        this.com_achieveId=subId;
      }
    }


  }
</script>

<style lang="less">
  .reportWarpper{

    .el-dialog__header{
      text-align: center;
      font-weight: bold;

      .el-dialog__title{
        color: #0a3b85;
      }
    }

    .el-dialog__body{
      padding: 0px 20px 20px;
    }

    .small-P{
      text-align: center;
      color: #909090;
    }

    .report-main{
      padding-top: 20px;
    }

    .report-item{
      padding: 0 6px;
      line-height: 46px;
    }

    .el-collapse-item__arrow{
      line-height: 48px;
    }

    .el-collapse-item__content{
      padding-bottom: 8px;
    }

    .achieveThumb{
      display: block;
      width: 14px;
      height: 14px;

      img{
        width: 100%;
        height: 100%;
      }
    }

    .el-dialog__footer{
      text-align: center;

      .dialog-footer  .el-button{
        width: 100px;
        /*line-height: 30px;*/
        line-height: 34px;
        background-color: #2e41a1;
        border: 0;
        border: none;
        padding: 0;
      }
    }


    .is-disabled{
      background-color:#a0cfff !important;
    }

  }
</style>
