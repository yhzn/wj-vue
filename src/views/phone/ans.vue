<style lang="scss">
   .ans{
       background:#ffffff;
       .ans-color{
           color:#ff0000;
       }
       .questions{
           padding: 0 20px;
           font-size: 18px;
           line-height: 32px;
           height:calc(100% - 39px);
           overflow-x: hidden;
           overflow-y: auto;
           .que{
               padding:20px 0;
               margin-bottom:80px;
               .que-str{
                   input{
                       position: relative;
                       margin: 2px 3px 0;
                       padding:2px;
                       top:-2px;
                       font-size: 15px;
                       width:20px;
                       height:16px;
                       line-height: 16px;
                       text-align: center;
                       border:1px solid #000000;
                   }

               }
           }
           .success{
               background: url("../../assets/image/success.png") no-repeat center 30px;
               background-size:100% 86px;
               ul{
                   padding-top:120px;
                   font-size: 15px;
                   margin: 0 30px 30px;
                   li{
                       height:28px;
                       line-height: 28px;
                       &:first-child{
                           text-align: center;
                       }
                   }
               }
               .suc-btn{
                   background:url("../../assets/image/sign-btn.png") no-repeat;
                   background-size: 100% 100%;
                   border:none;
               }
           }
           .checked{
                   padding-top:20px;
               .list{
                   margin-bottom: 10px;
               }
               button a{
                   color:#ffffff;
               }
           }
       }
       button{
           width:100%;
       }
       footer{
          padding:0 20px;
          height:38px;
          line-height: 38px;
          font-size: 18px;
          text-align: right;
          border-top:1px solid #b6b6b6;
      }
   }
</style>
<template>
    <section class="ans ph-container">
        <section class="questions">
            <section v-if="page==='q'">
                <section class="que">
                    <section class="que-str" v-html="domStr"></section>
                </section>
                <el-button type="primary" round :loading="btnLoad" @click="postAns">下一题</el-button>
            </section>
            <section class="checked" v-else-if="page==='c'">
                <section v-html="completeDom"></section>
                <!--<el-button type="primary" round><a href="javascript:void(0);">导 出</a></el-button>-->
            </section>
            <section class="success" v-else>
                <ul>
                    <li>本次共计{{allQuestion}}道题</li>
                    <li>开始答题时间：{{startAnsTime}}</li>
                    <li>结束答题时间：{{endAnsTime}}</li>
                    <li>恭喜挑战成功</li>
                </ul>
                <el-button class="suc-btn" type="primary"  :loading="btnLoad" @click="()=>{this.$router.go(-1)}">返回试卷列表</el-button>
            </section>
        </section>
        <footer>
            {{cur+1}} / {{allQuestion}}
        </footer>
    </section>
</template>
<script>
    import fetch from '@/config/fetch'
    import $ from 'jquery'
    import {trim,getUrlParam,getCookie} from "../../tool/tool";

    export default {
    data () {
        return {
            domStr:"",
            completeDom:"",
            tempArr:[],
            allQuestion:0,
            cur:0,
            page:'q',
            btnLoad:false,
            paperId: getUrlParam('id'),
            startAnsTime:"",
            endAnsTime:"",
        }
    },
    computed:{
        questionData:{
            get(){
                return this.tempArr[this.cur];
            },
            set(val){
                val.answer={
                    ansArr:val.question.split('*'),
                    input:[]
                }
                for(let i=0;i<val.len.length;i++){
                    let o={
                        group:i,
                        val:[]
                    }
                    for(let k=0;k<val.len[i];k++){
                        o.val.push("")
                    }
                    val.answer.input.push(o)
                }
            }
        },
    },
    mounted () {
        this.getExamResult();
        this.getData();
        this.setInput();
    },
    methods:{
        initQuestionIndex () {
            let index=0;
            let f=this.tempArr.every((item,i)=>{
                index=i;
                return !!item.state;
            });
            this.cur=index;
            if(f){
                this.page='s';
                return false;
            }
            if(index > this.allQuestion-1){
                this.page='s';
                return false;
            }
            this.domStr=this.comPoseDom(this.tempArr[this.cur],this.cur);
        },
        nextQuestion () {
            if(this.cur>=this.allQuestion-1){
                this.page='s';
                this.getExamResult();
                return false;
            }
            this.domStr=this.comPoseDom(this.tempArr[++this.cur],this.cur);

        },
        // 获取结果
        getExamResult () {
            fetch('/answer/getExamResult',{examId:this.paperId},'post',JSON.parse(getCookie('phToken')))
                .then((res)=>{
                    if(res.code===0){
                        this.startAnsTime=res.data.startTime;
                        this.endAnsTime=res.data.endTime;
                    }else{
                        this.$alert(res.msg,"提示")
                    }
                })
                .catch((err)=>{
                    this.$alert("数据加载异常",'提示')
                })
        },
        // 获取问卷
        getData () {
            fetch('/question/listForMobile',{examNumber:this.paperId},'post',JSON.parse(getCookie('phToken')))
                .then((res)=>{
                    if(res.code===0){
                        this.tempArr=res.data;
                        this.allQuestion=this.tempArr.length;
                        this.initQuestionIndex();

                    }else{
                        alert(res.msg);
                    }
                })
                .catch((err) => {
                    alert("数据加载异常");
                })
        },
        // 提交答案
        postAns () {
            this.btnLoad=true;
            let postData=this.tempArr[this.cur];
            fetch('/answer/judgeAnswer',
                {
                    questionId:postData.id,
                    examId:this.paperId,
                    answer:postData.answer.input,
                    isLast:(this.tempArr.length===this.cur+1)

                }, 'post', JSON.parse(getCookie('phToken')))
                .then((res)=>{
                    this.btnLoad=false;
                    if(res.code===0){
                        this.tempArr[this.cur].state=true;
                        this.nextQuestion();
                    }else{
                        alert(res.msg)
                    }

                })
                .catch((err) => {
                    alert("数据加载异常");
                    this.btnLoad=false;
                })
        },
        comPoseDom (val,s=0,f=true) {
            let domStr=(s+1)+". ";
            let questionArr=val.question.split('$');
            if(f){
                val.answer={
                    questionArr,
                    input:[],
                }
            }
            for(let i=0;i<questionArr.length;i++){
                domStr+=questionArr[i];
                if(i>val.len.length-1){
                    return domStr;
                }
                if(f){
                    val.answer.input.push({
                        groupId:val.len[i].groupId,
                        val:""
                    });
                    for(let k=0;k<val.len[i].l;k++){
                        domStr+=`<input name="${i}-${val.len[i].l}" data-value="${this.cur}-${i}-${k}">`;
                    }
                }else{
                    domStr+=`<span class="ans-color">${val.answer.input[i].val}</span>`;

                }
            }
        },
        setAns () {
            let val=this.tempArr;
            let str=""
            this.page='c';
            for(let i=0;i<val.length;i++){
                str+=`<section class="list">${this.comPoseDom(val[i],i,false)}</section>`
            }
            this.completeDom=str;
        },
        setInput () {
            let _this=this;
            let queStr=$('.que-str');
            let u = navigator.userAgent, app = navigator.appVersion;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            let backFlag=false;
            queStr.on('keydown','input',function(e){
                let ev=e||window.ev;
                let index=$(this).index();
                if(ev.keyCode===8 && index!==0 && !trim($(this).val())){
                    $('input').eq(index-1).focus();
                    backFlag=true;
                }
            })
            if (isAndroid) {
                //这个是安卓操作系统
                queStr.on('keyup','input',function(e){
                    let ev=e||window.ev;
                    if(ev.keyCode!==229){
                        return false;
                    }
                    _this.inputData(this);
                })
            } else {
                queStr.on('keyup','input',function(e){
                    let ev=e||window.ev;
                    if(ev.keyCode!==8){
                        backFlag=false;
                    }
                })
                queStr.on('change','input',function(e){
                    if(backFlag){
                        return false;
                    }
                    _this.inputData(this);
                })
            }


        },
        inputData (ctx) {
            let inputDom=$('input');
            let index=$(ctx).index();
            let name=$(ctx).attr('name');
            let getGroupInput=$('input[name='+name+']');
            let praArr=$(ctx).attr("data-value").split("-");
            let start=parseInt(praArr[2]);
            let strLength=name.split("-")[1];
            let val=trim($(ctx).val());
            let valArr=val.substr(0,strLength-start).split("");
            for(let i=0;i<valArr.length;i++){
                getGroupInput.eq(start+i).val(valArr[i])
            }
            this.tempArr[praArr[0]].answer.input[praArr[1]].val="";
            for(let v=0;v<getGroupInput.length;v++){
                this.tempArr[praArr[0]].answer.input[praArr[1]].val+=getGroupInput.eq(v).val();
            }
            if(index+valArr.length>=inputDom.length){
                inputDom.eq(index).blur();
                return false;
            }
            let d=-1;
            for(let j=0;j<inputDom.length;j++){
                if(!inputDom.eq(j).val()){
                    d=j;
                    break;
                }
            }
            if(d!==-1){
                inputDom.eq(d).focus();
            }else{
                inputDom.blur();
            }

        },

    }
}
</script>