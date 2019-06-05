<style lang="scss">
   .ph-sign{
       background:url('../../assets/image/ph-bg.png') no-repeat;
       background-size:100% 100%;
       overflow: hidden;
       .input{
           margin:0 30px 20px;
           padding-top:226px;
           background: url("../../assets/image/txt.png") no-repeat center 20px;
           ul{
               padding:20px 0 10px;
               border:1px solid #fffffd;
               border-radius: 6px;
               background:rgba(121,156,246,0.6);
               li{
                   margin: 0 30px;
                   input{
                       padding-left:6px;
                       height:30px;
                       width:calc(100% - 6px);
                       border:1px solid #aac0fa;
                       border-radius: 5px;
                   }
                   p{
                       height:18px;
                       line-height: 18px;
                       color:#ff0000;
                   }
               }
           }
       }
       .btn{
           text-align: center;
           .submit{
               width:320px;
               color:#000000;
               background:url("../../assets/image/sign-btn.png") no-repeat;
               background-size: 100% 100%;
           }
       }
       .dis{
           height:calc(100% - 18px);
           overflow-y: auto;
       }
       footer{
           /*position: absolute;*/
           font-size: 13px;
           width:100%;
           /*bottom:10px;*/
           color:#ffffff;
           text-align: center;

           a{
               margin-left: 10px;
               color:#3267c5;
               text-decoration: underline;
           }

       }
   }
</style>
<template>
    <section class="ph-sign ph-container">
        <section class="dis">
            <section class="input">
                <ul>
                    <li>
                        <input type="text" name="userNum" v-model.trim="userNum" placeholder="请输入工号">
                        <p class="err">{{v.userNum.tips}}</p>
                    </li>
                    <li>
                        <input type="text" name="user" v-model.trim="user" placeholder="请输入姓名">
                        <p class="err">{{v.user.tips}}</p>
                    </li>
                </ul>
            </section>
            <section class="btn">
                <el-button class="submit" type="primary" @click="submit">登 录</el-button>
            </section>

        </section>
        <footer>
            上海延华智能科技（集团）股份有限公司 <router-link to="/phlayout/developer">技术支持</router-link>
        </footer>
    </section>
</template>
<script>
    import {validate} from "@/validate/validator";
    import {getCookie,setCookie} from "@/tool/tool";
    import fetch from '@/config/fetch'
    import {baseUrl} from '@/config/env'
    export default {
        data () {
            return {
                userNum:"",
                user:"",
               v:{
                   userNum:{
                       required:true,
                       input:'userNum',
                       name:"工号",
                       tips:''
                   },
                   user:{
                       required:true,
                       input:'user',
                       name:"姓名",
                       tips:""
                   }
               }
            }
        },
        mounted () {
           let userInfo=JSON.parse(getCookie('phUserInfo'));
           if(!!userInfo){
               this.user=userInfo.user;
               this.userNum=userInfo.userNum;
           }
        },
        methods:{
            submit () {
                let par={
                    staffName:this.user,
                    staffNumber:this.userNum
                }
                if(!validate({ctx:this,rules:this.v})){
                    return false;
                }
                console.log(121212)
                fetch("/login/getStaffToken",par,'POST')
                .then((res)=>{
                     if(res.code===0){
                          setCookie('phUserInfo',JSON.stringify({
                              user:this.user,
                              userNum:this.userNum
                          }));
                          setCookie('phToken',JSON.stringify(res.data));
                          this.$router.push('/phlayout/phtestlist');
                     }else{
                        alert(res.msg,'提示');
                     }

                })
                console.log("校验通过");

            }
        }
    }
</script>