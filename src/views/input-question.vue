<style lang="scss">
.input-question {
    padding:20px;
    .tips{
        padding:10px 0;
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
}
</style>
<template>
    <section class="input-question">
        <section class="tips">录入试题 <span>（1. 试题中填答案部分请用 $ 代替；录入试题后将光标移除，2. 若试题中有 $ ，则可录入答案）</span></section>
        <section class="classify">
            <el-select v-model="classifyValue" placeholder="请选择试题类型">
                <el-option
                        v-for="item in classify"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="dialogVisible = true">创建试题类型</el-button>
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
        <section class="tips">录入答案 <span> （1.答案顺序为 $ 在试题中顺序；2.答题时，若答案位置可互换，请选择相同组号，3. 录入答案不能出现符号）</span></section>
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
                                v-for="m in groupOptions"
                                :key="m.value"
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
        <el-button v-if="answer.length!==0" type="primary" @click="submit">提 交</el-button>
        <el-dialog
                title="创建试题类型"
                :visible.sync="dialogVisible"
                top="20%"
                width="500"
                :before-close="handleClose"
        >
            <el-input v-model="createClassify" placeholder="请输入内容"></el-input>
            <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handlePost">确 定</el-button>
  </span>
        </el-dialog>
    </section>
</template>
<script>
import fetch from '@/config/fetch'
export default {
    data () {
        return {
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
            answer: [],
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
            dialogVisible:false,
            createClassify:"",
        }
    },
    methods:{
        handlePost () {
            console.log(this.createClassify)
            this.dialogVisible = false;
            this.createClassify="";
            this.$alert('提交成功','提示')

        },
        handleClose () {
            this.dialogVisible = false;
            this.createClassify="";
        },
        setAnswerStrLength(item){
            let regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
            if(regEn.test(item.val) || regCn.test(item.val)) {
                this.$alert('输入答案不能为空且不能有符号有符号', '标题名称');
                return true;
            }
            item.len=item.val.length;
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
            let v=this.answer.some((item,index)=>{

                let regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
                    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
                return !item.val || regEn.test(item.val) || regCn.test(item.val)

            })
            if(v){
                this.$alert('输入答案不能为空且不能有符号有符号', '标题名称');
                return false;

            }
            let f=this.answer.some((item,index)=>{
                return item.t && !item.group;
            })
            if(f){
                alert("请选择组号");
                return false;
            }
            let par={
                classify:this.classifyValue,
                question:this.question,
                answer:this.answer
            }
            console.log(par)
            // fetch('http://192.168.17.168:8080/question/saveQuestion',par,"POST")
            //     .then((res)=>{
            //         // this.tempArr[this.cur].state=true;
            //         // this.nextQuestion();
            //         // this.btnLoad=false;
            //     })
            //     .catch((err) => {
            //         // alert("数据加载异常");
            //         // this.btnLoad=false;
            //     })
            this.question="";
            this.answer=[]

        }
    }
}
</script>