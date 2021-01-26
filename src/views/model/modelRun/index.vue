<template>
  <div class="execution">
    <basic-container>
      <avue-crud ref="crud" class="model-run-tab"
                 :page="page"
                 :data="tableData"
                 :table-loading="tableLoading"
                 @refresh-change="searchChange"
                 :option="tableOption"
                 @on-load="getList"
                 @search-change="searchChange">
        <template slot="objectId" slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.objectId" placement="top">
            <div class="ellipsis1">{{scope.row.objectId}}</div>
          </el-tooltip>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button type="text"
                     icon="el-icon-position"
                     size="mini"
                     plain
                     @click="openRunConfig(scope.row.modelId)">运行配置
          </el-button>
          <el-button v-if="scope.row.modelRunStatus === '1'" type="text"
                     icon="el-icon-circle-close"
                     size="mini"
                     plain
                     @click="stopStatus(scope.row.modelId)">停用
          </el-button>
          <el-button v-else type="text"
                     icon="el-icon-circle-check"
                     size="mini"
                     plain
                     @click="enableStatus(scope.row.modelId)">启用
          </el-button>
          <el-button type="text"
                     icon="el-icon-position"
                     size="mini"
                     plain
                     @click="runCondition(scope.row.modelId)">运行情况
          </el-button>
          <el-button type="text"
                     icon="el-icon-document-remove"
                     size="mini"
                     plain
                     @click="operatLog(scope.row.modelId)">操作日志
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog class="run-dialog" ref="runRef" width="60%" title="运行结果" :visible.sync="runVisible">
      <avue-crud
        :data="runData"
        :option="runOption"
        :page="runPage"
        :table-loading="runLoading"
        @search-reset="runReset"
        @search-change="searchRunChange"
        @on-load="getRunList">
        <template slot="search">
          <el-form :inline="true">
            <el-form-item label="起止时间">

              <el-date-picker
                v-model="searchForm.startTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="searchForm.endTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择结束时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </template>
      </avue-crud>
    </el-dialog>
    <el-dialog class="run-dialog" ref="logRef" width="50%" title="操作日志" :visible.sync="logVisible">
      <avue-crud
        :data="logData"
        :option="logOption"
        :page="logPage"
        :table-loading="logLoading"
        @search-reset="logReset"
        @search-change="searchLogChange"
        @on-load="getLogList">
        <template slot="search">
          <el-form :inline="true">
            <el-form-item label="起止时间">

              <el-date-picker
                v-model="searchForm.startTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="searchForm.endTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择结束时间">
              </el-date-picker>
            </el-form-item>
          </el-form>

        </template>
      </avue-crud>
    </el-dialog>
    <el-dialog  width="50%" :label-position="labelPosition" title="模型运行配置" :visible.sync="runConfigVisible">
      <el-form  :model="modelInfo" label-width="200px">
        <el-form-item label="模型启用接口:">
          <el-col :span="20">
            <el-input v-model="modelInfo.startAddress"></el-input>
          </el-col>

        </el-form-item>
        <el-form-item label="模型停用接口:">
          <el-col :span="20">
            <el-input v-model="modelInfo.stopAddress"></el-input></el-col>
        </el-form-item>
        <el-form-item label="模型运行状态查询接口:">
          <el-col :span="20">
            <el-input v-model="modelInfo.queryAddress"></el-input></el-col>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="runConfigVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveModelInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchList, enableModel, stopModel, queryModelRunById, queryModelLogById,getModelInfo,saveModelAddress} from '@/api/model/modelRun'
  import {tableOption, runOption, logOption} from '@/const/crud/model/modelRun'
  import {mapGetters} from 'vuex'
  import { formatDate } from '@/util/date';

  export default {
    name: 'modelRun',
    data() {
      return {
        labelPosition:'right',
        runVisible: false,
        logVisible: false,
        runConfigVisible:false,
        typeOptions: [],
        modelInfo:{
          startAddress:"",
          stopAddress:"",
          queryAddress:"",
        },
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        tableLoading: false,
        tableOption: tableOption,

        searchForm: {
          datetimerange: [],
          startTime: "",
          endTime: ""
        },
        runData: [],
        runOption: runOption,
        runId: "",
        runLoading: false,
        runPage: {
          pageSizes: [5, 10, 15, 20, 25],
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 5 // 每页显示多少条
        },

        logData: [],
        logOption: logOption,
        logId: "",
        logLoading: false,
        logPage: {
          pageSizes: [5, 10, 15, 20, 25],
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 5 // 每页显示多少条
        },
      }
    },
    created() {
    },
    mounted: function () {
    },
    computed: {
      ...mapGetters(['permissions']),
    },
    methods: {
      openRunConfig(modelId){
        this.runConfigVisible=true;
        this.getModelInfo(modelId);
      },
      getModelInfo(modelId){
        getModelInfo(modelId).then((res) =>{
        this.modelInfo=res.data.data;
        })

      },
      saveModelInfo(){
        var data={
          modelId:this.modelInfo.modelId,
          startAddress:this.modelInfo.startAddress,
          stopAddress:this.modelInfo.stopAddress,
          queryAddress:this.modelInfo.queryAddress,
        }
        saveModelAddress(data).then((res)=>{
        if(res.data.data){
          this.runConfigVisible=false;
          this.$message.success("配置成功");

        }else {
          this.$message.error(res.msg)
        }
        })

      },
      //运行结果
      runReset() {
        this.searchForm.startTime ="";
        this.searchForm.endTime ="";
      },
      searchRunChange(form) {
        this.getRunList(this.runPage, form)
      },
      getRunList(runPage, params) {
        this.runLoading = true;
        const paramsData = {
          current: runPage.currentPage,
          size: runPage.pageSize,
          modelId: this.runId,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime
        };
        queryModelRunById(paramsData).then(response => {
          this.runLoading = false
          if (response.data.code === 0) {
            this.runData = response.data.data.records;
            this.runPage.total = response.data.data.total;
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      runCondition(modelId) {
        this.runVisible = true;
        var timeVal = new Date();
        console.log(timeVal)
        var time_s = timeVal.getTime();
        timeVal.setTime(time_s - 1000 * 60 * 60 * 24 * 7);
        this.searchForm.startTime=formatDate(timeVal,'yyyy-MM-dd hh:mm:ss');
        this.searchForm.endTime=formatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
        this.runId = modelId;
        // this.runId = '87295e2e4ed64fb88b8cd4bf1bc5e0b7'
        // var currentDate = new Date();
        // currentDate.setDate(currentDate.getDate() - 3);
        // this.searchForm.datetimerange = [currentDate, new Date()]

        this.searchRunChange(this.searchForm);
      },
      //操作日志
      logReset() {
        this.searchForm.startTime = [];
        this.searchForm.endTime = [];
      },
      searchLogChange(form) {
        this.getLogList(this.logPage, form)
      },
      getLogList(logPage, params) {
        this.runLoading = true;
        // if(this.searchForm.startTime==undefined||this.searchForm.startTime==''){
        //   this.$message.info("请选择开始时间");
        //   return
        // }
        // if(this.searchForm.endTime==undefined||this.searchForm.endTime==''){
        //   this.$message.info("请选择结束时间")
        //   return;
        // }
        const paramsData = {
          current: logPage.currentPage,
          size: logPage.pageSize,
          modelId: this.logId,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime
        }
        queryModelLogById(paramsData).then(response => {
          this.runLoading = false
          if (response.data.code === 0) {
            this.logData = response.data.data.records
            this.logPage.total = response.data.data.total
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      operatLog(modelId) {
        this.logVisible = true;
        this.logId = modelId

        var timeVal = new Date();
        var time_s = timeVal.getTime();
        timeVal.setTime(time_s - 1000 * 60 * 60 * 24 * 7);
        // this.searchForm.datetimerange = [timeVal, new Date()]
        this.searchForm.startTime=formatDate(timeVal,'yyyy-MM-dd hh:mm:ss');
        this.searchForm.endTime=formatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
        this.searchLogChange(this.searchForm);
      },
      //列表
      getList(page, params) {
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
      searchChange(form) {
        form.objectId = form.objectId ? form.objectId[1] : "";
        form.typeId = form.typeIds ? form.typeIds[2] : "";
        this.getList(this.page, form)
      },
      stopStatus(modelId) {

        this.$confirm("此操作将停用系统, 是否继续?", "提示",
          {
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            cancelButtonClass: 'cancelButton',
            confirmButtonClass: 'confirmButton',
            type: "warning"
          }
        ).then(() => {
          stopModel(modelId).then(res => {
            if (res.data.code === 0) {
              this.$message({
                showClose: true,
                message: '停用成功',
                type: 'success'
              })
              this.getList(this.page)
            } else {
              this.$message.error(res.data.msg);
            }
          })
        });

      },
      enableStatus(modelId) {
        this.$confirm("此操作将启用系统, 是否继续?", "提示",
          {
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            // cancelButtonClass:'cancelButton',
            // confirmButtonClass:'confirmButton',
            type: "warning"
          }
        ).then(() => {
          enableModel(modelId).then(res => {
            if (res.data.code === 0) {
              this.$message({
                showClose: true,
                message: '启用成功',
                type: 'success'
              })
              this.getList(this.page)
            } else {
              this.$message.error(res.data.msg);
            }
          })
        });

      }


    }
  }
</script>

<style>
  .model-run-tab .avue-crud-search__search .el-form-item__label {
    width: 103px;
  }

  .run-dialog .avue-crud__menu {
    display: none;
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

