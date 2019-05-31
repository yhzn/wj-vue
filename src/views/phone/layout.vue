<style lang="scss">
   .ph-layout{
       height:100%;
       width: 100%;
       overflow: hidden;
       &>header{
           display: flex;
           align-items: center;
           height:50px;
           font-size: 20px;
           line-height: 51px;
           background: #5786f0;
           color:#ffffff;
           text-align: center;
           i{
               font-size: 28px;
               width: 50px;
           }
           section{
               flex-grow: 1;
               margin-right: 50px;
               text-align: center;
           }
       }
       .ph-layout-container{
           width: 100%;
           height:calc(100% - 50px);
           background: url('../../assets/image/ph-bg2.png') no-repeat;
           background-size: 100% 100%;
           overflow: hidden;
       }
   }
</style>
<template>
    <section class="ph-layout">
        <header>
            <i class="el-icon-arrow-left" @click="back"></i>
            <section>东方医考通</section>
        </header>
        <section class="ph-layout-container">
            <router-view/>
        </section>
    </section>
</template>
<script>
    export default {
        methods:{
            back () {
                this.$router.go(-1)
            }
        }
    }
</script>