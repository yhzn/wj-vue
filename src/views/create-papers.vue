<style lang="scss">
 .create-papers{
      height: 100%;
      overflow: hidden;
      .papers{
          height: 100%;
          overflow: hidden;
          .f-papers{
              height:calc(100% - 62px);
              overflow: hidden;
          }
      }
     .table-con{
         height: 100%;
         overflow: auto;
     }
      nav{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          height: 60px;
          border-bottom: 1px solid #DCDFE6;
          ul{
              li{
                  float: left;
                  margin-right: 10px;
              }
          }
      }
     footer{
         text-align: right;
         margin: 0 10px;
         height:50px;
         i{
             font-size: 16px;
         }
     }
     .add-papers{
         li{
             position: relative;
             margin-bottom:20px;
             p{
                 position: absolute;
                 top:50%;
                 transform: translateY(-50%);
                 float: left;
                 width:100px;

                 text-align: right;
             }
             section{
                 margin-left: 100px;
                 .add-time{
                     width:100%;
                 }
             }

         }
     }
     .edit-paper{
         height:calc(100% - 60px);
         overflow: auto;
         header{
             padding-top:20px;
             h1{
                 margin-bottom: 10px;
                 font-size: 18px;
             }
             p{
                 font-size: 16px;
                 margin-left: 10px;
             }
         }
     }
     .tab-con{
         margin-bottom: 20px;
     }
     .btn-con{
         padding-top:20px;
         margin: 0 10px;
         text-align: right;
         h1{
             float: left;
             font-size: 22px;
         }
     }
     .self-dialog-body{
         height:390px;
         overflow:auto;
     }
     .select-depart{
         width:100%;
     }
 }
</style>
<template>
    <section class="create-papers">
        <section class="papers" v-show="!editPaper">
            <nav>
                <ul class="clearfix">
                    <li>
                        <el-input  v-model="paperName" placeholder="请输入试卷名称"></el-input>
                        <!--<el-select v-model="paperName"  :clearable="true" :filterable="true" placeholder="请选择试卷">-->
                            <!--<el-option-->
                                    <!--v-for="item in papers"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    </li>
                    <li>
                        <el-date-picker
                                v-model="time"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </li>
                    <li>
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    </li>
                </ul>
                <el-button type="success" @click="dialogVisible=true"><i class="el-icon-plus"></i> 新增试卷</el-button>

            </nav>
            <section class="f-papers">
                <section class="table-con">
                    <el-table
                            :data="tableData"
                            stripe
                            row-key="examNumber"
                            style="width: 100%">
                        <el-table-column
                                prop="examName"
                                label="试卷名称"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="effectiveBeginTime"
                                label="开始日期"
                                align="center"
                                width="160">
                        </el-table-column>
                        <el-table-column
                                prop="effectiveEndTime"
                                label="结束日期"
                                align="center"
                                width="160">
                        </el-table-column>
                        <el-table-column
                                label="是否使用"
                                align="center"
                                width="90"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag==='1'">
                                    是
                                </span>
                                <span v-else>
                                    否
                                </span>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="详情"
                                align="center"
                                width="100">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>
                                        考试科室:
                                        <span
                                                v-for="(item,index) in scope.row.departments"
                                                :key="index"
                                        >
                                            {{item}}
                                        </span>
                                    </p>
                                    <p>试题数量: {{ scope.row.testNum }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">详情</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                                width="150"
                        >
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </section>
            </section>

        </section>
        <section class="papers" v-show="editPaper">
            <section class="btn-con">
                <h1>
                    {{addPaperName}}
                </h1>
                <el-button type="warning" size="mini" @click="dialogVisible=true"><i class="el-icon-edit"></i> 修改初始信息</el-button>
                <el-button type="success"  size="mini" @click="addQuestion"><i class="el-icon-plus"></i> 添加试题</el-button>
                <el-button type="danger"  size="mini" @click="deleteQuestion"><i class="el-icon-delete"></i> 删除试题</el-button>
                <el-button type="primary"  size="mini" @click="back">返 回</el-button>
            </section>
            <section class=" edit-paper">
                <header>
                    <p>有效日期：{{effectiveBeginTime}} 至 {{effectiveEndTime}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;考试科室：******</p>
                </header>
                <section class="tab-con">
                    <el-table
                            ref="multipleTable"
                            :data="paperQueTableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            row-key="questionNumber"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="30">
                        </el-table-column>
                        <el-table-column
                                label=" "
                                width="80"
                                align="center"
                                type="index">
                        </el-table-column>
                        <el-table-column
                                prop="question"
                                label="试题"
                        >
                            <template slot-scope="scope">
                                <formatter-question :row="scope.row"></formatter-question>
                              </template>
                        </el-table-column>
                    </el-table>
                </section>
            </section>
        </section>
        <el-dialog
                class="add-papers"
                :title="editPaper?'修改初始信息':'新增试卷'"
                :visible.sync="dialogVisible"
                top="15%"
                width="60%"
                @before-close="dialogVisible = false"
        >
            <ul>
                <li>
                    <p>试卷名称：</p>
                    <section>
                        <el-input v-model="addPaperName" placeholder="请输入试卷名称"></el-input>
                    </section>
                </li>
                <li>
                    <p>起止日期：</p>
                    <section>
                        <el-date-picker
                                class="add-time"
                                v-model="addTime"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>

                    </section>
                </li>
                <li>
                    <p>考试科室：</p>
                    <section>
                        <el-select class="select-depart" v-model="selectDepartValue" multiple :clearable="true" placeholder="请选择科室">
                            <el-option
                                    v-for="(item,i) in departments"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </section>
                </li>
                <li>
                    <p>是否使用：</p>
                    <section>
                        <el-switch
                                v-model="addState"
                                :width=50
                                active-value="1"
                                inactive-value="0"
                                active-text="是"
                                inactive-text="否"
                        >
                        </el-switch>

                    </section>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handlePost">确 定</el-button>
             </span>
        </el-dialog>
        <el-dialog
                class="add-papers"
                title="添加试题"
                :visible.sync="dialogVisible1"
                top="8%"
                width="85%"
                :before-close="handleCloseAdd"
        >
           <section class="self-dialog-body">
               <section>
                   <el-select
                           v-model="classifyValue"
                           :clearable="true"
                           :filterable="true"
                           placeholder="请选择试题类型"
                           @change="selectClassify"
                   >
                       <el-option
                               v-for="(item,i) in questionsType"
                               :key="i"
                               :label="item.questionTypeName"
                               :value="item.questionTypeNumber">
                       </el-option>
                   </el-select>
               </section>
               <el-table
                       ref="questionMultipleTable"
                       :data="questionTableData"
                       tooltip-effect="dark"
                       row-key="questionNumber"
                       style="width: 100%"
                       @selection-change="handleSelectionChangeAdd">
                   <el-table-column
                           type="selection"
                           width="30">
                   </el-table-column>
                   <el-table-column
                           label=" "
                           width="80"
                           align="center"
                           type="index">
                   </el-table-column>
                   <el-table-column
                           prop="question"
                           label="试题"
                   >
                       <template slot-scope="scope">
                           <formatter-question :row="scope.row"></formatter-question>
                       </template>

                   </el-table-column>
                   <el-table-column
                           prop="typeName"
                           label="类型"
                           width="200"
                   >
                   </el-table-column>
               </el-table>
           </section>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseAdd">取 消</el-button>
                <el-button type="primary" @click="handlePostAdd">确 定</el-button>
             </span>
        </el-dialog>
    </section>
</template>
<script>
    import moment from 'moment'
    import {mapState,mapActions} from 'vuex'
    import fetch from '@/config/fetch'
    import formatterQuestion from "@/components/formatter-question";
    import {getCookie} from "../tool/tool";

    export default {
        data () {
            return {
                editPaper:false,
                paperName:"",
                addPaperName:"",
                addTime:"",
                addState:"0",
                tableData: [],
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
                time:'',
                dialogVisible:false,
                dialogVisible1:false,
                testTableData: [],
                multipleSelection: [],
                questionTableData: [],
                questionMultipleSelection: [],
                paperQueTableData:[],
                classifyValue:"",
                selectDepartValue:[],
                paperId:null,
                effectiveBeginTime:null,
                effectiveEndTime:null,
                examName:"",


        }
        },
        computed:{
            ...mapState(['departments','papers','questionsType']),
        },
        mounted () {
           this.getData();
        },
        components:{
            formatterQuestion
        },
        methods:{
            ...mapActions(['setPapers']),
            addQuestion () {
                this.dialogVisible1 = true;

            },
            deleteQuestion () {
                if(this.multipleSelection.length===0){
                    this.$alert('请选择要删除的试题','提示');
                    return false;
                }
                this.$confirm('此操作将从该卷中删除选中试题, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let arr=this.multipleSelection.map((item)=>{
                        return item.questionNumber

                    })
                    fetch('/examination/delQuestionByExamId',{examNo:this.paperId,questionIds:arr},'post',JSON.parse(getCookie("pcToken")))
                        .then((res)=>{
                            if(res.code===0){
                                this.getExam(this.paperId);
                                this.getQuestionList(this.classifyValue);
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: res.msg
                                });

                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChangeAdd (val) {
                this.questionMultipleSelection = val;
            },
            handlePostAdd () {
                let arr=this.questionMultipleSelection.map((item)=>{
                     return item.questionNumber
                })
                this.dialogVisible1 = false;
                fetch('/examination/addQuestionsToExam',{examNo:this.paperId,questionIds:arr},'post',JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.getExam(this.paperId);
                            this.getQuestionList(this.classifyValue);
                            this.$refs.questionMultipleTable.clearSelection();

                        }
                        this.$alert(res.msg)
                    })
                    .catch(()=>{
                        this.$alert("数据加载异常","提示");
                    })

            },
            handleCloseAdd () {
                this.dialogVisible1 = false;
                this.$refs.questionMultipleTable.clearSelection();
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            back () {
                this.editPaper=false;
                this.addPaperName="";
                this.addTime="";
                this.selectDepartValue=[];
                this.addState="0";
            },
            handlePost () {
                let url,par={
                    examName:this.addPaperName,
                    effectiveBeginTime:this.addTime?moment(this.addTime[0]).format('YYYY-MM-DD' ):"",
                    effectiveEndTime:this.addTime?moment(this.addTime[1]).format('YYYY-MM-DD' ):"",
                    examDept:this.selectDepartValue,
                    flag:this.addState,
                    examNumber:this.paperId
                }


                // 新增试卷
                if(this.editPaper){
                    // 修改试卷
                    url='/examination/update'
                }else{
                    // 新增试卷
                    url='/examination/save'
                }
                fetch(url,par,'post',JSON.parse(getCookie("pcToken")))
                .then((res)=>{
                   this.$alert(res.msg,"提示");

                   this.getData()
                   this.dialogVisible = false;
                   if(!this.editPaper){
                          this.addPaperName="";
                          this.addTime="";
                          this.selectDepartValue=[];
                          this.addState="0";

                   }
                })
                .catch((err)=>{
                   this.$alert("数据加载异常",'提示');

                })
                this.dialogVisible = false;
            },
            handleEdit (row) {
                // 编辑试卷
                console.log(row)
                this.addPaperName=row.examName;
                this.addTime=[new Date(row.effectiveBeginTime),new Date(row.effectiveEndTime)];
                this.effectiveBeginTime=row.effectiveBeginTime;
                this.effectiveEndTime=row.effectiveEndTime;
                this.addState=row.flag;
                this.paperId=row.examNumber;
                this.editPaper=true;
                this.getExam(row.examNumber);
                this.getQuestionList(this.classifyValue);
            },
            selectClassify (v) {
                this.classifyValue=v;
                this.getQuestionList (v);
            },
            getQuestionList (typeNumber) {
                fetch('/examination/getExamQuestionNotExistInExam',{examNumber:this.paperId,typeNumber},'post',JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                         if(res.code===0){
                             this.questionTableData=res.data;
                         }else{
                             this.$alert(res.msg,"提示")
                         }
                    })
                    .catch((err)=>{
                        this.$alert("数据加载异常","提示")

                    })
            },
            getExam (id) {
                fetch("/question/listByExamNumber",{examNumber:id},'get',JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.paperQueTableData=res.data;

                        }else{
                            this.$alert(res.msg,'提示')
                        }
                    })
                    .catch((err)=>{
                        this.$alert("数据加载异常","提示")
                    })
            },
            handleDelete (row) {
                // 删除试卷
                this.$confirm('是否删除该试卷?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteExam(row);
                }).catch((err) => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            deleteExam (row) {
                fetch('/examination/del',{examNo:row.examNumber},'get',JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.getData();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$alert(res.msg,"提示");
                        }
                    })
                    .catch((err)=>{
                        this.$alert("数据加载异常","提示")
                    })
            },
            changeState (item) {
                // 修改试卷使用状态
                console.log(item)
            },
            search () {
                // 试卷查询
                let par={
                    examName:this.paperName,
                    effectiveBeginTime:this.time?moment(this.time[0]).format('YYYY-MM-DD'):"",
                    effectiveEndTime:this.time?moment(this.time[1]).format('YYYY-MM-DD'):""
                }
                this.getData(par)
            },
            getData (par) {
               fetch("/examination/list",par,'post',JSON.parse(getCookie("pcToken")))
               .then((res)=>{
                    //this.setPapers(res.data)
                    this.tableData=res.data;
               })
               .catch((err)=>{
                  this.$alert("数据加载异常", "提示")
               })
            }
        }
    }
</script>