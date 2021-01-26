<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <avue-crud :before-open="handleOpenBefore"
                 :data="list"
                 :option="tableOption"
                 :page="page"
                 :table-loading="listLoading"
                 @on-load="getList"
                 @refresh-change="handleRefreshChange"
                 @row-save="create"
                 @row-update="update"
                 @search-change="handleFilter"
                 ref="crud"
                 v-model="form">

        <template slot="menuLeft">
          <el-button @click="handleCreate"
                     class="filter-item"
                     icon="el-icon-edit"
                     size="small"
                     type="primary"
                     v-if="dataRoleManager_btn_add">添加
          </el-button>
        </template>
        <template slot="menu"
                  slot-scope="scope">
          <el-button @click="handleUpdate(scope.row,scope.index)"
                     icon="el-icon-edit"
                     size="mini"
                     type="text"
                     v-if="dataRoleManager_btn_edit">修改
          </el-button>
          <el-button @click="handleDelete(scope.row,scope.index)"
                     icon="el-icon-delete"
                     size="mini"
                     type="text"
                     v-if="dataRoleManager_btn_del">删除
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
  import {addObj, delObj, fetchList, fetchRoleTree, getObj, permissionUpd, putObj} from '@/api/admin/authTable'
  import {fetchTree} from '@/api/admin/dept'
  import {tableOption} from '@/const/crud/admin/authTable'
  import {fetchMenuTree} from '@/api/admin/menu'
  import {mapGetters} from 'vuex'

  export default {
    name: 'authTableConfig',
    data() {
      return {
        tableOption: tableOption,
        checkedKeys: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        menuIds: '',
        list: [],
        listLoading: true,
        form: {},
        roleId: undefined,
        roleCode: undefined,
        rolesOptions: undefined,
        dialogPermissionVisible: false,
        dataRoleManager_btn_add: false,
        dataRoleManager_btn_edit: false,
        dataRoleManager_btn_del: false,
      }
    },
    created() {
      this.dataRoleManager_btn_add = this.permissions['sys_role_add']
      this.dataRoleManager_btn_edit = this.permissions['sys_role_edit']
      this.dataRoleManager_btn_del = this.permissions['sys_role_del']
    },
    computed: {
      ...mapGetters(['elements', 'permissions'])
    },
    methods: {
      getList(page, params) {
        this.listLoading = true
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {
          this.list = response.data.data.records
          this.page.total = response.data.data.total
          this.listLoading = false
        })
      },
      handleRefreshChange() {
        this.getList(this.page)
      },
      handleFilter(param) {
        this.getList(this.page, param);
      },
      handleCreate() {
        this.$refs.crud.rowAdd();
      },

      handleOpenBefore(show, type) {
        show();
      },
      handleUpdate(row, index) {
        this.$refs.crud.rowEdit(row, index);
      },
      handleDelete(row, index) {
        var _this = this
        this.$confirm('是否确认删除名称为"' + row.dataTypeName + '"' + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return delObj(row.dataTypeId)
        }).then(() => {
          this.page = {
            total: 0, // 总页数
              currentPage: 1, // 当前页数
              pageSize: 10 // 每页显示多少条
          };
          this.getList(this.page)
          this.list.splice(index, 1);
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        }).catch(function () {
        })
      },
      create(row, done, loading) {
        addObj(this.form).then(() => {
          this.page = {
            total: 0, // 总页数
            currentPage: 1, // 当前页数
            pageSize: 10 // 每页显示多少条
          };
          this.getList(this.page)
          done();
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          loading();
        });
      },
      update(row, index, done, loading) {
        putObj(this.form).then(() => {
          this.page = {
            total: 0, // 总页数
            currentPage: 1, // 当前页数
            pageSize: 10 // 每页显示多少条
          };
          this.getList(this.page)
          done();
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          loading();
        });
      },
    }
  }
</script>
