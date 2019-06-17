<style lang="scss">
 .test-result{
     height:calc(100% - 38px);
     .pagination{
         float: right;
         margin-right: 10px;
         padding-top:6px;
     }
    h1{
        margin-bottom:10px;
        font-size: 18px;
        text-align: center;
    }
     .tip{
         margin-bottom: 10px;
         font-size: 16px;
         text-align: center;
     }
     .no-pass{
         color:#ff0000;
     }
     .search-bar{
         height:60px;
         .btn-search{
             float: right;
             margin-left: 15px;
             &:nth-of-type(1){
                 padding:12px 0;
             }
             a{
                 padding:12px 20px;
                 color:#ffffff;
             }
         }
         .user-input{
             margin-right: 10px;
             width: 160px;

         }

     }

 }
</style>
<template>
    <section class="test-result">
        <el-tabs v-model="activeName" class="tab-container" @tab-click="tabClick">
            <el-tab-pane label="按试卷查询" name="first">
                <section class="search-bar">
                    <el-select
                            v-model="examNumber"
                            :clearable="true"
                            :filterable="true"
                            :remote="true"
                            :remote-method="remoteMethod"
                            :loading="selectLoading"
                            placeholder="请选择试卷"
                    >
                        <el-option
                                v-for="(item,index) in papers"
                                :key="index"
                                :label="item.examName"
                                :value="item.examNumber">
                        </el-option>
                    </el-select>
                    <el-button type="primary" class="btn-search">
                        <a :href="`${baseUrl}/examRecord/exportExamRecordByExamNo?examNo=${examNumber}`">导 出</a>
                    </el-button>
                    <el-button type="primary" class="btn-search" icon="el-icon-search" @click="searchPaperList">搜 索</el-button>

                </section>
                <section class="con">
                    <h1>{{examName}}</h1>
                    <p class="tip">
                        开始时间：{{effectiveBeginTime}}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        结束时间：{{effectiveEndTime}}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        通过考试人数：{{passExam}}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        未通过考试人数：{{unPassExam}}
                    </p>
                    <el-table
                            :data="paperData"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="staffName"
                                label="姓名"
                                width="100"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="jobNumber"
                                label="工号"
                                width="100"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="jobTitle"
                                label="职称"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="department"
                                label="部门"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="startTime"
                                label="开始考试时间"
                                width="160"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="endTime"
                                label="结束考试时间"
                                width="160"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="result"
                                label="是否通过考试"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="endTime"
                                label="通过时间"
                                width="160"
                                align="center"
                        >
                        </el-table-column>

                    </el-table>
                </section>
            </el-tab-pane>
            <el-tab-pane label="按人员查询" name="second">
                <section class="search-bar">
                    <el-input v-model="userNum" placeholder="请输入工号" class="user-input"></el-input>
                    <el-date-picker
                            v-model="dateValue"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-button type="primary" class="btn-search">
                        <a :href="`${baseUrl}/examRecord/exportExamResultByJobNumber?staffNumber=${userNum}&startTime=${startTime}&endTime=${endTime}`">
                            导 出
                        </a>
                    </el-button>
                    <el-button type="primary" class="btn-search" icon="el-icon-search" @click="searchPerList">搜 索</el-button>

                </section>
                <section class="con">
                    <h1><span v-if="dateValue">{{startTime}}至{{endTime}}</span> {{userInfo.staffName}}考试情况表 </h1>
                    <p class="tip">
                        工号：{{userInfo.staffNumber}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        姓名：{{userInfo.staffName}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        科室：{{userInfo.deptName}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        岗位：{{userInfo.jobTitle}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        通过考试数量：{{perPassExam}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        未通过考试数量：{{perUnPassExam}}
                    </p>
                    <el-table
                            :data="perData"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="examName"
                                label="试卷名称"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="effectiveBeginTime"
                                label="开始考试时间"
                                width="180"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="effectiveEndTime"
                                label="结束考试时间"
                                width="180"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="passState"
                                label="是否通过考试"
                                width="120"
                                align="center"

                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.passState">是</span>
                                <span class="no-pass" v-else>否</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="passTime"
                                label="通过时间"
                                width="180"
                                align="center"
                        >
                        </el-table-column>

                    </el-table>
                  </section>
            </el-tab-pane>
        </el-tabs>
        <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                @current-change="currentChange"
                :current-page="currentPage"
                :hide-on-single-page="true"
                :page-count="totalPage">
        </el-pagination>
    </section>



</template>
<script>
    import moment from 'moment'
    import fetch from '@/config/fetch'
    import {baseUrl} from "../config/env";
    import {getCookie} from "../tool/tool";

    export default {
        data () {
            return {
                baseUrl,
                selectMethodsToggle:false,
                activeName:'first',
                paperData: [],
                perData:[],
                examNumber: '',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                dateValue:"",
                userNum:'',
                currentPage:1,
                totalPage:1,
                pageSize:30,
                basisPerSelectCurrentPage:1,
                basisPerTotalCurrentPage:1,
                basisExmSelectCurrentPage:1,
                basisExmTotalCurrentPage:1,
                examName:"",
                effectiveBeginTime:"",
                effectiveEndTime:"",
                userInfo:{},
                startTime:"",
                endTime:"",
                selectLoading:false,
                papers:[],
                passExam:null,
                unPassExam:null,
                perPassExam:null,
                perUnPassExam:null,

            }
        },
        computed:{
        },
        mounted () {
            this.searchPaperList();

        },
        methods:{
            remoteMethod(query) {
                if (query !== '') {
                    this.selectLoading = true;
                    fetch("/examination/list",{examName:query},'post',JSON.parse(getCookie("pcToken")))
                        .then((res)=>{
                            this.selectLoading = false;
                            if(res.code===0){
                                this.papers = res.data;
                            }

                        })
                        .catch((err)=>{
                            this.selectLoading = false;
                            this.$alert("数据加载异常", "提示")
                        })
                }
            },
            tabClick () {
                if(this.activeName!=='first'){
                    // 人员查询
                    this.selectMethodsToggle=true;
                    this.currentPage=this.basisPerSelectCurrentPage;
                    this.totalPage=this.basisPerTotalCurrentPage;

                }else{
                    // 试卷查询
                    this.selectMethodsToggle=false;
                    this.currentPage=this.basisExmSelectCurrentPage;
                    this.totalPage=this.basisExmTotalCurrentPage;
                };
            },
            currentChange (val) {
                this.currentPage=val;
                if(this.selectMethodsToggle){
                    // 按人员查询
                    this.basisPerSelectCurrentPage=val;
                    this.searchPerList('page');
                }else{
                    // 按试卷查询
                    this.basisExmSelectCurrentPage=val;
                    this.searchPaperList('page');

                }
            },
            searchPaperList (flag) {
                // 按试卷查询
                if(flag!=='page'){
                    this.currentPage=1;
                    this.basisExmSelectCurrentPage=1;
                }
                fetch("/examRecord/getExamRecordByExamNo",{pageNumber:this.currentPage,pageSize:this.pageSize,examNo:this.examNumber},"post",JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.passExam=res.data.examMain.passNum;
                            this.unPassExam=res.data.examMain.failNum;
                            this.paperData=res.data.pageInfo.list;
                            this.examName=res.data.examMain.examName;
                            this.effectiveBeginTime=res.data.examMain.effectiveBeginTime;
                            this.effectiveEndTime=res.data.examMain.effectiveEndTime;
                            this.totalPage=res.data.pageInfo.pages;
                            this.basisExmSelectCurrentPage=this.currentPage;
                            this.basisExmTotalCurrentPage=this.totalPage;
                        }
                    })
                    .catch(()=>{
                        this.$alert("数据加载异常","提示");
                    })
            },
            searchPerList (flag) {
                // 按人员查询
                this.startTime=this.dateValue?moment(this.dateValue[0]).format("YYYY-MM-DD"):"";
                this.endTime=this.dateValue?moment(this.dateValue[1]).format("YYYY-MM-DD"):"";
                if(flag!=="page"){
                    this.currentPage=1;
                    this.basisPerSelectCurrentPage=1;
                }
                let par={
                    startTime:this.startTime,
                    endTime:this.endTime,
                    pageNumber:this.currentPage,
                    pageSize:this.pageSize,
                    staffNumber:this.userNum
                }
                fetch("/examRecord/getExamResultByJobNumber",par,"post",JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.perPassExam=res.data.hospitalPersonnel.passNum;
                            this.perUnPassExam=res.data.hospitalPersonnel.failNum;
                            this.perData=res.data.pageInfo.list;
                            this.userInfo=res.data.hospitalPersonnel;
                            this.totalPage=res.data.pageInfo.pages;
                            this.basisPerSelectCurrentPage=this.currentPage;
                            this.basisPerTotalCurrentPage=this.totalPage;
                        }else{
                            this.$alert(res.msg,"提示")
                        }
                    })
                    .catch(()=>{
                        this.$alert("数据加载异常","提示")
                    })

            }
        }
    }
</script>