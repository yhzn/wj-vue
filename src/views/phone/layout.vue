<style lang="scss">
   .ph-layout{
       height:100%;
       width: 100%;
       overflow: hidden;
       &>header{
           height:50px;
           font-size: 20px;
           line-height: 51px;
           background: #42b983;
           color:#ffffff;
           text-align: center;
       }
       .ph-layout-container{
           width: 100%;
           height:calc(100% - 50px);
           overflow-x: hidden;
           overflow-y: auto;
       }
   }
</style>
<template>
    <section class="ph-layout">
        <header>问卷调查</header>
        <section class="ph-layout-container">
            <router-view/>
        </section>
    </section>
</template>
<script>

</script>