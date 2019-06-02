<style lang="scss">
    .personnel-management{
        height:100%;
        overflow: hidden;
       .search-bar{
           padding:20px 20px 0;
           height:50px;
           li{
               float: left;
               margin-right: 10px;
           }
           .input{
               width:160px;
           }
           .btn-search{
               float: right;
               margin-left: 10px;
           }
       }
        .personnel-tab{
            height:calc(100% - 70px);
            overflow: auto;
        }
    }
</style>
<template>
    <section class="personnel-management">
        <section class="search-bar">
            <el-button type="primary" class="btn-search" icon="el-icon-search" @click="search">搜 索</el-button>
            <el-button type="primary" class="btn-search">同步名单</el-button>

            <ul class="clearfix">
               <li>
                   <el-input v-model="name" class="input" placeholder="请输入姓名"></el-input>
               </li>
               <li>
                   <el-select v-model="department" class="input" placeholder="请选择科室">
                       <el-option
                               v-for="item in departmentOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </li>
               <li>
                   <el-select v-model="job" class="input" placeholder="请选择岗位">
                       <el-option
                               v-for="item in jobOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </li>
               <li>
                   <el-select v-model="admin" class="input" placeholder="请选择管理状态">
                       <el-option
                               v-for="item in adminOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </li>
           </ul>

        </section>
        <section class="personnel-tab">
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="num"
                        label="工号"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="department"
                        label="科室"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="job"
                        label="岗位"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="在职状态"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="admin"
                        label="设为管理员"
                        align="center"
                >
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.admin"
                                :width=50
                                active-text="是"
                                inactive-text="否"
                                @change="changeState(scope.row)"
                        >
                        </el-switch>
                    </template>

                </el-table-column>
            </el-table>
        </section>
    </section>
</template>
<script>
    export default {
        data () {
            return {
               name:'',
               departmentOptions:[],
               department:'',
               jobOptions:[],
               job:'',
               adminOptions:[],
               admin:"",
                tableData: [
                    {
                        num:"001XXB",
                        name: '王小虎',
                        department:"外科",
                        job:"护理",
                        state:"在职",
                        admin:true
                    },
                    {
                        num:"001XXB",
                        name: '王小虎',
                        department:"外科",
                        job:"护理",
                        state:"在职",
                        admin:true
                    },
                    {
                        num:"001XXB",
                        name: '王小虎',
                        department:"外科",
                        job:"护理",
                        state:"在职",
                        admin:true
                    },
                    {
                        num:"001XXB",
                        name: '王小虎',
                        department:"外科",
                        job:"护理",
                        state:"在职",
                        admin:true
                    },
                    {
                        num:"001XXB",
                        name: '王小虎',
                        department:"外科",
                        job:"护理",
                        state:"在职",
                        admin:false
                    },
                    {
                        num:"001XXB",
                        name: '王小虎',
                        department:"外科",
                        job:"护理",
                        state:"在职",
                        admin:true
                    }
                ]
            }
        },
        mounted () {},
        methods:{
            changeState (v) {
                console.log(v)
            },
            search () {
                let par={
                    name:this.name,
                    department:this.department,
                    job:this.job,
                    admin:this.admin
                }
            }
        }
    }
</script>