<style lang="scss">
    .layout{
        height:100%;
        width:100%;
        min-width: 1200px;
        /*background: url("../assets/image/l-bg.png") no-repeat;*/
        /*background-size: 100% 100%;*/
        .header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height:58px;
            color:#ffffff;
            background:
                    url("../assets/image/layout-logo.png") no-repeat 16px center,
                    url("../assets/image/header-bg.png") no-repeat;
            background-size:196px 52px,100% 100%;
            p{
                margin-left: 230px;
                font-size: 18px;
                font-weight: bold;
            }
            ul{
                display: flex;
                margin-right:10px;
                font-size: 15px;
                li{
                    height:18px;
                    line-height: 18px;
                    &:first-child{
                        margin-right: 10px;
                        padding-left:26px;
                        background: url("../assets/image/user.png") no-repeat;
                    }
                    &:last-child{
                        position: relative;
                        width:38px;
                        cursor: pointer;
                        background: url("../assets/image/logout.png") no-repeat center;
                        &:before{
                            position: absolute;
                            display: block;
                            content: " ";
                            height:15px;
                            top:50%;
                            transform: translateY(-50%);
                            border-left: 1px solid #ffffff;
                        }
                    }
                }
            }
        }
        .main{
            height:calc(100% - 88px);
            overflow: hidden;
            .menu{
                float: left;
                height:100%;
                width:220px;
                background: url("../assets/image/menu-bg.png") no-repeat center bottom;
                background-size: 100% 180px;
                overflow: auto;
                .el-menu{
                    min-height:100%;
                    text-align: left;
                    background: none;
                }
            }
            .container{
                margin-left:220px;
                height:100%;
                background: rgba(255,255,255,0.6);
                overflow: auto;
            }
        }
        .footer{
            height:30px;
            line-height: 30px;
            text-align: center;
            background: rgba(155,155,155,0.3);

        }
    }
</style>
<template>
    <section class="layout">
        <header class="header">
            <p>
                考试管理系统
            </p>
            <ul>
                <li>{{admin}}</li>
                <li @click="() => {this.$router.push('/')}"></li>
            </ul>
        </header>
        <section class="main">
            <section class="menu">
                <el-menu
                        :default-active="menuHighlight"
                        class="el-menu"
                        :unique-opened="true"
                        :router="true"
                        @select="handleSelect"
                        @open="handleOpen"
                        @close="handleClose">
                    <el-menu-item index="home">
                        <!--<i class="el-icon-s-home"></i>-->
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="inputquestion">
                        <span slot="title">试题维护</span>
                    </el-menu-item>
                    <el-menu-item index="createpapers">
                        <span slot="title">试卷维护</span>
                    </el-menu-item>
                    <el-menu-item index="testresult">
                        <span slot="title">考试查询</span>
                    </el-menu-item>
                    <el-menu-item index="personnelmanagement">
                        <span slot="title">人员维护</span>
                    </el-menu-item>
                    <!--<el-submenu index="1">-->
                        <!--<template slot="title">-->
                            <!--&lt;!&ndash;<i class="el-icon-location"></i>&ndash;&gt;-->
                            <!--<span>业务处理</span>-->
                        <!--</template>-->
                        <!--&lt;!&ndash;<el-menu-item-group>&ndash;&gt;-->
                        <!--<el-menu-item index="home">病区</el-menu-item>-->
                        <!--<el-menu-item index="about">临床试题类型</el-menu-item>-->
                        <!--<el-menu-item index="">门诊收费处</el-menu-item>-->
                        <!--<el-menu-item index="">医技试题类型</el-menu-item>-->
                        <!--<el-menu-item index="">手术室</el-menu-item>-->
                        <!--&lt;!&ndash;</el-menu-item-group>&ndash;&gt;-->
                    <!--</el-submenu>-->
                    <!--<el-submenu index="2">-->
                        <!--<template slot="title">-->
                            <!--&lt;!&ndash;<i class="el-icon-location"></i>&ndash;&gt;-->
                            <!--<span>条目维护设置</span>-->
                        <!--</template>-->
                        <!--&lt;!&ndash;<el-menu-item-group>&ndash;&gt;-->
                        <!--<el-menu-item index="">设置1</el-menu-item>-->
                        <!--<el-menu-item index="">设置2</el-menu-item>-->
                        <!--&lt;!&ndash;</el-menu-item-group>&ndash;&gt;-->
                    <!--</el-submenu>-->
                    <!--<el-menu-item index="2">-->
                    <!--<i class="el-icon-menu"></i>-->
                    <!--<span slot="title">导航二</span>-->
                    <!--</el-menu-item>-->
                    <!--<el-menu-item index="3" disabled>-->
                    <!--<i class="el-icon-document"></i>-->
                    <!--<span slot="title">导航三</span>-->
                    <!--</el-menu-item>-->
                    <!--<el-menu-item index="4">-->
                    <!--<i class="el-icon-setting"></i>-->
                    <!--<span slot="title">导航四</span>-->
                    <!--</el-menu-item>-->
                </el-menu>
            </section>
            <section class="container">
                <router-view />
            </section>
        </section>
        <footer class="footer">
            上海延华智能科技（集团）股份有限公司
        </footer>
    </section>
</template>
<script>
    import {mapMutations,mapActions} from 'vuex'
    import {getCookie} from "../tool/tool";
    import fetch from '@/config/fetch'
    export default {
        data () {
            return {
                admin:JSON.parse(getCookie('userInfo')).user,
                title:"",
                menuHighlight:window.location.hash.replace("#/layout/","").replace("?","/").split("/")[0],
            }
        },
        mounted () {
            // console.log(123)
            this.getDepartments();
            this.getQuestionsType();
            // this.getPapers();
        },
        methods:{
            // ...mapMutations(['setDepartments']),
            ...mapActions(['setQuestionsType','setDepartments','setPapers']),
            handleOpen () {},
            handleClose () {},
            handleSelect (par) {
                // console.log(par)
            },
            getQuestionsType () {
                fetch("/question/questionTypeList",{},'get',JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.setQuestionsType(res.data);

                        }else{
                            this.$alert(res.msg)
                        }
                    })

                // this.$store.commit('setDepartments',data)
                // this.$store.dispatch('setDepartments',data)
                // this.setQuestionsType(data);
            },
            getDepartments () {
                let data=[
                    // {value:"1",label:"科室1"},
                    // {value:"2",label:"科室2"},
                    // {value:"3",label:"科室3"},
                    // {value:"4",label:"科室4"},
                    // {value:"5",label:"科室5"},
                    // {value:"6",label:"科室6"}
                ]
                this.setDepartments(data);
            },


        }
    }
</script>
