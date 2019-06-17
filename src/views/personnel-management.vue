<style lang="scss">
    .personnel-management{
        height:100%;
        overflow: hidden;
        .sub-per{
            height:calc(100% - 38px);
            overflow: hidden;
        }
       .search-bar{
           padding:0 20px;
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
            height:calc(100% - 52px);
            overflow: auto;
        }
        .pagination{
            float: right;
            margin-right:10px;
            padding-top:6px;
        }
        .tab-container .el-tab-pane{
            height:100%;
        }
        .add-admin{
            p{
                height:20px;
                line-height: 20px;
                color:#ff0000;
            }
        }
    }
</style>
<template>
    <section class="personnel-management">
        <section class="sub-per">
            <el-tabs v-model="activeName"  class="tab-container" @tab-click="totalList">
                <el-tab-pane label="员工名单" name="first">
                    <section class="search-bar">
                        <el-button type="primary" class="btn-search" icon="el-icon-search" @click="staffListSearch">搜 索</el-button>
                        <ul class="clearfix">
                            <li>
                                <el-input v-model="staffName" class="input" placeholder="请输入姓名"></el-input>
                            </li>
                            <li>
                                <el-input v-model="staffUserNum" class="input" placeholder="请输入工号"></el-input>
                            </li>
                            <!--<li>-->
                                <!--<el-select v-model="staffDepartment" class="input" placeholder="请选择科室">-->
                                    <!--<el-option-->
                                            <!--v-for="item in departments"-->
                                            <!--:key="item.value"-->
                                            <!--:label="item.label"-->
                                            <!--:value="item.value">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</li>-->

                            <!--<li>-->
                            <!--<el-select v-model="admin" class="input" placeholder="请选择管理状态">-->
                            <!--<el-option-->
                            <!--v-for="item in adminOptions"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <!--</li>-->
                        </ul>

                    </section>
                    <section class="personnel-tab">
                        <el-table
                                :data="staffTableData"
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="staffNumber"
                                    label="工号"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="staffName"
                                    label="姓名"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="deptName"
                                    label="科室"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="jobTitle"
                                    label="岗位"
                                    align="center"
                            >
                            </el-table-column>

                            <!--<el-table-column-->
                                    <!--prop="admin"-->
                                    <!--label="设为管理员"-->
                                    <!--align="center"-->
                            <!--&gt;-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-switch-->
                                            <!--v-model="scope.row.admin"-->
                                            <!--:width=50-->
                                            <!--active-text="是"-->
                                            <!--inactive-text="否"-->
                                            <!--@change="changeState(scope.row)"-->
                                    <!--&gt;-->
                                    <!--</el-switch>-->
                                <!--</template>-->

                            <!--</el-table-column>-->
                        </el-table>
                    </section>
                </el-tab-pane>
                <el-tab-pane label="管理员名单" name="second">
                    <section class="search-bar">
                        <el-button type="primary" class="btn-search" icon="el-icon-search" @click="adminListSearch">搜 索</el-button>
                        <el-button type="primary" class="btn-search" @click="dialogVisible = true"><i class="el-icon-plus"></i> 新增管理员</el-button>

                        <ul class="clearfix">
                            <li>
                                <el-input v-model="adminName" class="input" placeholder="请输入姓名"></el-input>
                            </li>
                            <li>
                                <el-input v-model="adminUserNum" class="input" placeholder="请输入账号"></el-input>
                            </li>
                            <!--<li>-->
                                <!--<el-select v-model="adminDepartment" class="input" placeholder="请选择科室">-->
                                    <!--<el-option-->
                                            <!--v-for="item in departments"-->
                                            <!--:key="item.value"-->
                                            <!--:label="item.label"-->
                                            <!--:value="item.value">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</li>-->
                            <!--<li>-->
                            <!--<el-select v-model="admin" class="input" placeholder="请选择管理状态">-->
                            <!--<el-option-->
                            <!--v-for="item in adminOptions"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <!--</li>-->
                        </ul>

                    </section>
                    <section class="personnel-tab">
                        <el-table
                                :data="adminTableData"
                                stripe
                                row-key="id"
                                style="width: 100%">
                            <el-table-column
                                    prop="account"
                                    label="账号"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="username"
                                    label="姓名"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="phoneNumber"
                                    label="手机号"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    align="center"
                                    width="120"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            @click="handleDelete(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </section>

                </el-tab-pane>
            </el-tabs>
        </section>

        <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                @current-change="currentChange"
                :current-page="currentPage"
                :hide-on-single-page="true"
                :page-count="totalPage">
        </el-pagination>
        <el-dialog
                title="新增管理员"
                class="add-admin"
                :visible.sync="dialogVisible"
                width="38%"
                @before-close="dialogVisible = false">
            <ul>
                <li>
                    <el-input v-model="inputAdminName" name="inputAdminName" placeholder="请输入姓名"></el-input>
                    <p>{{v.inputAdminName.tips}}</p>
                </li>
                <li>
                    <el-input v-model="inputAdminNum" name="inputAdminNum" placeholder="请输入工号"></el-input>
                    <p>{{v.inputAdminNum.tips}}</p>
                </li>
                <li>
                    <el-input v-model="inputAdminPhone" name="inputAdminPhone" placeholder="请输入手机号"></el-input>
                    <p>{{v.inputAdminPhone.tips}}</p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handlePost">确 定</el-button>
            </span>
        </el-dialog>

    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import fetch from '@/config/fetch'
    import {clone,getCookie} from "../tool/tool";
    import {validate} from "../validate/validator";
    let v={
        inputAdminName: {
            required: true,
            input: 'inputAdminName',
            name: '用户名',
            tips: ""
        },
        inputAdminPhone: {
            required: true,
            mobile: true,    // 是否校验数据格式
            input: 'inputAdminPhone',
            name: '手机号码',
            tips: ''
        },
        inputAdminNum: {
            required: true,
            input: 'inputAdminNum',
            name: '账号',
            tips: ''
        },
    };
    export default {
        data () {
            return {
                dialogVisible:false,
                nameListToggle:false,
                activeName:'first',
                departmentOptions:[],
                jobOptions:[],
                staffName:'',
                staffDepartment:'',
                staffUserNum:'',
                adminName:'',
                adminDepartment:'',
                adminUserNum:'',
                adminOptions:[
                   {
                       value:"",
                       label:'全部'
                   },
                   {
                       value:"1",
                       label:'有管理权限'
                   },
                   {
                       value:"2",
                       label:'无管理权限'
                   },
               ],
                admin:"",
                staffTableData: [],
                adminTableData: [],
                currentPage:1,
                pageSize:30,
                totalPage:1,
                staffCurrentPage:1,
                staffTotalPage:1,
                adminCurrentPage:1,
                adminTotalPage:1,
                inputAdminName:"",
                inputAdminNum:"",
                inputAdminPhone:"",
                v:clone(v),

                }
        },
        computed:{
            ...mapState(['departments']),
        },
        mounted () {
            this.getStaffList();
            this.getAdminList();

        },
        methods:{
            handleDelete (id) {
                // 删除试卷
                this.$confirm('是否删除该管理员?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch("/user/delUser",{examUserId:id},'get',JSON.parse(getCookie("pcToken")))
                        .then((res)=>{
                            if(res.code===0){
                                this.getAdminList ();
                            }
                            this.$alert(res.msg,"提示");
                        })
                        .catch(()=>{
                            this.$alert("数据加载异常","提示");
                        })
                }).catch((err) => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            handlePost () {
                if(!validate({ctx:this,rules:this.v})){
                    return false;
                }
                fetch("/user/saveUser",{
                    account:this.inputAdminNum,
                    username:this.inputAdminName,
                    phoneNumber:this.inputAdminPhone
                },"post",JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.v=clone(v);
                            this.dialogVisible = false;
                            this.inputAdminName="";
                            this.inputAdminNum="";
                            this.inputAdminPhone="";
                            this.getAdminList ();
                        }
                       this.$alert(res.msg,"提示");
                    })
                    .catch(()=>{
                        this.$alert("数据加载异常","提示")
                    })

            },
            totalList () {
                if(this.activeName!=='first'){
                    // 管理人员
                    this.nameListToggle=true;
                    this.currentPage=this.adminCurrentPage;
                    this.totalPage=this.adminTotalPage;

                }else{
                    // 员工
                    this.nameListToggle=false;
                    this.currentPage=this.staffCurrentPage;
                    this.totalPage=this.staffTotalPage;
                }

            },
            currentChange (page) {
                this.currentPage=page;

                if(this.nameListToggle){
                    // 管理人员
                    this.adminCurrentPage=page;
                    this.getAdminList();
                }else{
                    // 员工
                    this.staffCurrentPage=page;
                    this.getStaffList();
                }
            },
            changeState (v) {
                console.log(v)
            },
            // 员工列表搜索
            staffListSearch () {
                this.currentPage=1;
                this.getStaffList();
            },
            // 管理员列表搜索
            adminListSearch () {
                this.getAdminList();

            },
            // 获取管理员名单
            getAdminList () {
                fetch("/user/list",{
                    // pageNumber:"",
                    // pageSize:1000,
                        account:this.adminUserNum,
                        username:this.adminName,
                },'post',JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.adminTableData=res.data;
                        }else{
                            this.$alert(res.msg,"提示")
                        }
                    })
                    .catch(()=>{
                        this.$alert("数据加载异常","提示")
                    })
            },
            // 获取员工名单
            getStaffList () {
                fetch('/hospitalPersonnel/list',{
                    pageNumber:this.currentPage,
                    pageSize:this.pageSize,
                    hospitalPersonnel:{
                        staffNumber:this.staffUserNum,
                        staffName:this.staffName
                    }
                },'post',JSON.parse(getCookie("pcToken")))
                    .then((res)=>{
                        if(res.code===0){
                            this.staffTableData=res.data.list;
                            this.totalPage=res.data.pages;
                            this.staffCurrentPage=res.data.pageNum;
                            this.staffTotalPage=res.data.pages;
                        }else{
                            this.$alert(res.msg,"提示")
                        }
                    })
                    .catch(()=>{
                        this.$alert("数据加载异常","提示")
                    })
            }
        }
    }
</script>