<style lang="scss">
  .home{
    position: relative;
    height:100%;
    width:100%;
    .wel{
      position: absolute;
      width:500px;
      height:360px;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      background: url("../assets/image/home-bg.png") no-repeat center 10px;
      background-size: 500px 251px;
      p{
        position: absolute;
        width: 100%;
        bottom:20px;
        font-size: 18px;
        text-align: center;
        span{
          color: #409EFF;
        }
      }

    }

  }
</style>
<template>
  <section class="home">
     <section class="wel">
       <p>WELCOM <span>欢迎进入东方医院考试管理系统</span></p>
     </section>
  </section>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  }
}
</script>
