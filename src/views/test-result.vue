<style lang="scss">
 .test-result{
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
         }
         .user-input{
             margin-right: 10px;
             width: 160px;

         }
     }

 }
</style>
<template>
    <el-tabs v-model="activeName" class="test-result tab-container">
        <el-tab-pane label="按试卷查询" name="first">
            <section class="search-bar">
                <el-select v-model="paperName"  :clearable="true" :filterable="true" placeholder="请选择试卷">
                    <el-option
                            v-for="item in papers"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" class="btn-search" icon="el-icon-search" @click="searchPaper">搜 索</el-button>
                <el-button type="primary" class="btn-search">导 出</el-button>

            </section>
            <section class="con">
                <h1>2019年06月 全国卷</h1>
                <p class="tip">开始时间：2019-05-01  结束时间：2019-06-01</p>
                <el-table
                        :data="paperData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="num"
                            label="工号"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="dep"
                            align="center"
                            label="科室">
                    </el-table-column>
                    <el-table-column
                            prop="job"
                            align="center"
                            label="岗位">
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            align="center"
                            label="是否通过">
                        <template slot-scope="scope">
                            <span v-if="scope.row.state">是</span>
                            <span class="no-pass" v-else>否</span>
                        </template>

                    </el-table-column>
                    <el-table-column
                            prop="date"
                            align="center"
                            label="通过时间">
                    </el-table-column>
                </el-table>
            </section>
        </el-tab-pane>
        <el-tab-pane label="按人员查询" name="second">
            <section class="search-bar">
                <el-input v-model="name" placeholder="请输入姓名" class="user-input"></el-input>
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
                <el-button type="primary" class="btn-search" icon="el-icon-search" @click="searchPer">搜索</el-button>
                <el-button type="primary" class="btn-search">导 出</el-button>
            </section>
            <section class="con">
                <h1>2019年05月至2019年07 某某考试情况表 </h1>
                <p class="tip">
                    工号：001 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    姓名：海里 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    科室：外科 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    岗位：护理
                </p>
                <el-table
                        :data="perData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="paperName"
                            label="试卷名称"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="startTime"
                            label="开始考试时间"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="endTime"
                            label="结束考试时间"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="是否通过考试"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.state">是</span>
                            <span class="no-pass" v-else>否</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="passTime"
                            label="通过时间"
                            align="center"
                    >
                    </el-table-column>

                </el-table>
            </section>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import {mapState} from 'vuex'
    import moment from 'moment'
    export default {
        data () {
            return {
                activeName:'first',
                paperData: [
                    {
                        num:'001',
                        name: '王小虎',
                        dep:'外科',
                        job:'护理',
                        state:false,
                        date: '2016-05-02',
                   },
                    {
                        num:'001',
                        name: '王小虎',
                        dep:'外科',
                        job:'护理',
                        state:false,
                        date: '2016-05-02',
                   },
                    {
                        num:'001',
                        name: '王小虎',
                        dep:'外科',
                        job:'护理',
                        state:false,
                        date: '2016-05-02',
                   },
                    {
                        num:'001',
                        name: '王小虎',
                        dep:'外科',
                        job:'护理',
                        state:false,
                        date: '2016-05-02',
                   },
                   ],
                perData:[
                    {
                        paperName:"试卷一",
                        startTime:"2019-5-10",
                        endTime:"2019-6-1",
                        state:false,
                        passTime:"2019-5-31"
                    },
                ],
                options: [
                    {
                        value: '1',
                        label: '卷一'
                    }, {
                        value: '2',
                        label: '卷二'
                    }, {
                        value: '3',
                        label: '卷三'
                    }
                ],
                paperName: '',
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
                name:''

            }
        },
        computed:{
            ...mapState(['papers'])
        },
        methods:{
            searchPaper () {
                // 按试卷查询
                console.log(this.paperName)
            },
            searchPer () {
                // 按人员查询
                let par={
                    name:this.name,
                    startTime:this.dateValue?moment(this.dateValue[0]).format("YYYY-MM-DD"):"",
                    endTime:this.dateValue?moment(this.dateValue[1]).format("YYYY-MM-DD"):"",
                }
            }
        }
    }
</script>