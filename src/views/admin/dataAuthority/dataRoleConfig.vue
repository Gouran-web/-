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
                 @row-update="update"
                 @search-change="handleFilter"
                 ref="crud"
                 v-model="form">
        <template slot-scope="scope" slot="roleDescForm">
          <el-input type="textarea" v-model="form.roleDesc"></el-input>
        </template>

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
          <el-button @click="permission(scope.row,scope.index)"
                     icon="el-icon-plus"
                     plain
                     size="mini"
                     type="text"
                     v-if="dataRoleManager_btn_perm">权限
          </el-button>
          <el-button @click="handlePermission(scope.row,scope.index)"
                     icon="el-icon-plus"
                     plain
                     size="mini"
                     type="text"
                     v-if="dataRoleManager_btn_perm">授权
          </el-button>
        </template>
      </avue-crud>
    </basic-container>

    <el-dialog :visible.sync="dialogAddVisible" width="130vh" :title="title" @closed="beforeClose">
      <el-form ref="ruleForm" :rules="roleRules" :model="addDialogForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="数据角色名称" prop="roleName" v-if="addDialog">
          <el-input size="medium" v-model="addDialogForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="数据角色描述" prop="roleDesc" v-if="addDialog">
          <el-input size="medium" type="textarea" v-model="addDialogForm.roleDesc"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="20">
            <el-form-item label="授权类型" prop="authTypeId">
              <el-select v-model="addDialogForm.authTypeId" @change="authTypeChange" placeholder="请选择授权类型"
                         clearable>
                <el-option v-for="item in authTypeDic" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button size="medium" type="primary" @click="handleSave('ruleForm')">保存</el-button>
          </el-col>
        </el-row>
        <el-row style="padding-left: 10vh; height: 50vh; overflow-y: scroll;">
          <el-col :span="24">
            <el-tree
              :data="treeData"
              default-expand-all
              ref="tree"
              :props="defaultProps"
              node-key="id"
              show-checkbox
              width="100">
            </el-tree>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer"
           slot="footer">
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogHandlePermissionVisible" title="授权" width="130vh">
      <el-form ref="form" :model="permissionDialogForm" label-width="100px">
        <el-row :gutter="10">
          <el-col :span="15">
            <el-form-item label="">
              <el-input size="medium" v-model="filterSearch" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button size="medium" type="primary" @click="search">查询</el-button>
          </el-col>

          <el-col :span="3">
            <el-button size="medium" type="primary" @click="saveHandlePermission">保存</el-button>
          </el-col>
        </el-row>
        <el-row style="padding-left: 10vh; height: 50vh; overflow-y: scroll;">
          <el-col :span="24">
            <el-tree
              class="filter-tree"
              :data="deptTreeData"
              default-expand-all
              ref="deptTree"
              :filter-node-method="filterNode"
              :props="defaultProps"
              node-key="id"
              show-checkbox
              width="100">
            </el-tree>
          </el-col>
        </el-row>
      </el-form>

    </el-dialog>

  </div>
</template>

<script>
  import {
    addObj,
    delObj,
    fetchList,
    permission,
    putObj,
    fetchWellTreeList
  } from '@/api/admin/dataRole'
  import {fetchTree} from '@/api/admin/dept'
  import {list} from '@/api/admin/authTable'
  import {handlePermission, getObjByRoleIdOrg, getObjByRoleIdUser} from '@/api/admin/dataRoleAuthUser'
  import {getObj} from '@/api/admin/role'
  import {getObjByRoleId} from '@/api/admin/roleAuth'
  import {tableOption} from '@/const/crud/admin/dataRole'
  import {mapGetters} from 'vuex'

  export default {
    name: 'dataRoleConfig',
    data() {
      return {

        dialogHandlePermissionVisible: false,
        deptTreeData: [],
        title: "",
        addDialog: false,
        filterSearch: "",
        dialogAddVisible: false,

        roleRules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
            {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
          ],
          roleDesc: [
            {message: '请填写角色描述', trigger: 'blur'}
          ],
          authTypeId: [
            {required: true, message: '请选择授权类型', trigger: 'change'}
          ]
        },
        authTypeSelect: {},
        authTypeDic: [],
        permissionDialogForm: {},
        addDialogForm: {
          roleName: "",
          roleDesc: "",
          authTypeId: "",
          authValue: "",
          createdBy: "",
        },
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
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
        dataTypes: [], //类型下拉框
        roleId: undefined,
        roleCode: undefined,
        rolesOptions: undefined,
        dialogPermissionVisible: false,
        dataRoleManager_btn_add: false,
        dataRoleManager_btn_edit: false,
        dataRoleManager_btn_del: false,
        dataRoleManager_btn_perm: false
      }
    },
    watch: {
      // filterSearch(val) {
      //   this.$refs.tree.filter(val);
      // }
    },
    created() {
      this.dataRoleManager_btn_add = this.permissions['sys_role_add']
      this.dataRoleManager_btn_edit = this.permissions['sys_role_edit']
      this.dataRoleManager_btn_del = this.permissions['sys_role_del']
      this.dataRoleManager_btn_perm = this.permissions['sys_role_perm']
    },
    computed: {
      ...mapGetters(['elements', 'permissions'])
    },
    methods: {
      authTypeChange() {
        this.dataTypes.forEach(dataTypeObj => {
          if (this.addDialogForm.authTypeId == dataTypeObj.dataTypeId) {
            //拿到视图名称动态查询树形结构显示 dataTypeObj.valueTable
            this.treeData = []
            fetchWellTreeList(dataTypeObj.valueTable, dataTypeObj.authColumn).then(response => {
              this.treeData = response.data.data
            })
          }
        })
      },
      search() {
        this.$refs.tree.filter(this.filterSearch);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      beforeClose(){
        this.addDialogForm = {
          roleName: "",
          roleDesc: "",
          authTypeId: "",
          authValue: "",
          createdBy: ""
        }
        if (this.treeData.length != 0){
          this.$refs.tree.setCheckedKeys([])
        }
        if (this.deptTreeData.length != 0){
          this.$refs.deptTree.setCheckedKeys([])
        }
        this.treeData = []
        this.deptTreeData = []
      },
      handleSave(formName) {
        let _this = this;
        if (!this.addDialog) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //保存权限
              this.addDialogForm.authValue = ""
              this.$refs.tree.getCheckedNodes().forEach(node => {
                this.addDialogForm.authValue += "," + node.id; //井号Id
              });
              permission(this.addDialogForm).then(response => {
                if (response.data.code == 0) {
                  _this.$message({
                    showClose: true,
                    message: '修改权限成功',
                    type: 'success'
                  })
                } else {
                  _this.$message({
                    showClose: true,
                    message: '修改权限失败',
                    type: 'error'
                  })
                }
                this.$refs.ruleForm.resetFields();
                this.dialogAddVisible = false
              })
            } else {
              return false;
            }
          });
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.addDialogForm.authValue = ""
              this.$refs.tree.getCheckedNodes().forEach(node => {
                this.addDialogForm.authValue += "," + node.id
              });
              let user = JSON.parse(sessionStorage.getItem("dcoit-user_info"))
              if (user != undefined) {
                this.addDialogForm.createdBy = user.content.username
              }
              getObj(user.content.userId).then(response => {
                if (response.data.code == 0){
                  this.addDialogForm.roleCode = response.data.data.roleCode
                  addObj(this.addDialogForm).then(response => {
                    if (response.data.code == 0) {
                      _this.$message({
                        showClose: true,
                        message: '添加成功',
                        type: 'success'
                      })
                    } else {
                      _this.$message({
                        showClose: true,
                        message: '添加失败',
                        type: 'erorr'
                      })
                    }
                    this.$refs.ruleForm.resetFields();
                    this.dialogAddVisible = false
                    this.getList(this.page)
                  });
                }
              });
            } else {
              return false;
            }
          });
        }
      },

      getTreeList() {
        this.deptTreeData = []
        fetchTree(this.listQuery).then(response => {
          this.deptTreeData = response.data.data
        })
      },

      getSelectList() {
        this.authTypeDic = []
        list().then(response => {
          this.dataTypes = response.data.data
          response.data.data.forEach(x => {
            let temp = {
              label: x.dataTypeName,
              value: x.dataTypeId
            };
            this.authTypeDic.push(temp);
          })
        })
      },
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
        this.title = "添加"
        this.addDialog = true
        this.getSelectList()
        this.dialogAddVisible = true;
      },
      handleOpenBefore(show, type) {
        show();
      },
      handleUpdate(row, index) {
        this.$refs.crud.rowEdit(row, index);
      },
      echoWell(value) {
        this.treeData = []
        if (!value) return
        getObjByRoleId(value).then(response => {
          if (response.data.code === 0) {
            if (response.data.data.dataAuthType.length > 0){
              this.addDialogForm.authTypeId = response.data.data.dataAuthType[0]
            }
            let valueTable = "";
            if (response.data.data.valueTable !== undefined){
              valueTable = response.data.data.valueTable;
            }
            let valueColumn = "";
            if (response.data.data.valueColumn !== undefined){
              valueColumn = response.data.data.valueColumn;
            }
            fetchWellTreeList(valueTable, valueColumn).then(res => {
              let datatypeIds = []
              if(res.data.code === 0){
                this.treeData = res.data.data
                response.data.data.treeData.forEach(x => {
                  datatypeIds.push(x.authValue); //wellId
                })
              }
              this.$refs.tree.setCheckedKeys(datatypeIds)
            })
          }
        })
      },
      //打开权限弹出框
      permission(row) {
        this.title = "权限"
        this.addDialog = false
        this.getSelectList()
        this.addDialogForm.roleId = row.roleId
        this.echoWell(row.roleId)
        this.dialogAddVisible = true
      },

      saveHandlePermission() {
        let _this = this
        let deptIds = []
        this.$refs.deptTree.getCheckedNodes().map(x => {
          deptIds.push(x.id)
        });
        handlePermission({
          roleId: this.roleId,
          deptIdList: deptIds
        }).then(response => {
          if (response.data.code == 0) {
            _this.$message({
              showClose: true,
              message: '授权成功',
              type: 'success'
            })
          } else {
            _this.$message({
              showClose: true,
              message: '授权失败',
              type: 'error'
            })
          }
          this.$refs.deptTree.setCheckedKeys([])
          this.dialogHandlePermissionVisible = false
        })
      },

      //回显部门树
      echoDept(value) {
        if (!value) return
        getObjByRoleIdOrg(value).then(response => {
          let authIds = [];
          if (!response.data.data) return
          response.data.data.forEach(x => {
            authIds.push(x.authId); //deptId
          })
          this.$refs.deptTree.setCheckedKeys(authIds)
        })
      },


      //打开授权弹出框
      handlePermission(row) {
        this.getTreeList()
        this.roleId = row.roleId
        this.echoDept(row.roleId)
        this.dialogHandlePermissionVisible = true
      },

      //删除方法
      handleDelete(row, index) {
        var _this = this
        //检验是否关联到用户
        getObjByRoleIdUser(row.roleId).then(response => {
          if (response.data.data.length > 0) {
            this.handleRemove(row);
          } else {
            delObj(row.roleId).then(res => {
              this.page = {total: 0, currentPage: 1, pageSize: 10};
              this.getList(this.page)
              this.list.splice(index, 1)
              _this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
            });

          }
        })
      },

      handleRemove(row) {
        this.$confirm('已经关联到用户是否确认删除名称为"' + row.roleName + '"' + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return delObj(row.roleId)
        }).then(() => {
          this.page = {
            total: 0, // 总页数
            currentPage: 1, // 当前页数
            pageSize: 10 // 每页显示多少条
          };
          this.getList(this.page)
          this.list.splice(index, 1)
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        }).catch(function () {
        })
      },

      //更新
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
