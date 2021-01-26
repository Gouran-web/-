<template>
  <div class="execution">
    <basic-container>
      <avue-crud ref="crud"
                 :page="page"
                 :data="tableData"
                 :table-loading="tableLoading"
                 :option="tableOption"
                 @on-load="getList"
                 :before-open="beforeOpen"
                 @refresh-change="refreshChange"
                 @row-update="handleUpdate"
                 @row-save="handleSave"
                 @search-change="searchChange"
                 @row-del="rowDel">
        <template slot="nomDesc" slot-scope="scope" >
          <el-tooltip class="item" effect="dark" :content="scope.row.nomDesc" placement="top">
            <div class="ellipsis2">{{scope.row.nomDesc}}</div>
          </el-tooltip>
        </template>
        <template slot="menu"
                  slot-scope="scope">
          <el-button
                     size="small"
                     type="text"
                     icon="el-icon-edit"
                     @click="updateHandel(scope.row,scope.index)">编辑
          </el-button>
          <el-button
                     size="small"
                     type="text"
                     icon="el-icon-delete"
                     @click="rowDel(scope.row,scope.index)">删除
          </el-button>
        </template>
        <template slot="configValue"
                  slot-scope="scope">
              <span v-for="(cog,index) in scope.row.configValue"
                    :key="index">
                <el-tag>{{cog}} </el-tag>&nbsp;&nbsp;
              </span>
        </template>
        <template slot="cogIdsForm"
                  slot-scope="scope">
          <el-cascader  v-model="cogIds"
                       placeholder="请选则模型类型"
                       :options="modelTypeOption"
                       :props="modelTypeProps"></el-cascader >
        </template>
      </avue-crud>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="60%">
        <el-form :model="editform">
          <el-col :span="12">
          <el-form-item label="指标名称" label-width="120px">
            <el-input v-model="editform.nomName" autocomplete="off"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="模型类型" label-width="120px">
            <el-cascader  v-model="cogIds"
                          placeholder="请选则模型类型"
                          :options="modelTypeOption"
                          :props="modelTypeProps"></el-cascader >
          </el-form-item>
          </el-col>
            <el-col :span="12">
          <el-form-item label="计算规则" label-width="120px">
            <el-input v-model="editform.nomRule" autocomplete="off"></el-input>
          </el-form-item>
            </el-col>
          <el-col :span="12">
          <el-form-item label="评价周期" label-width="120px">
            <el-select v-model="editform.nomCycle" placeholder="请选择">
              <el-option
                v-for="item in dicData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
<!--            <el-input v-model="form.nomCycle" autocomplete="off"></el-input>-->
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="评价说明" label-width="120px">
            <el-input v-model="editform.nomDesc" autocomplete="off" type="textarea" :autosize="{ minRows: 3, maxRows: 6}"></el-input>
          </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateDate">修 改</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
  import { addObj, putObj, delObj, fetchList} from '@/api/model/modelEva/indicatorsMng'
  import {modelTypeOptionTree} from '@/api/model/modelEva/evaReport.js'
  import {tableOption} from '@/const/crud/model/modelEva/indicatorsMng'
  import {mapGetters} from 'vuex'

  export default {
    name: 'indicatorsMng',
    data() {
      return {
        searchForm: {},
        typeOptions: [],
        tableData: [],
        cogIds:[],
        editform:{},
        dicData: [{
          value: '每天',
          label: '每天'
        }, {
          value: '每周',
          label: '每周'
        }, {
          value: '每月',
          label: '每月'
        }],
        dialogFormVisible:false,
        modelTypeOption:[],
        modelTypeProps:{
          multiple:true,
          expandTrigger: 'hover',
          label: "cogValue",
          value: "cogId",
          // children:'children'
        },
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        tableLoading: false,
        tableOption: tableOption,
      }
    },
    created() {
      this.getConfigByType();
      // this.modelTypeProps={
      //   multiple:true,
      //     label: "cogValue",
      //     value: "cogId",
      //     children:'children'
      // }
    },
    mounted: function () {
    },
    computed: {
      ...mapGetters(['permissions']),
    },
    methods: {
      beforeOpen(done,type){
        this.cogIds=[];
        done();
      },
      getList(page, params) {
        this.tableLoading = true
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;

          this.tableLoading = false
        })
      },
      updateHandel(row, index){
        this.editform=row;
        this.cogIds=row.cogIds;
        this.dialogFormVisible=true;
      },
      /**
       * @title 数据更新
       * @param row 为当前的数据
       * @param index 为当前更新数据的行数
       * @param done 为表单关闭函数
       *
       **/
      handleUpdate: function (row, index, done) {
        row.cogId=this.cogIds.toString();
        putObj(row).then(data => {
          this.tableData.splice(index, 1, Object.assign({}, row))
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          this.refreshChange()
          done()
        })
      },
      updateDate(){
        var cogIds=[];
        for(var i=0;i<this.cogIds.length;i++){
          cogIds.push(this.cogIds[i][2])
        }
        this.editform.cogId=cogIds.toString();
        putObj(this.editform).then(data => {
          // this.tableData.splice(index, 1, Object.assign({}, row))
          if(data.data.data){
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible=false;
            this.refreshChange();
          }else {
            this.$message.error(data.data.msg)
          }


        })
      },
      /**
       * @title 数据添加
       * @param row 为当前的数据
       * @param done 为表单关闭函数
       *
       **/
      handleSave: function (row, done) {
        var cogIds=[];
        for(var i=0;i<this.cogIds.length;i++){
          cogIds.push(this.cogIds[i][2])
        }
        row.cogId=cogIds.toString();
        addObj(row).then(data => {
          this.tableData.push(Object.assign({}, row))
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          })
          this.refreshChange()
          done()
        })
      },
      handleDel(row, index) {
        this.$refs.crud.rowDel(row, index)
      },
      rowDel: function (row, index) {
        var _this = this
        this.$confirm('是否确认删除指标名称为"' + row.nomName + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return delObj(row.nomId)
        }).then((res) => {
          if(res.data.code === 0){
            _this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
          }else{
            this.$message.error();
          }
          this.getList(this.page)
        }).catch(function () {
        })
      },
      searchChange(form) {
        form.cogId = form.cogIds ? form.cogIds[2] : "";
        this.getList(this.page, form)
      },
      /**
       * 刷新回调evaReport
       */
      refreshChange() {
        this.getList(this.page)
      },
      getConfigByType(){
        modelTypeOptionTree("modelType").then(res=>{
          this.modelTypeOption=this.getTreeData(res.data.data);

        })
      },
      getTreeData(data){
        // 循环遍历json数据
        for(var i=0;i<data.length;i++){

          if(data[i].children==null||data[i].children.length<1){
            // children若为空数组，则将children设为undefined
            data[i].children=undefined;
          }else {
            // children若不为空数组，则继续 递归调用 本方法
            this.getTreeData(data[i].children);
          }
        }
        return data;
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

