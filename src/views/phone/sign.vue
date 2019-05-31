<style lang="scss">
   .ph-sign{
       position: relative;
       background:url('../../assets/image/ph-bg.png') no-repeat;
       background-size:100% 100%;
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
       footer{
           position: absolute;
           font-size: 13px;
           width:100%;
           bottom:10px;
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
        <footer>
            上海延华智能科技（集团）股份有限公司 <router-link to="/phlayout/developer">技术支持</router-link>
        </footer>
    </section>
</template>
<script>
    import {validate} from "../../validate/validator";
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

        },
        methods:{
            submit () {
                console.log(12)
                if(!validate({ctx:this,rules:this.v})){
                    return false;
                }
                console.log("校验通过");
                this.$router.push('/phlayout/phtestlist');

            }
        }
    }
</script>