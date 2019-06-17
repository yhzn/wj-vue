<style lang="scss">
.input-question {
    height:100%;
    overflow: hidden;

    .tab-container{
        height:100%;
        overflow: hidden;
        .el-tabs__header{
            margin-left:10px;
            margin-right:10px;
        }
        .el-tabs__content{
           height:calc(100% - 55px);
           overflow: auto;
           .el-tab-pane{
               margin: 0 20px;
           }
       }
    }
    .tips{
        padding-bottom:10px;
        font-size: 16px;
        span{
            font-size: 14px;
            color:#ff0000;
        }
    }
    .input{
        margin-bottom:30px;
        height:160px;
        .input-text{
            height:100%;
            textarea{
                height:100%;
            }
        }

    }
    .answer-list{
        margin-bottom:20px;
        font-size: 16px;
        .head{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
            height:30px;
        }
        .group{
            margin-left: 10px;
            width:90px;
            .el-input__inner{
                height:25px;
                line-height: 25px;
            }
            .el-input__suffix-inner{
                position: absolute;
                top:-7px;
                right:-5px;
            }
        }
    }
    .classify{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .search-bar{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

    }
    .modify-classify{
        width:100%;
    }
    .classify-set{
        height:300px;
        overflow: auto;
    }
    .btn-sure{
        float: right;
    }
    .input-classify{
        margin-right: 110px;
    }
    #pane-second{
        margin: 0;
        height:100%;
        overflow: hidden;
        .mark-scroll{
            height:100%;
            padding: 0 20px;
            overflow: auto;
        }
    }

}
</style>
<template>
    <section class="input-question"  v-loading="loading" element-loading-text="数据加载中......">
        <el-tabs v-model="activeName" class="tab-container" @tab-click="modifyFlag=(activeName!=='first')">
            <el-tab-pane label="试题录入" name="first">
                <section class="tips">
                    录入试题
                    <span>（1. 试题中填答案部分请用 $ 代替；2. 录入试题后将光标移除，若试题中有 $ ，则可录入答案）</span>
                </section>
                <section class="classify">
                    <el-select
                            v-model="classifyValue"
                            :clearable="true"
                            :filterable="true"
                            placeholder="请选择试题类型（选填）"
                    >
                        <el-option
                                v-for="(item,k) in questionsType"
                                :key="k"
                                :label="item.questionTypeName"
                                :value="item.questionTypeNumber">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="dialogVisible = true">维护试题类型</el-button>
                </section>
                <section class="input">
                    <el-input
                            class="input-text"
                            type="textarea"
                            resize="none"
                            placeholder="请输试题"
                            v-model="question"
                            @change="getAnswerLength"
                    >
                    </el-input>
                </section>
                <section class="tips">
                    录入答案
                    <span> （1.答案顺序为 $ 在试题中顺序；2.答题时，若答案位置可互换，请选择相同组号，3. 录入答案不能出现符号）</span>
                </section>
                <section class="answer-list" v-for="(item,index) in answer" :key="index">
                    <section class="head">
                        <section>
                            <span>
                                答案位置是否可换
                            </span>
                            <el-switch
                                    v-model="item.t"
                                    :width=50
                                    active-text="是"
                                    inactive-text="否"
                                    :change="item.group=item.t?item.group:''"
                            >
                            </el-switch>
                        </section>
                        <section>
                            <span v-if="item.t">
                                选择组号
                            </span>
                            <el-select  v-if="item.t" class="group" v-model="item.group" placeholder="请选择">
                                <el-option
                                        v-for="(m,j) in groupOptions"
                                        :key="j"
                                        :label="m.label"
                                        :value="m.value">
                                </el-option>
                            </el-select>
                        </section>

                    </section>
                    <section>
                        <el-input
                                placeholder="请输入答案"
                                v-model="item.val"
                                @change="setAnswerStrLength(item)"
                                clearable>
                        </el-input>
                    </section>
                </section>
                <el-button class="btn-sure" v-if="answer.length!==0" type="primary" @click="submit">提 交</el-button>

            </el-tab-pane>
            <el-tab-pane label="试题修改" name="second">
                <section class="mark-scroll">
                    <section class="search-bar">
                        <el-select v-model="selectClassifyValue" :clearable="true" :filterable="true" @change="classifyChange" placeholder="请选择试题类型">
                            <el-option
                                    v-for="(item,j) in  questionsType"
                                    :key="j"
                                    :label="item.questionTypeName"
                                    :value="item.questionTypeNumber">
                            </el-option>
                        </el-select>
                        <el-button type="danger" @click="mulDelete"><i class="el-icon-delete"></i> 批量删除</el-button>
                    </section>
                    <el-table
                            ref="multipleTable"
                            :data="testTableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            row-key="questionNumber"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="30"
                                align="center"

                        >
                        </el-table-column>
                        <el-table-column
                                label=" "
                                width="80"
                                type="index"
                                align="center"
                        >
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
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="180"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button
                                        plain
                                        size="mini"
                                        @click="handleEdit(scope.row)">修改类型</el-button>
                                <el-button
                                        plain
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </section>

            </el-tab-pane>
        </el-tabs>
        <el-dialog
                :title="modifyFlag ? '修改试题类型':'试题类型维护'"
                :visible.sync="dialogVisible"
                :top="modifyFlag?'20%':'10%'"
                width="500"
                :before-close="handleClose"
        >
            <section v-if="!modifyFlag" class="classify-set">
                <section>
                    <el-button type="primary" class="btn-sure" @click="handlePost">新增类型</el-button>
                    <section class="input-classify">
                        <el-input  v-model="createClassify" placeholder="请输入内容"></el-input>
                    </section>
                </section>
                <section>
                    <el-table
                            :data="questionsType"
                            tooltip-effect="dark"
                            style="width: 100%"
                    >
                        <el-table-column
                                prop="questionTypeName"
                                label="类型"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="180"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button
                                        plain
                                        size="mini"
                                        type="warning"
                                        @click="handleChangeClassify(scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </section>
            </section>
            <el-select v-else class="modify-classify" v-model="modifyClassify" :clearable="true" :filterable="true" placeholder="请选择试题类型">
                <el-option
                        v-for="(item,i) in questionsType"
                        :key="i"
                        :label="item.questionTypeName"
                        :value="item.questionTypeNumber">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer" v-if="modifyFlag">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handlePost">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
    import {mapState,mapActions} from 'vuex'
    import {trim} from "@/tool/tool";
    import fetch from '@/config/fetch'
    import formatterQuestion from "@/components/formatter-question";
    import {getCookie} from "../tool/tool";

    export default {
        data () {
            return {
                modifyFlag:false,
                activeName:'first',
                groupOptions: [
                 {
                    value: '1',
                    label: '1'
                 }, {
                    value: '2',
                    label: '2'
                }, {
                    value: '3',
                    label: '3'
                }, {
                    value: '4',
                    label: '4'
                }, {
                    value: '5',
                    label: '5'
                }, {
                    value: '3',
                    label: '3'
                }, {
                    value: '4',
                    label: '4'
                }, {
                    value: '5',
                    label: '5'
                }, {
                    value: '6',
                    label: '6'
                }, {
                    value: '7',
                    label: '7'
                }, {
                    value: '8',
                    label: '8'
                }, {
                    value: '9',
                    label: '9'
                }, {
                    value: '10',
                    label: '10'
                }, {
                    value: '11',
                    label: '11'
                }, {
                    value: '12',
                    label: '12'
                }, {
                    value: '13',
                    label: '13'
                }, {
                    value: '14',
                    label: '14'
                }, {
                    value: '15',
                    label: '15'
                }, {
                    value: '16',
                    label: '16'
                }, {
                    value: '17',
                    label: '17'
                }, {
                    value: '18',
                    label: '18'
                }, {
                    value: '19',
                    label: '19'
                }, {
                    value: '20',
                    label: '20'
                }
                ],
                groupValue:"",
                question:"",
                questionId:null,
                answer: [],
                classifyValue:"",
                modifyClassify:"",
                dialogVisible:false,
                createClassify:"",
                testTableData: [],
                multipleSelection:[],
                selectClassifyValue:"",
                loading:false,
                filterClassify:"",
            }
        },
        mounted () {
            this.getQuestionList()
        },
        computed:{
            ...mapState(['questionsType']),
        },
        components:{
            formatterQuestion
        },
        methods:{
            ...mapActions(['setQuestionsType']),
            getQuestionList (par="") {
                fetch('/question/list',{typeNumber:par},'post',JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.testTableData=res.data;
                        }else{
                            this.$alert(res.msg,"提示")
                        }
                    })
                    .catch((err)=>{
                        this.$alert("数据加载异常","提示")
                    })
            },
            handleChangeClassify (row) {
                // 修改试题类型
                this.$prompt('请输入类型', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^.+$/,
                    inputErrorMessage: '类型不能为空'
                }).then(({ value }) => {
                    fetch('/question/modifyQuestionTypeName',{questionTypeName:value,questionTypeNumber:row.questionTypeNumber},'post',JSON.parse(getCookie("pcToken")))
                        .then((res)=>{
                            if(res.code===0){
                                this.getQuestionTypeList();
                                this.getQuestionList(this.filterClassify)

                            }else{
                                this.$alert(res.msg,"提示")
                            }
                        })
                        .catch(()=>{
                            this.$alert("数据加载异常","提示")
                        })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                });

            },
            classifyChange (v) {
                this.filterClassify=v;
                this.getQuestionList(v)
            },
            handleEdit (row) {
                // 修改类型
                this.modifyClassify=row.typeNum;
                this.questionId=row.questionNumber;
                this.dialogVisible=true;
            },
            handleDelete (row) {
                // 删除
                this.$confirm('此操作将从题库中删除此试题, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteData([row.questionNumber]);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteData (arr=[]) {
                fetch('/question/del',{ids:arr},'post',JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.getQuestionList(this.filterClassify);
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
                    .catch(()=>{
                        this.$alert("数据加载异常","提示")
                    })

            },
            mulDelete () {
                // 批量删除

                if(this.multipleSelection.length===0){
                    this.$alert("请选择要删除的试题","提示");
                    return false;
                }
                this.$confirm('此操作将从题库删除选中试题, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    let arr=this.multipleSelection.map((item,index)=>{
                        return item.questionNumber;
                    })
                    this.deleteData(arr);
                    this.$refs.multipleTable.clearSelection();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handlePost () {
                if(this.modifyFlag){
                    //修改类型
                    fetch('/question/modifyQuestionType',{typeNumber:this.modifyClassify,questionNumber:this.questionId},'post',JSON.parse(getCookie("pcToken")))
                        .then((res)=>{
                            if(res.code===0){
                                this.getQuestionList(this.filterClassify)
                                this.dialogVisible = false;

                            }else{
                                this.$alert(res.msg,"提示");
                            }
                        })
                        .catch(()=>{
                            this.$alert("数据加载异常","提示");
                        })
                }else{
                    // 创建类型
                    fetch("/question/saveQuestionType",{questionTypeName:this.createClassify},'post',JSON.parse(getCookie("pcToken")))
                        .then((res)=>{
                            if(res.code===0){
                                this.getQuestionTypeList();
                            }else{
                                this.$alert(res.msg);
                            }
                        })
                        .catch(()=>{
                            this.$alert("数据加载异常","提示")
                        })
                    this.createClassify="";
                }
            },
            getQuestionTypeList () {
                fetch("/question/questionTypeList",{},'get',JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.setQuestionsType(res.data);

                        }else{
                            this.$alert(res.msg)
                        }
                    })
            },
            handleClose () {
                this.dialogVisible = false;
                this.createClassify="";
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            setAnswerStrLength(item){
                let regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
                    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
                if(regEn.test(item.val) || regCn.test(item.val)) {
                    this.$alert('输入答案不能为空 且不能有符号', '标题名称');
                    return true;
                }
                let val=trim(item.val);
                item.val=val;
                item.len=val.length;
            },
            getAnswerLength (v) {
                let strLength=v.split("$").length-1;
                let answerLength=this.answer.length;
                let comLength,flag;
                if(strLength>=answerLength){
                    flag=true;
                    comLength=strLength-answerLength;
                }else{
                    flag=false;
                    comLength=answerLength-strLength;
                }
                for(let i=0;i<comLength;i++){
                    if(flag){
                        this.answer.push({
                            group:"",
                            val:"",
                            len:""
                        })
                    }else{
                        this.answer.pop()
                    }
                }
            },
            submit(){
                let regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
                    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
                let v=this.answer.some((item,index)=>{
                    return !item.val || regEn.test(item.val) || regCn.test(item.val)
                })
                if(v){
                    this.$alert('输入答案不能为空且不能有符号', '标题名称');
                    return false;

                }
                let f=this.answer.some((item,index)=>{
                    return item.t && !item.group;
                })
                if(f){
                    this.$alert("请选择组号");
                    return false;
                }
                let par={
                    typeNumber:this.classifyValue,
                    question:this.question,
                    answer:this.answer
                }
                fetch('/question/save',par,'post',JSON.parse(getCookie("pcToken")))
                .then((res)=>{
                    if(res.code===0){
                        this.getQuestionList(this.filterClassify)

                    }else{
                        this.$alert(res.msg,"提示")

                    }
                })
                .catch((err)=>{
                    this.$alert("数据加载异常","提示")
                })
                this.question="";
                this.answer=[]

            }
        }
    }
</script>