<style lang="scss">
    .sign{
        position: relative;
        width:100%;
        height:100%;
        background:url("../assets/image/bg.png") no-repeat;
        background-size: 100% 100%;
        .b{
            position: absolute;
            top:50%;
            left: 50%;
            width:800px;
            height:500px;
            transform: translate(-50%,-50%);
            h1{
                margin-bottom: 10px;
                font-size: 36px;
                color:#5a73f1;
                text-align: center;
                span{
                    color:#f0a027;
                }
            }
            button{
                height: 35px;
                width: 100%;
                border: none;
                border-radius: 5px;
                color: #ffffff;
                background: linear-gradient(to right,#5ecefc,#5a44e7);
            }
        }
        .sign-form{
            background:url("../assets/image/com.png") no-repeat 30px center,url("../assets/image/sub-bg.png") no-repeat;
            background-color: #ffffff;
            background-size: 300px 300px,60% 100%;
            box-shadow: 0 0 2px #cccccc;
        }
        .register{
            background:#ffffff;
            h1{
                padding-top: 16px;
                margin-bottom: 10px;
                height: 100px;
                line-height: 100px;
            }
            ul{
                width:39%;
                margin: 0 auto;
            }
            .selected{
                width:100%;
                input{
                    width:100%;
                }
                .el-input__suffix-inner{
                    position: absolute;
                    top:50%;
                    right:0;
                    transform: translateY(-50%);
                }
            }
        }
        .sign-in{
            float: right;
            padding-top:122px;
            margin-right:30px;
            width:36%;
            .title{
                margin-bottom: 10px;
                color:#f27a3d;
                text-align: center;
            }
            li a:last-child{
                float: right;
            }


        }
        input{
            padding-left:6px;
            width:calc(100% - 6px);
            height:32px;
            border:1px solid #dcdcdc;
            border-radius: 5px;
        }
        .get-code{
            display: flex;
            border:1px solid #dcdcdc;
            border-radius: 5px;
            input{
                flex-grow: 1;
                border:none;
            }
            span{
                display: inline-block;
                height: 32px;
                width: 150px;
                cursor: pointer;
                line-height: 32px;
                color:#3281ff;
                text-align: center;
            }
        }
        ul li p{
            font-size: 12px;
            height:20px;
            line-height: 20px;
            color:#ff0000;
        }
    }
</style>
<template>
    <section class="sign">
        <section class="b sign-form" v-if="!showPage">
            <section class="sign-in">
                <h1>考试管理系统</h1>
                <ul>
                    <li>
                        <input type="text" name="user" v-model.trim="user" placeholder="请输入用户名">
                        <p>{{signInRules.user.tips}}</p>
                    </li>
                    <li>
                        <input type="password" name="password" v-model.trim="password" placeholder="请输入密码">
                        <p>{{signInRules.password.tips}}</p>
                    </li>
                    <li>
                        <button @click="signIn">马上登录</button>
                        <p></p>
                    </li>
                    <li>
                        <router-link to="/"></router-link>
                        <router-link to="/resetPassword">忘记密码</router-link>
                    </li>
                </ul>
            </section>
        </section>
        <section class="b register" v-if="showPage==='resetPassword'">
            <h1>考试管理系统<span>密码重置</span></h1>
            <ul>
                <li>
                    <input type="text" name="user" v-model.trim="user" placeholder="请输入用户名">
                    <p>{{v.user.tips}}</p>
                </li>
                <li>
                    <input type="text" name="phoneNum" v-model.trim="phoneNum" placeholder="请输入手机号">
                    <p>{{v.phoneNum.tips}}</p>
                </li>
                <li>
                    <section class="get-code">
                        <input type="text" name="code" v-model.trim="code" placeholder="请输入验证码">
                        <span @click="getCode">{{btnText}}</span>
                    </section>
                    <p>{{v.code.tips}}</p>
                </li>
                <li>
                    <input type="password" name="password" v-model.trim="password" placeholder="请输入新密码">
                    <p>{{v.password.tips}}</p>
                </li>
                <li>
                    <input type="password" name="surePassword" v-model.trim="surePassword" placeholder="请确认密码">
                    <p>{{v.surePassword.tips}}</p>
                </li>
                <li>
                    <button @click="submit"> 确认修改</button>
                </li>
            </ul>
        </section>
    </section>
</template>
<script>
    import {validate} from "@/validate/validator";
    import {getCookie,setCookie,clone,countDown} from "../tool/tool";
    import fetch from '@/config/fetch'
    let signInRules={
        user:{
            required:true,
            input:'user',
            name:'用户名',
            tips:""
        },
        password:{
            required:true,
            password:true,
            input:'password',
            name:'密码',
            tips:''
        }

    }
    let v_1={
        user:{
            required:true,
            input:'user',
            name:'用户名',
            tips:""
        },
        phoneNum:{
            required:true,
            mobile:true,    // 是否校验数据格式
            input:'phoneNum',
            name:'手机号码',
            tips:''
        },
        code:{
            required:true,
            input:'code',
            name:'验证码',
            tips:''
        },
        password:{
            required:true,
            password:true,
            input:'password',
            name:'密码',
            tips:''
        },
        surePassword:{
            depends:['password','surePassword'],
            required:({password,surePassword})=>{
                return !!surePassword && password===surePassword
            },
            input:'surePassword',
            name:'验证密码',
            customizeTip:true,
            tipsText:({password,surePassword})=>{
                if(!surePassword){
                    return '请确认新密码'
                }
                if(password!==surePassword){
                    return '两次密码不一致，请重新确认'
                }
            },
            tips:'',
        }
    }
    let v_2={
        user:{
            required:true,
            input:'user',
            name:'用户名',
            tips:""
        },
        phoneNum:{
            required:true,
            mobile:true,    // 是否校验数据格式
            input:'phoneNum',
            name:'手机号码',
            tips:''
        },
        code:{
            input:'code',
            name:'验证码',
            tips:''
        },
        password:{
            input:'password',
            name:'密码',
            tips:''
        },
        surePassword:{
            input:'surePassword',
            name:'验证密码',
            customizeTip:true,
            tips:'',
        }
    }

    export default {
        data () {
            return {
                showPage:this.$route.params.page,
                user:'',
                phoneNum:'',
                code:'',
                password:'',
                surePassword:'',
                v:clone(v_2),
                signInRules:clone(signInRules),
                btnText:"获取验证码",
            }
        },
        watch:{
            $route:{
                handler () {
                    this.showPage=this.$route.params.page;
                    this.user='';
                    this.phoneNum='';
                    this.code='';
                    this.password='';
                    this.surePassword='';
                    this.resetV(this.$route.params.page);
                }
            }
        },
        mounted () {
            this.resetV(this.$route.params.page);
        },
        methods:{
            resetV (page) {
                if(!page){
                    let userInfo=JSON.parse(getCookie('userInfo'));
                    console.log(userInfo)
                    if(!!userInfo){
                        this.user=userInfo.user;
                        this.password=userInfo.password;
                    }
                    this.signInRules=clone(signInRules);
                }else{
                    this.v=clone(v_1);
                }
            },
            getCode () {
                this.v=clone(v_2)
                if(!validate({ctx:this,rules:this.v})){
                    return false;
                }
                countDown(this,'btnText',()=>{
                    fetch("/verifyCode/sendCode",{
                        account:this.user,
                        phoneNumber:this.phoneNum
                    },"post")
                    .then((res)=>{
                        if(res.code!==0){
                            this.$alert(res.msg,"提示重复")
                        }
                    })
                    .catch(()=>{
                        this.$alert("短信发送异常","提示")
                    })
                })
            },
            signIn () {
                let par={
                    account:this.user,
                    password:this.password,
                }
                if(!validate({ctx:this,rules:this.signInRules})){
                    return false;
                }
                fetch("/login/getUserToken",par,"post")
                    .then((res)=>{
                        if(res.code===0){
                            setCookie('userInfo',JSON.stringify({
                                user:this.user,
                                password:this.password
                            }),90)
                            setCookie("pcToken",JSON.stringify(res.data))
                            this.$router.push('/layout/home');
                        }else{
                            this.$alert(res.msg,"提示");
                        }
                    })
                    .catch(()=>{
                        this.$alert("数据加载异常","提示");
                    })


            },
            submit () {
                this.v=clone(v_1);
                if(!validate({ctx:this,rules:this.v})){
                    return false;
                }
                fetch("/verifyCode/updatePassword",{
                    account:this.user,
                    phoneNumber:this.phoneNum,
                    verifyCode:this.code,
                    newPassword:this.password,
                    confirmPassword:this.surePassword
                },'post')
                    .then((res)=>{
                        if(res.code===0){
                            this.$confirm('密码修改成功，返回登录界面', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'success'
                            }).then(() => {
                                this.$router.go(-1)
                            });

                        }else{
                            this.$alert(res.msg,"提示");
                        }
                    })
                    .catch(()=>{
                        this.$alert("数据加载异常","提示");
                    })
            }
        }
    }
</script>