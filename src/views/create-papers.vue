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
                        <el-select v-model="paperName"  :clearable="true" :filterable="true" placeholder="请选择试卷">
                            <el-option
                                    v-for="item in papers"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
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
                            style="width: 100%">
                        <el-table-column
                                prop="paperName"
                                label="试卷名称"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="startDate"
                                label="开始日期"
                                align="center"
                                width="130">
                        </el-table-column>
                        <el-table-column
                                prop="endDate"
                                label="结束日期"
                                align="center"
                                width="130">
                        </el-table-column>
                        <el-table-column
                                label="是否使用"
                                align="center"
                                width="130"
                        >
                            <template slot-scope="scope">
                                <el-switch
                                        v-model="scope.row.state"
                                        :width=50
                                        active-text="是"
                                        inactive-text="否"
                                        @change="changeState(scope.row)"
                                >
                                </el-switch>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="详情"
                                align="center"
                                width="130">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>参考科室: <span v-for="(item,index) in scope.row.departments" :key="index">{{item}}</span></p>
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
                    全国考卷
                </h1>
                <el-button type="warning" size="mini" @click="dialogVisible=true"><i class="el-icon-edit"></i> 修改初始信息</el-button>
                <el-button type="success"  size="mini" @click="addQuestion"><i class="el-icon-plus"></i> 添加试题</el-button>
                <el-button type="danger"  size="mini" @click="deleteQuestion"><i class="el-icon-delete"></i> 删除试题</el-button>
                <el-button type="primary"  size="mini" @click="back">返 回</el-button>
            </section>

            <section class=" edit-paper">
                <header>
                    <p>2019-06-01 至 2019-06-29  考试科室：科室1、科室2</p>
                </header>
                <section class="tab-con">
                    <el-table
                            ref="multipleTable"
                            :data="testTableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="30">
                        </el-table-column>
                        <el-table-column
                                label=" "
                                width="30"
                                type="index">
                        </el-table-column>
                        <el-table-column
                                prop="question"
                                label="试题"
                        >
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
                :before-close="handleClose"
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
                    <p>科室：</p>
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
                                active-text="是"
                                inactive-text="否"
                        >
                        </el-switch>

                    </section>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
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
                   <el-select v-model="classifyValue" :clearable="true" :filterable="true" placeholder="请选择试题类型">
                       <el-option
                               v-for="(item,i) in questionsType"
                               :key="i"
                               :label="item.label"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </section>
               <el-table
                       ref="questionMultipleTable"
                       :data="questionTableData"
                       tooltip-effect="dark"
                       style="width: 100%"
                       @selection-change="handleSelectionChangeAdd">
                   <el-table-column
                           type="selection"
                           width="30">
                   </el-table-column>
                   <el-table-column
                           label=" "
                           width="30"
                           type="index">
                   </el-table-column>
                   <el-table-column
                           prop="question"
                           label="试题"
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
    export default {
        data () {
            return {
                editPaper:false,
                paperName:"",
                addPaperName:"",
                addTime:"",
                addState:false,
                tableData: [
                    {
                        id:1,
                        startDate: '2016-05-02',
                        endDate: '2016-05-02',
                        paperName: '全国考卷一',
                        departments:['科室一','科室二','科室三'],
                        testNum:10,
                        state:true,

                    },
                    {
                        id:2,
                        startDate: '2016-05-02',
                        endDate: '2016-05-02',
                        paperName: '全国考卷一',
                        departments:['科室一','科室二','科室三'],
                        testNum:20,
                        state:false,

                    },
                    {
                        id:3,
                        startDate: '2016-05-02',
                        endDate: '2016-05-02',
                        paperName: '全国考卷一',
                        departments:['科室一','科室二','科室三'],
                        testNum:30,
                        state:false,

                    },
                    {
                        id:4,
                        startDate: '2016-05-02',
                        endDate: '2016-05-02',
                        paperName: '全国考卷一',
                        departments:['科室一','科室二','科室三'],
                        testNum:40,
                        state:false,

                    },
                    {
                        id:5,
                        startDate: '2016-05-02',
                        endDate: '2016-05-02',
                        paperName: '全国考卷一',
                        departments:['科室一','科室二','科室三'],
                        testNum:50,
                        state:false,

                    },
                ],
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
                testTableData: [
                    {
                        id:1,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:2,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:3,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:4,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:5,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:6,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:7,
                        question: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                multipleSelection: [],
                questionTableData: [
                    {
                        id:1,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:2,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:3,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:4,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:5,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:6,
                        question: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id:7,
                        question: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                questionMultipleSelection: [],
                classify:[
                    {
                        value:"1",
                        label:"类型1"
                    },
                    {
                        value:"2",
                        label:"类型2"
                    },
                    {
                        value:"3",
                        label:"类型3"
                    },
                    {
                        value:"4",
                        label:"类型4"
                    },
                    {
                        value:"5",
                        label:"类型5"
                    },
                ],
                classifyValue:"",
                selectDepartOptions:[
                    {
                        value:"1",
                        label:"科室一"
                    },
                    {
                        value:"2",
                        label:"科室二"
                    },
                    {
                        value:"3",
                        label:"科室三"
                    },
                    {
                        value:"4",
                        label:"科室四"
                    },
                    {
                        value:"5",
                        label:"科室五"
                    },
                ],
                selectDepartValue:[]

            }
        },
        computed:{
            ...mapState(['departments','papers','questionsType'])
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
                    console.log(this.multipleSelection)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
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
                // 取消选择
                console.log(this.questionMultipleSelection)
                this.dialogVisible1 = false;
                this.$refs.questionMultipleTable.clearSelection();
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
                this.addState=false;
            },
            handlePost () {
                let par={
                    addPaperName:this.addPaperName,
                    startTime:this.addTime?moment(this.addTime[0]).format('YYYY-MM-DD' ):"",
                    endTime:this.addTime?moment(this.addTime[1]).format('YYYY-MM-DD' ):"",
                    selectDepartValue:this.selectDepartValue,
                    addState:this.addState
                }

                // 新增试卷
                if(this.editPaper){
                    // 修改试卷
                    console.log('修改试卷')

                }else{
                    // 新增试卷
                    console.log('新增试卷')

                    // 新增试卷后更新试卷列表
                    let data=[
                        {
                            value:"1",
                            label:"更新试卷1",
                        },
                        {
                            value:"2",
                            label:"更新试卷2",
                        },
                        {
                            value:"3",
                            label:"更新试卷3",
                        },
                    ]
                    this.setPapers(data)
                    this.dialogVisible = false;
                    this.addPaperName="";
                    this.addTime="";
                    this.selectDepartValue=[];
                    this.addState=false;


                }
                this.dialogVisible = false;
                console.log(par)
                this.$alert('提交成功','提示')

            },
            handleClose () {
                this.dialogVisible = false;
                this.addPaperName="";
                this.addTime="";
                this.addState=false;
            },
            handleEdit (row) {
                // 编辑试卷
                console.log(row)
                this.addPaperName=row.paperName;
                this.addTime=[new Date(row.startDate),new Date(row.endDate)];
                this.addState=row.state;

                this.editPaper=true;
            },
            handleDelete () {
                // 删除试卷
            },
            changeState (item) {
                // 修改试卷使用状态
                console.log(item)
            },
            search () {
                // 试卷查询
                let par={
                    paperName:this.paperName,
                    startTime:this.time?moment(this.time[0]).format('YYYY-MM-DD'):"",
                    endTime:this.time?moment(this.time[1]).format('YYYY-MM-DD'):""
                }
                console.log(par)
            }
        }
    }
</script>