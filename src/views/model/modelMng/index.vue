<template>
  <div class="execution">
    <div v-show="listpage">
      <basic-container>
        <avue-crud ref="crud" class="model-tab"
                  :page="page"
                  :data="tableData"
                  :table-loading="tableLoading"
                  :option="tableOption"
                  @refresh-change="searchChange"
                  @on-load="getList"
                  @search-change="searchChange"
                  @row-del="rowDel">
          <template slot="menuLeft">
            <el-button type="primary" @click="handleAdd" size="small" v-if="permissions.sys_dept_add">
              <i class="el-icon-plus"></i>
              新 增
            </el-button>
            <el-button type="primary" @click="synchro" size="small" >
              <i class="el-icon-refresh"></i>
              同步
            </el-button>
          </template>
          <template slot="modelName" slot-scope="scope" >
            <div type="primary" >{{scope.row.modelName}}</div>
          </template>
          <template slot="objectId" slot-scope="scope" >
            <el-tooltip class="item" effect="dark" :content="scope.row.objectId" placement="top">
              <div class="ellipsis1">{{scope.row.objectId}}</div>
            </el-tooltip>
          </template>
          <template slot-scope="scope" slot="menu">
            <el-button type="text"
                      icon="el-icon-finished"
                      size="mini"
                      plain
                      @click="publicVis(scope.row)">发布版本
            </el-button>
            <el-button type="text"
                      v-if="permissions.sys_dict_edit"
                      icon="el-icon-check"
                      size="mini"
                      plain
                      @click="handleView(scope.row, 'update')">编辑
            </el-button>
            <el-button type="text"
                      v-if="permissions.sys_dict_del"
                      icon="el-icon-delete"
                      size="mini"
                      plain
                      @click="handleDel(scope.row,scope.index)">注销
            </el-button>
            <el-button type="text"
                      icon="el-icon-paperclip"
                      size="mini"
                      plain
                      @click="example(scope.row)">关联实例
            </el-button>
          </template>
        </avue-crud>
      </basic-container>
      <el-dialog ref="public" width="40%" title="发布版本" :visible.sync="publicVisible" :before-close="closePubDialog">
        <avue-form :option="publicOption" ref="publicForm" class="model-reg" v-model="publicData" @submit="publicSub" @reset-change="publicVisible=false">
        </avue-form>
      </el-dialog>
      <el-dialog ref="example" width="50%" title="关联实例" :visible.sync="exampleVisible" >
        <el-row >
          <el-col :span="2" >
            <el-button type="primary" @click="commitTree()" size="mini">确定</el-button>
          </el-col>
          <el-col :span="2" :offset="2">
            <el-button @click="resetChecked" size="mini">清空节点</el-button>
          </el-col>
        </el-row>
          <el-row>
            <el-col :span="12">
              <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
              </el-input>
            </el-col>
          </el-row>
        <div style="height: 400px; overflow:auto">
          <el-row>
            <el-tree
              class="filter-tree"
              :data="expTreeData"
              :props="exampleProps"
              node-key="expId"
              show-checkbox
              :filter-node-method="filterNode"
              ref="tree">
            </el-tree>
          </el-row>
        </div>


      </el-dialog>
    </div>
    <div v-show="!listpage">
      <v-detail ref="detailpage" @closeDetail='closeDetail'></v-detail>
    </div>
  </div>
</template>

<script>
  import { delObj, fetchList, publicVersion, exampleVisible, getExpAll, getModelJoin,getExpAllTree,synchro} from '@/api/model/modelMng'
  import {tableOption, publicOption, exampleOption} from '@/const/crud/model/modelMng'
  import {mapGetters} from 'vuex'
  import modelDetail from '@/views/model/modelMng/detail.vue'

  export default {
    name: 'modelMng',
    data() {
      return {
        filterText: '',
        expOptions: [],
        expTreeData:[],
        publicVisible: false,
        exampleVisible: false,
        listpage: true,
        searchForm: {},
        typeOptions: [],
        tableData: [],
        publicData: {},
        exampleData: {},
        exampleRow: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        exampleProps:{
          label:"expName",
          children:"iwellYjdxDtoList"
        },
        tableLoading: false,
        tableOption: tableOption,
        publicOption: publicOption,
        exampleOption: exampleOption,
        searchParams: ""
      }
    },
    beforeCreate(){
      getExpAll().then(res => {
        this.expOptions = res.data.data;
      });
      getExpAllTree().then(res => {

        this.expTreeData = res.data.data;
      });
    },

    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    created() {
      this.listpage = true;
    },
    mounted: function () {
    },
    computed: {
      ...mapGetters(['userInfo', 'permissions']),
    },
    methods: {
      closeExaDialog(){
        this.$refs.exampleForm.resetForm();
        this.exampleVisible = false;
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.expName.indexOf(value) !== -1;
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      example(row){
        this.exampleRow = row;
        this.exampleVisible = true;
        getModelJoin(row.modelId).then(res => {
          let impIdsJson = []
          res.data.data.forEach(element => {
            impIdsJson.push(element.impId)
          });
          this.exampleData.impIds = impIdsJson;
          this.resetChecked();
          this.$refs.tree.setCheckedKeys(impIdsJson,true)

        })
      },
      exampleSub(form,done){
        let impIdsVal = ""
        this.exampleData.impIds.forEach((element, index) => {
          if(index < this.exampleData.impIds.length-1){
            impIdsVal = impIdsVal + element + ","
          }else{
            impIdsVal = impIdsVal + element
          }
        });
        exampleVisible(impIdsVal, this.exampleRow.modelId).then(res => {
          if(res.data.code === 0){
            this.$message({
              showClose: true,
              message: '关联成功',
              type: 'success'
            })
            this.exampleVisible = false;
            this.getList(this.page, this.searchParams)
          }else{
            this.$message.error(res.data.msg);
          }
          setTimeout(()=>{
            done()
          },3000)
        })
      },
      commitTree(){
        var data={
          impIds :this.$refs.tree.getCheckedKeys(true),
          modelId: this.exampleRow.modelId
        }
        exampleVisible(data).then(res => {
          if(res.data.code === 0){
            this.$message({
              showClose: true,
              message: '关联成功',
              type: 'success'
            })
            this.exampleVisible = false;
            this.getList(this.page, this.searchParams);
            done();
          }else{
            this.$message.error(res.data.msg);
          }
          setTimeout(()=>{
            done()
          },3000)
        })
      },

      closePubDialog(){
        this.$refs.publicForm.resetForm();
        this.publicVisible = false;
      },
      publicVis(row){
        this.publicData = {
          "modelId": row.modelId,
          "venDescription": "",
          "venPerson": this.userInfo.username
        }
        this.publicVisible = true;
      },
      publicSub(form,done){
        this.publicData.venTime = new Date();
        publicVersion(this.publicData).then(res => {
          if(res.data.code === 0){
            this.$message({
              showClose: true,
              message: '发布成功',
              type: 'success'
            })
            this.publicVisible = false;
            this.getList(this.page, this.searchParams)
          }else{
            this.$message.error(res.data.msg);
          }
          setTimeout(()=>{
            done()
          },3000)
        })
      },
      getList(page, params) {
        this.searchParams = params;
        this.tableLoading = true
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.tableLoading = false
        })
      },
      /**
       * @title 打开新增窗口
       * @detail 调用crud的handleadd方法即可
       *
       **/

      handleAdd: function () {
        this.listpage = false;
        const postData = { type: "add", page: this.page.currentPage }
        this.$refs.detailpage.getValue(postData);

        // this.$router.push({ path: '/modelMng/detail', query: { id: "id", type: 'add', page: this.page.currentPage } });
      },
      handleView(row, type) {

        this.listpage = false;
        const postData = { id: row.modelId, type: type, page: this.page.currentPage }
        this.$refs.detailpage.getValue(postData);

        // this.$router.push({ path: '/modelMng/detail', query: { id: row.modelId, type: type, page: this.page.currentPage } });
      },
      closeDetail(){
        this.listpage = true;
        this.getList(this.page, this.searchParams)
      },
      handleDel(row, index) {
        this.$refs.crud.rowDel(row, index)
      },
      rowDel: function (row, index) {
        var _this = this
        this.$confirm('是否确认删除模型名称为"' + row.modelName + '的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return delObj(row.modelId)
        }).then((res) => {
          if(res.data.code === 0){
            _this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
          }else{
            this.$message.error(res.data.msg);
          }
          this.getList(this.page)
        }).catch(function () {
        })
      },
      searchChange(form) {
        form.objectId = form.objectId ? form.objectId[1] : "";
        form.typeId = form.typeIds ? form.typeIds[2] : "";
        this.getList(this.page, form)
      },
      synchro(){
        console.log("同步开始")
        synchro().then(response => {
          console.log(response);
          if(response.code=="0"){
            if(response.data.code=="200"){
              this.$message.success("同步成功")
            }else {
              this.$message.error(response.data.msg);
            }
          }else {
            this.$message.error(response.msg);
          }
        })
      },
    },
    components: {
       "v-detail": modelDetail
    }
  }
</script>

<style>
.model-tab .avue-crud-search__search .el-form-item__label{ width: 90px;}


</style>

