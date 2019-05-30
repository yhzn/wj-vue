<style lang="scss">
   .ph-sign{
       .input{
           margin:0 30px 20px;
           padding-top:130px;
           border:1px solid #ff0000;

           ul{
               padding:30px 0;
               border:1px solid gray;
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
               width:230px;
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
                // this.$router.push('/layout/home');

            }
        }
    }
</script>