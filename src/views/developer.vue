<style lang="scss">
   .developer{
       width: 100%;
       height:100%;
       font-size: 16px;
       .head{
           margin: 0 20px;
           height:60px;
           line-height: 60px;
           text-align: center;
           background:url('../assets/image/developer.png') no-repeat center;
           background-size: 100% 38px;

       }
       .list-con{
           padding-top:10px;
           margin: 0 20px;
           height:calc(100% - 80px);
           background: url("../assets/image/name-list.png") no-repeat;
           background-size: 100% 100%;
           .s{
               margin: 0 20px;
               height:calc(100% - 52px);
               overflow: auto;
           }
           footer{
               margin: 0 20px;
               height:52px;
               line-height: 52px;
               a{
                   color:#2d59de;
               }
           }
           .list{
               margin-bottom: 20px;
               h3{
                   margin-bottom: 10px;
               }
               ul{
                   margin-left: 10px;
               }
               li{
                   display: flex;
                   align-items: center;
                   margin-bottom: 10px;
                   p:first-child{
                       width:80px;
                   }
                   p:last-child{
                       flex-grow: 1;
                   }
               }
           }
       }
   }
</style>
<template>
    <section class="developer">
         <section class="head">
             技术支持人员名单
         </section>
        <section class="list-con">
            <section class="s">
                <section class="list" v-for="(items,index) in data" :key="index">
                    <h3>发布日期:{{items.issueData}}</h3>
                    <ul>
                        <li v-for="(item,i) in items.list" :key="i">
                            <p>{{item.pos}}</p>
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                </section>
            </section>
            <footer>
                问题联系人：<a href="tel:38804518">38804518</a> 转 <a href="tel:38301">38301</a>
            </footer>
        </section>
    </section>
</template>
<script>
    import data from '../developer'
    export default {
        data () {
           return {
              data
           }
        }
    }
</script>