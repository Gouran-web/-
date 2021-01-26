<template>
  <div class="execution">
    <basic-container>
      <avue-crud ref="crud"
                 :page="page"
                 :data="tableData"
                 :table-loading="tableLoading"
                 :option="tableOption"
                 @refresh-change="searchChange"
                 @on-load="searchChange"
                 @search-change="searchChange">
        <template slot="modelName" slot-scope="scope" >
          <el-link type="primary" @click="handleView(scope.row.modelId)">{{scope.row.modelName}}</el-link>
        </template>
        <template slot="search">
          <el-col :md="11" :xs="24">
            <el-form-item label="搜索条件">
              <el-select v-model="searchForm.searchType" placeholder="请选择搜索条件">
                <el-option
                  v-for="item in searchOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
<!--              <el-select v-if="searchForm.searchType === '模型类型'" v-model="searchForm.typeId">-->
<!--                <el-option-->
<!--                  v-for="item in typeOption"-->
<!--                  :key="item.cogId"-->
<!--                  :label="item.cogValue"-->
<!--                  :value="item.cogId">-->
<!--                </el-option>-->
<!--              </el-select>-->
              <el-cascader
                v-model="searchForm.typeIds"
                v-if="searchForm.searchType === '模型类型'"
                :options="typeOption"
                :props= "props">

              </el-cascader>
              <el-select v-if="searchForm.searchType === '提供单位'" v-model="searchForm.modelProvider">
                <el-option
                  v-for="(item, index) in unitOption"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="6" :xs="24">
            <el-form-item label="时间">
              <el-select v-model="searchForm.date">
                <el-option
                  v-for="item in dateOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog class="run-dialog" ref="runRef" width="80%" title="分析结果" :visible.sync="analysisVisible">
      <avue-crud
          :data="analysisData"
          :option="analysisOption"
          :page="anaPage"
          :table-loading="anaLoading"
          @search-change="searchAnaChange"
          @on-load="getAnaList">
        <template slot="search">
          <el-form-item label="日期">
            <el-date-picker
              v-model="dialogSearchForm.datetimerange"
              type="datetimerange"
              value-format="yyyy-MM-dd hh:mm:ss"
              format="yyyy-MM-dd hh:mm:ss"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
        </template>
      </avue-crud>
    </el-dialog>
  </div>
</template>

<script>
  import {queryModelRunById} from '@/api/model/modelRun'
  import { modelTypeOption, getModelProvider, fetchList,modelTypeOptionTree} from '@/api/model/modelEva/evaReport'
  import {tableOption, analysisOption} from '@/const/crud/model/modelEva/evaReport'
  import {mapGetters} from 'vuex'

  export default {
    name: 'evaReport',
    data() {
      return {
        analysisVisible: false,
        dialogSearchForm: {"datetimerange": []},
        analysisData: [],
        analysisOption: analysisOption,
        analysisId: "",
        anaLoading: false,
        props:{
          label: "cogValue",
          value: "cogId",
          children:"children"
        },
        anaPage: {
          pageSizes: [5,10,15,20,25],
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 5 // 每页显示多少条
        },


        searchForm: {
          searchType: '模型类型',
          date: '最近一周',
          typeId: "",
          typeIds:[],
        },
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        tableLoading: false,
        tableOption: tableOption,
        searchOption: [{
          value: '模型类型',
          label: '模型类型'
        },{
          value: '提供单位',
          label: '提供单位'
        }],
        typeOption:[],
        unitOption:[],
        dateOption: [{
          value: '最近一周',
          label: '最近一周'
        },{
          value: '最近一月',
          label: '最近一月'
        },{
          value: '最近一年',
          label: '最近一年'
        }]
      }
    },

    mounted: function () {
    },
    computed: {
      ...mapGetters(['permissions']),
    },
    beforeCreate(){
      modelTypeOptionTree("modelType").then(res => {
        this.typeOption = res.data.data;
        // this.searchForm.typeId = res.data.data[0].cogId;
        this.searchChange(this.searchForm)
      })
      getModelProvider().then(res => {
        this.unitOption = res.data.data;
      })
    },
    created() {

    },
    methods: {
      //运行结果
      searchAnaChange(form){
        this.getAnaList(this.anaPage, form)
      },
      getAnaList(anaPage, params) {
        this.anaLoading = true
        const paramsData = {
          current: anaPage.currentPage,
          size: anaPage.pageSize,
          modelId: this.analysisId,
          startTime: this.dialogSearchForm.datetimerange ? this.dialogSearchForm.datetimerange[0] : "",
          endTime: this.dialogSearchForm.datetimerange ? this.dialogSearchForm.datetimerange[1] : ""
        }
        queryModelRunById(paramsData).then(response => {
          this.anaLoading = false
          if(response.data.code === 0){
            this.analysisData = response.data.data.records
            this.anaPage.total = response.data.data.total
          }else{
            this.$message.error(response.data.msg);
          }
        })
      },
      handleView(modelId){
        this.analysisVisible = true;
        this.analysisId = modelId
        var currentDate = new Date();
        if(this.searchForm.date === '最近一周'){
          currentDate.setDate(currentDate.getDate() - 7);
        }else if(this.searchForm.date === '最近一月'){
          currentDate.setMonth(currentDate.getMonth() - 1);
        }else if(this.searchForm.date === '最近一年'){
          currentDate.setYear(currentDate.getFullYear() - 1);
        }
        this.dialogSearchForm.datetimerange = [currentDate, new Date()]
        // this.dialogSearchForm.datetimerange = [currentDate, currentDate.setDate(currentDate.getDate() + 3)]
        this.searchAnaChange(this.dialogSearchForm);
      },

      getList(page, params) {
        this.tableLoading = true
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {

          // let dataJSON = {
          //   code:0,
          //   data:{
          //       assVerdict:[
          //           {"cName": '计算平均延迟时间', "eName": 'name1'},
          //           {"cName": '预警平均提前时间', "eName": 'name2'},
          //         ],
          //         records:[
          //           {"name1":"5min", "name2":"5天", "modelId":"dc2bc2ebabab4e59bc1b22b6b178b0ec",modelName:"测试模型名称1","cogValue":"油井故障诊断","modelProvider":"ali","assId":"89820c214bd3cb077ba90c57d4d013c","assTime":"2019-11-19 15:29:42","assVerdict":"{\"计算平均延迟时间\":\"5min\",\"预警平均提前时间\":\"15天\",\"故障诊断准确率\":\"98%\",\"故障诊断漏失率\":\"2%\"}"},
          //           {"modelId":"dc2bc2ebabab4e59bc1b22b6b178b0ec","modelName":"测试模型名称1","cogValue":"油井故障诊断","modelProvider":"ali","assId":"89820c214bd3cb077ba90c57d4d012a","assTime":"2019-11-19 15:29:38","assVerdict":"{\"计算平均延迟时间\":\"5min\",\"预警平均提前时间\":\"15天\",\"故障诊断准确率\":\"98%\",\"故障诊断漏失率\":\"2%\"}"}
          //         ],
          //         "total":2,"size":10,"current":1,"orders":[],"searchCount":true,"pages":1},"msg":"执行成功"}

          this.tableOption.column = [{
            label: '模型类型',
            prop: 'cogValue'
          },{
            label: '模型名称',
            prop: 'modelName',
            slot:true
          },{
            label: '模型开发商',
            prop: 'modelProvider',
            type: 'text'
          },{
            label: '计算平均延迟时间(分钟)',
            prop: 'avgDelayTime'
          },{
            label: '模型版本变更次数(次)',
            prop: 'venChangeSize'
          },{
            label: '预警平均提前时间(天)',
            prop: 'avgWarnTime'
          },{
            label: '故障诊断准确率(%)',
            prop: 'warnYesSize'
          },{
            label: '故障诊断漏失率(%)',
            prop: 'warnNoSize'
          },{
            label: '综合评分',
            prop: 'assScore'
          }]
          // if(response.data.data.assVerdict){
          //   response.data.data.assVerdict.forEach(ele => {
          //     this.tableOption.column.push(
          //       {
          //         label: ele.cName,
          //         prop: ele.eName
          //       }
          //     )
          //   })
          // }
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.tableLoading = false
        })
      },
      searchChange(form) {
        var currentDate = new Date();
        if(this.searchForm.date === '最近一周'){
          currentDate.setDate(currentDate.getDate() - 7);

        }else if(this.searchForm.date === '最近一月'){
          currentDate.setMonth(currentDate.getMonth() - 1);
        }else if(this.searchForm.date === '最近一年'){
          currentDate.setYear(currentDate.getFullYear() - 1);
        }
        let searchData = {
          startTime: currentDate,
          endTime: new Date().setHours(new Date().getHours()+8)
        }
        if(this.searchForm.searchType === '模型类型'){
          searchData.typeId = this.searchForm.typeIds[2];
        }else if(this.searchForm.searchType === '提供单位'){
          searchData.modelProvider = this.searchForm.modelProvider;
        }
        this.getList(this.page, searchData)
      },
    }
  }
</script>

<style lang="scss" scoped>
</style>

