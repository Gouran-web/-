<template>
  <div class="execution history-main">
    <el-form ref="form" :inline="true" :model="searchForm" label-width="85px">
      <el-form-item label="提供单位">
        <el-select v-model="searchForm.modelProvider" >
          <el-option
            v-for="(item, index) in unitOption"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模型名称">
        <el-select v-model="searchForm.modelId" >
          <el-option
            v-for="item in modelOption"
            :key="item.modelId"
            :label="item.modelName"
            :value="item.modelId">
          </el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="时间范围">-->
<!--        <el-date-picker v-model="searchForm.daterange" style="width:250px;"-->
<!--          type="daterange"-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item label="起止时间">
      <el-date-picker
        v-model="searchForm.startTime"
        type="date"
        placeholder="开始时间">
      </el-date-picker>
      <el-date-picker
        v-model="searchForm.endTime"
        type="date"
        placeholder="结束时间">
      </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="handleSubmit">搜 索</el-button>
        <el-button size="small" icon="el-icon-delete" @click="handleEmpty">清 空</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-form>
        <el-form-item label="评价指标" label-width="85px">
          <el-select v-model="nom" @change="nomChange" >
            <el-option
              v-for="item in nomOption"
              :key="item.nomId"
              :label="item.nomName"
              :value="item.nomId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div id="historyEcharts" style="width:100%; height:350px;"></div>
  </div>
</template>

<script>
  import { modelTypeOption, getModelProvider,getAllModel, getCharts, getNormByAll} from '@/api/model/modelEva/evaReport'
  import {mapGetters} from 'vuex'
 import echarts from 'echarts'

  export default {
    name: 'evaHistory',
    data() {
      return {
        searchForm: {
          daterange:[],
          startTime:"",
          endTime:"",
        },
        typeOption:[],
        unitOption:[],
        modelOption:[],
        nom: "",
        nomOption: []
      }
    },
    beforeCreate(){
      modelTypeOption("modelType").then(res => {
        this.typeOption = res.data.data;
        this.searchForm.typeId = this.typeOption[0].cogValue
      })
      getModelProvider().then(res => {
        this.unitOption = res.data.data;
        this.searchForm.modelProvider = this.unitOption[0]
      });
      getAllModel().then(res => {
        this.modelOption = res.data.data;
        this.searchForm.modelId = this.modelOption[0].modelId
        getNormByAll().then(res => {
          this.nomOption = res.data.data;
          this.nom = this.nomOption[0].nomId
          var currentDate = new Date();
          currentDate.setDate(currentDate.getDate() -30);
          this.searchForm.startTime =currentDate;
          this.searchForm.endTime =new Date();
          this.getCharts();
        })
      });

    },
    created() {

    },
    mounted: function () {
      this.createdEcharts()
    },
    computed: {
      ...mapGetters(['permissions']),
    },
    methods: {
      nomChange(item){
        this.getCharts();
      },
      handleEmpty(){
        // this.$refs.form.resetForm();
        this.searchForm= {
          daterange:[]
        }
      },
      handleSubmit(){
        this.$refs.form.validate(vaild=>{
          if(vaild){
            this.getCharts();
          }
        })
      },
      formatDate(date) {
        date = new Date(date)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        var d = date.getDate()

        return y + '-' + m + '-' + d
      },
      getCharts(){
        if (this.searchForm.startTime != undefined) {
          this.searchForm.startTime = this.formatDate(this.searchForm.startTime) + ' 00:00:00'
        }else {
          this.searchForm.startTime=undefined
        }
        if (this.searchForm.endTime != undefined) {
          this.searchForm.endTime = this.formatDate(this.searchForm.endTime) + ' 23:59:59'
        }else {
          this.searchForm.endTime=undefined
        }
        let searchData = {
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          modelProvider: this.searchForm.modelProvider,
          modelId: this.searchForm.modelId,
          nomId: this.nom
        }
        getCharts(searchData).then(response => {
          if(response.data.code==0){
            this.createdEcharts(response.data.data.title, response.data.data.dimension, response.data.data.assTime, response.data.data.assValue)
          }else {
            this.$message.error(response.data.msg);
          }

        })
      },
      createdEcharts(title, dimension, assTime, assValue) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('historyEcharts'));
        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                   return params[0].name + '<br/>' + params[0].seriesName + "：" + params[0].value +dimension;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: assTime
            },
            yAxis: [
                  {
                    type: 'value',
                    name: title,
                    axisLabel: {
                        formatter: '{value} '+dimension
                    }
                }
            ],
            series: [
                {
                    name: title,
                    type:'line',
                    stack: '总量',
                    data:assValue
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

      },
    }
  }
</script>
<style scoped>
.history-main{ background: #fff; padding: 15px 10px; margin: 0px 10px;}
</style>

