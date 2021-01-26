<!--
  -    Copyright (c) 2018-2025, lengleng All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the www.dcoit.com developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: lengleng (wangiegie@gmail.com)
  -->

<template>
  <div class="user">
    <basic-container>
      <avue-crud :option="option"
                 ref="crud"
                 v-model="form"
                 :page="page"
                 @on-load="getList"
                 :table-loading="listLoading"
                 @search-change="handleFilter"
                 @refresh-change="handleRefreshChange"
                 @row-update="update"
                 @row-save="create"
                 :before-open="handleOpenBefore"
                 :data="list">
        <template slot="menuLeft">
          <el-button v-if="sys_user_add"
                     class="filter-item"
                     @click="handleCreate"
                     size="small"
                     type="primary"
                     icon="el-icon-edit">添加
          </el-button>
        </template>
        <template slot="username"
                  slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
        <template slot="role"
                  slot-scope="scope">
              <span v-for="(role,index) in scope.row.roleList"
                    :key="index">
                <el-tag>{{role.roleName}} </el-tag>&nbsp;&nbsp;
              </span>
        </template>

       <template slot="dataRole"
                  slot-scope="scope">
              <span v-for="(role,index) in scope.row.dataRoleList"
                    :key="index">
                <el-tag>{{role.roleName}} </el-tag>
              </span>
        </template>
        <template slot="deptId"
                  slot-scope="scope">
          {{scope.row.deptName}}
        </template>
        <template slot="lockFlag"
                  slot-scope="scope">
          <el-tag>{{scope.label}}</el-tag>
        </template>
        <template slot="menu"
                  slot-scope="scope">
          <el-button v-if="sys_user_edit"
                     size="small"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row,scope.index)">编辑
          </el-button>
          <el-button v-if="sys_user_del"
                     size="small"
                     type="text"
                     icon="el-icon-delete"
                     @click="deletes(scope.row,scope.index)">删除
          </el-button>
        </template>
        <template slot="deptIdForm"
                  slot-scope="scope">
          <avue-input v-model="form.deptId"
                      type="tree"
                      placeholder="请选择所属部门"
                      @change="getNodeData"
                      :dic="treeDeptData"
                      :props="defaultProps"></avue-input>
        </template>
        <template slot="roleForm"
                  slot-scope="scope">
          <avue-select v-model="role"
                       multiple
                       filterable
                       @change="getRoleDataNodeData"
                       placeholder="请选择角色"
                       :dic="rolesOptions"
                       :props="roleProps"></avue-select>
        </template>
        <template slot="dataRoleForm"
                  slot-scope="scope">
          <avue-select v-model="dataRole"
                       multiple
                       filterable
                       placeholder="请选择数据角色"
                       :dic="dataRolesOptions"
                       :props="dataRoleProps"></avue-select>
        </template>
      </avue-crud>
    </basic-container>
  </div>

</template>

<script>
    import {addObj, delObj, fetchList, putObj} from "@/api/admin/user";
    import {deptRoleList} from "@/api/admin/role";
    import {list} from "@/api/admin/dataRole";
    import {fetchTree} from "@/api/admin/dept";
    import {tableOption} from '@/const/crud/admin/user';
    import {mapGetters} from "vuex";

    export default {
        name: "table_user",
        data() {
            return {
                option: tableOption,
                treeDeptData: [],
                checkedKeys: [],
                roleProps: {
                    label: "roleName",
                    value: 'roleId'
                },
                dataRoleProps: {
                    label: "roleName",
                    value: 'roleId'
                },
                defaultProps: {
                    label: "name",
                    value: 'id',
                },
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20, // 每页显示多少条,
                    isAsc: false//是否倒序
                },
                list: [],
                listLoading: true,
                role: [],
                dataRole: [],
                roleId: '',
                deptId: '',
                form: {},
                rolesOptions: [],
                dataRolesOptions:[]
            };
        },
        computed: {
            ...mapGetters(["permissions"])
        },
        watch: {
            role() {
                this.form.role = this.role;
            },
            dataRole() {
              this.form.dataRole = this.dataRole
            }
        },
        created() {
            this.sys_user_add = this.permissions["sys_user_add"];
            this.sys_user_edit = this.permissions["sys_user_edit"];
            this.sys_user_del = this.permissions["sys_user_del"];
        },
        methods: {
            getRoleDataNodeData(){
              // this.getDataRoleNodeData(this.form.deptId == null ? -1 : this.form.deptId);
              this.getDataRoleNodeData();
            },
            getList(page, params) {
                this.listLoading = true;
                fetchList(Object.assign({
                    current: page.currentPage,
                    size: page.pageSize
                }, params)).then(response => {
                    this.list = response.data.data.records;
                    this.page.total = response.data.data.total
                    this.listLoading = false;
                });
            },
            getNodeData(data) {
                this.getRoleDataNodeData()
                deptRoleList().then(response => {
                    this.rolesOptions = response.data.data;
                });
            },
            getDataRoleNodeData() {
                list().then(response => {
                  this.dataRolesOptions = response.data.data;
                });
            },
            handleDept() {
                fetchTree().then(response => {
                    this.treeDeptData = response.data.data;
                });
            },
            handleFilter(param) {
                this.page.page = 1;
                this.getList(this.page, param);
            },
            handleRefreshChange() {
                this.getList(this.page)
            },
            handleCreate() {
                this.$refs.crud.rowAdd();
            },
            handleOpenBefore(show, type) {
                window.boxType = type;
                window.form=this.form;
                this.handleDept();
                this.getDataRoleNodeData();
                if (['edit', 'views'].includes(type)) {
                    this.role = [];
                    this.dataRole = [];
                    for (var i = 0; i < this.form.roleList.length; i++) {
                        this.role[i] = this.form.roleList[i].roleId;
                    }
                  for (var i = 0; i < this.form.dataRoleList.length; i++) {

                    this.dataRole[i] = this.form.dataRoleList[i].roleId
                  }
                  this.form.dataRole = this.dataRole
                    deptRoleList().then(response => {
                        this.rolesOptions = response.data.data;
                    });
                } else if (type === 'add') {
                    this.role = [];
                    this.dataRole = [];
                }
                show();
            },
            handleUpdate(row, index) {
              this.deptId = row.deptId == null ? -1 : row.deptId
              this.$refs.crud.rowEdit(row, index);
              this.form.password = undefined
              window.userId=this.form.userId
            },
            create(row, done, loading) {
                addObj(this.form).then(() => {
                    this.getList(this.page);
                    done();
                    this.$notify.success('创建成功')
                }).catch(() => {
                    loading();
                });
            },
            update(row, index, done, loading) {

                putObj(this.form).then(() => {
                    this.getList(this.page);
                    done();
                    this.$notify.success('修改成功')
                }).catch(() => {
                    loading();
                });
            },
            deletes(row, index) {
                this.$confirm("此操作将永久删除该用户(用户名:" + row.username + "), 是否继续?", "提示",
                  {
                    cancelButtonText: "取消",
                    confirmButtonText: "确定",
                    cancelButtonClass:'cancelButton',
                    confirmButtonClass:'confirmButton',
                    type: "warning"}
                ).then(() => {
                    delObj(row.userId).then(() => {
                            this.getList(this.page);
                            this.$notify.success('删除成功')
                        }).catch(() => {
                        this.$notify.error('删除失败')
                    });
                });
            }
        }
    };
</script>
<style lang="scss">
  .user {
    height: 100%;

    &__tree {
      padding-top: 3px;
      padding-right: 20px;
    }

    &__main {
      .el-card__body {
        padding-top: 0;
      }
    }
  }
  .el-scrollbar__wrap {
    margin-top: 0px !important;
  }
  .cancelButton {
    color: #f0f0f0 !important;
    background-color: #409EFF !important;
    border-color: #409EFF !important;
    margin-right: 60px !important
  }

  .confirmButton {
    color: #f0f0f0 !important;
    background-color: #999 !important;
    border-color: #ebeef5 !important;
    float: left !important;
    margin-left: 50px !important;
  }
</style>

