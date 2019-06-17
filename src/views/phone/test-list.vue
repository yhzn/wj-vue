<style lang="scss">
    .ph-test-list{
        width:100%;
        height: 100%;
        font-size: 13px;
        overflow: hidden;
        .bg{
            padding:20px 0;
            margin: 0 20px;
        }
        .info{
            padding-top:60px;
            margin-bottom:30px;
            background: url("../../assets/image/logo.png") no-repeat center 10px,url("../../assets/image/ph-info.png") no-repeat;
            background-size: 56px 56px, 100% 100%;
            ul{
                margin:20px;
                li{
                    float: left;
                    margin-bottom: 10px;
                    width:50%;
                }
            }
        }
        .list{
            font-size: 15px;
            background: url("../../assets/image/ph-test.png") no-repeat;
            background-size: 100% 100%;
            margin-bottom: 10px;
            &.active{
                background: url("../../assets/image/pass.png") no-repeat right 10px top 8px,url("../../assets/image/ph-test.png") no-repeat;
                background-size: 50px 50px,100% 100%;
            }
            a{
                display: block;
                padding:20px 0;
                width:100%;
            }
            .n{
                margin-bottom: 20px;
            }
            h1{
                margin: 0 70px;
                font-size: 18px;
                text-align: center;
            }
            .tip{
                float: right;
                margin-right: 20px;
                width:50px;
                text-align: right;
            }
            p{
                color:#e5a582;
                text-align: center;
            }
        }
    }
</style>
<template>
    <section class="ph-test-list container" ref="scroll">
        <section class="bg">
            <section class="info">
                <ul class="clearfix">
                    <li>姓名：{{data.info.name}}</li>
                    <li>工号：{{data.info.num}}</li>
                    <li>科室：{{data.info.deptName}}</li>
                    <li>岗位：{{data.info.job}}</li>
                </ul>
            </section>
            <section :class="['list',{active:item.passState}]" v-for="(item,index) in data.list" :key="index">
                <router-link :to="{path:`/phlayout/phans?id=${item.examNumber}`}">
                    <section class="n">
                        <section class="tip">
                            <span v-if="!item.passState ">{{item.answeredQuestionCount}} / {{item.questionCount}}</span>
                        </section>
                        <h1>{{item.examName}}</h1>

                    </section>
                    <p>有效期限:{{item.effectiveBeginTime}}------{{item.effectiveEndTime}}</p>
                </router-link>
            </section>

        </section>
    </section>
</template>
<script>
    import {mapState,mapActions} from 'vuex'
    import BScroll from 'better-scroll'
    import fetch from '@/config/fetch'
    import {getCookie} from "@/tool/tool";
    export default {
        data () {
            return {
               data:{
                   info:{},
                   list:[]
               }
            }
        },
        computed:{
            ...mapState(['testListScroll']),
        },
        mounted () {
            this.initData(this.testListScroll);
            this.getData ();
        },
        methods:{
            ...mapActions(['setTestListScroll']),
            async initData(start=0){
                this.$nextTick(()=>{
                    new BScroll(this.$refs.scroll,{
                        scrollY:true,
                        click:true,
                        startY:start,
                        probeType:3,
                    }).on('scroll',(pos)=>{
                        if(!isNaN(pos.y)){
                            this.setTestListScroll(parseInt(pos.y))
                        }
                    })
                })
            },
            getData () {
                fetch('/examination/listForMobile',{},'POST',JSON.parse(getCookie('phToken')))
                .then((res)=>{
                      if(res.code===0){
                            this.data={
                                info:{
                                    name:res.data.staffName,
                                    num:res.data.staffNumber,
                                    deptName:res.data.deptName,
                                    job:res.data.jobTitle,
                                },
                                list: res.data.examMains
                            }
                      }else{
                          alert(res.msg);
                      }
                })
                .catch((err)=>{
                        alert("数据加载异常");
                })

            }
        }

    }
</script>