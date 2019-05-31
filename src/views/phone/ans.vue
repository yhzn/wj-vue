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
                   color: #000000;
                   border: none;
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
                </section>
            <section class="success" v-else>
                <ul>
                    <li>本次共计18道题</li>
                    <li>开始：2019-05-12 10:30</li>
                    <li>结束：2019-05-12 10:30</li>
                    <li>恭喜挑战成功</li>
                </ul>
                <el-button class="suc-btn" type="primary"  :loading="btnLoad" @click="setAns">查看已完成答题</el-button>
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
    import {trim} from "../../tool/tool";

    export default {
    data () {
        return {
            domStr:"",
            completeDom:"",
            tempArr:[
                {
                    "id":1,
                    "question":"我*是*谁,你能回答*不",
                    "answer":{},
                    "len":[1,1,3]
                },
                {
                    "id":1,
                    "question":"我*是*谁,你能回答*不",
                    "answer":{},
                    "len":[1,2,1]
                },
            ],
            allQuestion:0,
            cur:0,
            page:'q',
            btnLoad:false,
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
            if(f){
                this.page='s';
                return false;
            }
            this.cur=index;
            if(index > this.allQuestion-1){
                this.page='s';
                return false;
            }
            this.domStr=this.comPoseDom(this.tempArr[this.cur],this.cur);
        },
        nextQuestion () {
            if(this.cur>=this.allQuestion-1){
                this.page='s';
                return false;
            }
            this.domStr=this.comPoseDom(this.tempArr[++this.cur],this.cur);

        },
        // 提交答案
        postAns () {
            console.log(this.tempArr[this.cur])
            this.btnLoad=true;
            fetch('data.json')
                .then((res)=>{
                    this.tempArr[this.cur].state=true;
                    this.nextQuestion();
                    this.btnLoad=false;
                })
                .catch((err) => {
                    alert("数据加载异常");
                    this.btnLoad=false;
                })
        },
        comPoseDom (val,s=0,f=true) {
            let domStr=(s+1)+". ";
            let questionArr=val.question.split('*');
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
                        group:val.len[i].group,
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
            queStr.on('keydown','input',function(e){
                let ev=e||window.ev;
                let index=$(this).index();
                if(ev.keyCode===8 && index!==0 && !trim($(this).val())){
                    $('input').eq(index-1).focus();
                }
            })
            queStr.on('keyup','input',function(e){
                let ev=e||window.ev;
                let inputDom=$('input');
                let index=$(this).index();
                if(ev.keyCode!==229){
                    return false;
                }
                let name=$(this).attr('name');
                let getGroupInput=$('input[name='+name+']');
                let praArr=$(this).attr("data-value").split("-");
                let start=parseInt(praArr[2]);
                let strLength=name.split("-")[1];
                let val=trim($(this).val());
                let valArr=val.substr(0,strLength-start).split("");
                for(let i=0;i<valArr.length;i++){
                    getGroupInput.eq(start+i).val(valArr[i])
                }
                for(let v=0;v<getGroupInput.length;v++){
                     _this.tempArr[praArr[0]].answer.input[praArr[1]].val+=getGroupInput.eq(v).val();
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

            })

        },
        // 获取问卷
        getData () {
            fetch('data.json',{id:1,user:"user"})
                .then((res)=>{
                    this.tempArr=res;
                    this.allQuestion=this.tempArr.length;
                    this.initQuestionIndex();
                })
                .catch((err) => {
                    alert("数据加载异常");
                })
        },

    }
}
</script>