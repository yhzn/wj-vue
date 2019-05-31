<style lang="scss">
    .ph-test-list{
        width:100%;
        height: 100%;
        font-size: 13px;
        overflow: auto;
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
            a{
                display: block;
                padding:20px 0;
                width:100%;
            }
            .n{
                margin-bottom: 10px;
            }
            h1{
                margin-left: 20px;
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
    <section class="ph-test-list container">
        <section class="bg">
            <section class="info">
                <ul class="clearfix">
                    <li>姓名：张三</li>
                    <li>工号：ZS0152</li>
                    <li>科室：内科</li>
                    <li>岗位：医生</li>
                </ul>
            </section>
            <section class="list">
                <router-link to="/phlayout/phans">
                    <section class="n">
                        <section class="tip">
                            <span>5</span>/<span>18</span>
                        </section>
                        <h1>第一套试卷</h1>

                    </section>
                    <p>有效期限:2019/6/1-----2019/6/25</p>
                </router-link>
            </section>
            <section class="list">
                <router-link to="/phlayout/phans">
                    <section class="n">
                        <section class="tip">
                            <span>5 / 18</span>
                        </section>
                        <h1>第一套试卷</h1>

                    </section>
                    <p>有效期限:2019/6/1-----2019/6/25</p>
                </router-link>
            </section>
            <section>

            </section>

        </section>
    </section>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        mounted () {

        },
        methods:{

        }

    }
</script>