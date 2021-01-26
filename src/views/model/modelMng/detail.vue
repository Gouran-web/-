<template>
  <div class="detail-wrap">
    <avue-form ref="formName" :option="formOption" class="model-reg" v-model="formData" @submit="handleSave">

      <template slot="interfaces1">
        <el-row>
        <el-col :span="15">
          <el-input disabled v-model="formData.interfaces1"></el-input>
        </el-col>
        <el-col :span="5">
          <el-button class="form-edit-btn" type="primary" @click="openEdit('1')">编辑接口信息</el-button>
        </el-col>
      </el-row>
      </template>
      <template slot="menuForm">
          <el-button @click="closePage"><i class="el-icon-delete"></i><span>取消</span></el-button>
      </template>
    </avue-form>
    <el-dialog ref="interface" width="60%" title="编辑接口信息" :visible.sync="innerVisible" :before-close="closeDialog">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="1.接口信息" name="first">
          <avue-form ref="firstForm" :option="firstOption" v-model="firstData" @submit="handleSubmit">
          </avue-form>
        </el-tab-pane>
        <el-tab-pane label="2.驱动参数" name="second">
          <el-row>
            <div v-if="!viewType" class="t-right">
              <el-button type="primary" @click="addTab1(secondData.length)">加一条</el-button>
            </div>
            <el-table class="dialog-tab" :data="secondData" :show-summary="false" border stripe highlight-current-row>
              <el-table-column v-for="(titItem, titIndex) in secondOption" :property="titItem.eName" :key="titIndex" :label="titItem.cName" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div v-if="!viewType">
                    <!-- <div v-if="scope.column.property === 'mustInput'"> -->
                      <!-- <el-select v-model="scope.row[scope.column.property]" placeholder="请选择" size="small">
                        <el-option
                          v-for="item in mustOption"
                          :key="item.cogId" :label="item.cogValue" :value="item.cogValue">
                        </el-option>
                      </el-select> -->
                    <!-- </div> -->
                    <div v-if="scope.column.property === 'cslx'">
                      <el-select v-model="scope.row[scope.column.property]" placeholder="请选择" size="small">
                        <el-option
                          v-for="item in qdcsOption"
                          :key="item.csid" :label="item.csmc" :value="item.csbm" >
                        </el-option>
                      </el-select>
                    </div>
                    <el-input v-else v-model="scope.row[scope.column.property]" size="small"></el-input>
                  </div>
                  <span v-else>{{scope.row[scope.column.property]}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" v-if="!viewType" label="操作" fixed="right" width="100">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="light" content="添加" placement="top">
                    <i @click="addTab1(scope.$index)" class="el-icon-circle-plus"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="删除" placement="top">
                    <i @click="removeTab1(scope.$index)" class="el-icon-remove"></i>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row class="saveCancel">
            <el-col :span="24">
              <el-button type="primary" @click="tabSwitch('first')">
                <i class="el-icon-back"></i>
                上一步
              </el-button>
              <!-- <el-button type="primary" style="margin-left: 8px;" @click="tabSwitch('third')">
                <i class="el-icon-right"></i>
                下一步
              </el-button> -->

               <el-button v-if="!viewType" type="primary" @click="checkInterface(firstData.ineName)" style="margin-left: 8px;">
                测试接口
              </el-button>
              <el-button v-if="!viewType" type="primary" @click="saveInterface" style="margin-left: 8px;">
                保存
              </el-button>
              <el-button v-if="viewType" @click="closeDialog"><i class="el-icon-delete"></i><span>取消</span></el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- <el-tab-pane label="3.返回参数" name="third">
          <el-row>
            <div v-if="!viewType" class="t-right">
              <el-button type="primary" @click="addTab2(thirdData.length)">加一条</el-button>
            </div>
            <el-table class="dialog-tab" :data="thirdData" :show-summary="false" border stripe highlight-current-row>
              <el-table-column v-for="(titItem, titIndex) in thirdOption" :property="titItem.eName" :key="titIndex" :label="titItem.cName" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div v-if="!viewType">
                    <div v-if="scope.column.property === 'cslx'">
                      <el-select v-model="scope.row[scope.column.property]" placeholder="请选择" size="small">
                        <el-option
                          v-for="item in typeOption"
                          :key="item.cogId" :label="item.cogValue" :value="item.cogValue">
                        </el-option>
                      </el-select>
                    </div>
                    <el-input v-else v-model="scope.row[scope.column.property]" size="small"></el-input>
                  </div>
                  <span v-else>{{scope.row[scope.column.property]}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" v-if="!viewType" label="操作" fixed="right" width="100">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="light" content="添加" placement="top">
                    <i @click="addTab2(scope.$index)" class="el-icon-circle-plus"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="删除" placement="top">
                    <i @click="removeTab2(scope.$index)" class="el-icon-remove"></i>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row class="saveCancel">
            <el-col :span="24">
              <el-button type="primary" @click="tabSwitch('second')">
                <i class="el-icon-back"></i>
                上一步
              </el-button>
              <el-button v-if="!viewType" type="primary" @click="checkInterface(firstData.ineName)" style="margin-left: 8px;">
                测试接口
              </el-button>
              <el-button v-if="!viewType" type="primary" @click="saveInterface" style="margin-left: 8px;">
                保存
              </el-button>
              <el-button v-if="viewType" @click="closeDialog"><i class="el-icon-delete"></i><span>取消</span></el-button>
            </el-col>
          </el-row>
        </el-tab-pane> -->
      </el-tabs>
    </el-dialog>


  </div>
</template>

<script>
  import { modelTypeOption,drivingParams,getJkdxByAll,modelTypeOptionTree } from '@/api/model/modelEva/evaReport'
  import {addObj, getObj, putObj, checkInterface} from '@/api/model/modelMng'
  import {formOption, firstOption, secondOption, thirdOption} from '@/const/crud/model/modelMng'
  import { formatDate } from '@/util/date';
  export default {
    name: 'modelMngDetail',
    data() {
      return {
        updateType: false,
        viewType: false,
        formOption: formOption,
        innerVisible: false,
        formData: {},
        activeName: "first",
        firstOption: firstOption,
        secondOption: secondOption,
        thirdOption: thirdOption,
        tabsAll1: {},
        firstData: {},
        secondData: [],
        thirdData:[],
        editText: false,
        dialogIndex: "1",
        // mustOption: [],
        qdcsOption: [],
        typeOption: [],
        modelOption:[],
      }
    },
    beforeCreate(){
      // modelTypeOption("isMust").then(res => {
      //   this.mustOption = res.data.data;
      // })
      getJkdxByAll().then(res => {
        this.typeOption = res.data.data;
      })
       drivingParams().then(res => {
        this.qdcsOption = res.data.data;
      })
    },
    created() {
    },
    mounted: function () {
    },
    methods: {

      formatDate(time) {
        const date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      },
      getValue(data){
        localStorage.setItem("queryData", JSON.stringify(data));
        modelTypeOptionTree("modelType").then(res => {
          if (JSON.parse(localStorage.getItem("queryData")).type === 'update') {

            // this.formOption.submitBtn=undefined
            this.formOption = formOption(false, res.data.data,this.typeOption);
            this.modelOption=res.data.data;
            this.firstOption = firstOption(false);
            this.updateType = true;
            this.createdList(data.id);
          } else if (JSON.parse(localStorage.getItem("queryData")).type === 'view') {
            this.formOption = formOption(true, res.data.data,this.typeOption);
            this.firstOption = firstOption(true);
            this.viewType = true;
            this.createdList(data.id);
          }else{
            this.formOption = formOption(false, res.data.data,this.typeOption);
            this.firstOption = firstOption(false);
          }
        })
      },
      //
      createdList(id){
        getObj(id).then(response => {
          this.formData = response.data.data;
          console.log(this.formData)
          this.formData.interfaces1 = response.data.data.interfaces[0].ineName,
          // this.formData.interfaces2 = response.data.data.interfaces[1].ineName
          // this.formData.interfaces3 = response.data.data.interfaces[2].ineName
          // this.f ormData.interfaces4 = response.data.data.interfaces[3].ineName
          this.tabsAll1 = response.data.data.interfaces[0]
          // this.tabsAll2 = response.data.data.interfaces[1]
          // this.tabsAll3 = response.data.data.interfaces[2]
          // this.tabsAll4 = response.data.data.interfaces[3]
        })
      },
      openEdit(i){
        this.firstData= {};
        this.secondData= [];
        this.thirdData= [];
        this.activeName= "first";
        this.dialogIndex = i;
        this.innerVisible = true;
        if(!this.isEmptyObject(this[`tabsAll${i}`])){
          this.firstData= this[`tabsAll${i}`];
          this.secondData= this[`tabsAll${i}`].interfaceParames.length > 0 ? this[`tabsAll${i}`].interfaceParames : [];
          this.thirdData= this[`tabsAll${i}`].returnParames.length > 0 ? this[`tabsAll${i}`].returnParames : [];
        }
      },
      isEmptyObject(obj) {
    　　for (var key in obj){
    　　　　return false;
    　　}　　
    　　return true;
      },
      saveInterface(){
        let interfaceParamesData = []
        this.secondData.forEach(element => {
          if(element!={}){
            element.paeType = 1;
            interfaceParamesData.push(element);
          }
        });
        let returnParamesData = []
        this.thirdData.forEach(element => {
          if(element!={}){
            element.paeType = 2;
            returnParamesData.push(element);
          }
        });
        let conclusion = {
          "ineExampleRequest": this.firstData.ineExampleRequest,
          "ineExampleReturn": this.firstData.ineExampleReturn,
          "ineName": this.firstData.ineName,
          "ineType": this.dialogIndex,
          "interfaceParames": interfaceParamesData,
          "returnParames": returnParamesData,
          "ineId":this.firstData.ineId
        }

        this.formData[`interfaces${this.dialogIndex}`] = this.firstData.ineName;
        this[`tabsAll${this.dialogIndex}`] = conclusion;
        this.closeDialog();
      },
      checkInterface(url){
        checkInterface({'address': url}).then(data => {
          this.$message({
            showClose: true,
            message: '测试成功',
            type: 'success'
          })
        })
      },
      addTab1(rowIndex){
        this.secondData.splice(rowIndex+1, 0, {});
      },
      removeTab1(rowIndex){
        this.secondData.splice(rowIndex, 1);
      },
      addTab2(rowIndex){
        this.thirdData.splice(rowIndex+1, 0, {});
      },
      removeTab2(rowIndex){
        this.thirdData.splice(rowIndex, 1);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      tabSwitch(tabName){
        this.activeName = tabName;
      },
      handleSubmit(form,done){
        this.activeName = "second";
        setTimeout(()=>{
          done()
        },3000)
      },
      closeDialog(){
        this.$refs.firstForm.resetForm();
        this.innerVisible = false;
      },
      /**
       * @title 数据更新
       * @param row 为当前的数据
       * @param index 为当前更新数据的行数
       * @param done 为表单关闭函数
       *
       **/
      handleUpdate: function (row, index, done) {

      },
      /**
       * @title 数据添加
       * @param row 为当前的数据
       * @param done 为表单关闭函数
       *
       **/
      handleSave: function (form,done) {
        let interfaceData = [];
        interfaceData.push(this.tabsAll1);
        let postData = {
          "createTime": this.formatDate(new Date()),
          "modelName": this.formData.modelName,
          "modelProvider": this.formData.modelProvider,
          "modelCode": this.formData.modelCode,
          "typeId": this.formData.typeIds[2],
          "objectId": this.formData.objectId,
          "drivingDataType": this.formData.drivingDataType,
          // "startAddress": this.formData.startAddress,
          // "stopAddress": this.formData.stopAddress,
          // "queryAddress": this.formData.queryAddress,
          "resultAddress": this.formData.resultAddress,
          "interfaces": interfaceData,
          "modelDescription": this.formData.modelDescription,
        }
        if(JSON.parse(localStorage.getItem("queryData")).type !== 'update'){
          addObj(postData).then(res => {
            if(res.data.code === 0){
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.tableLoading = false;
              this.closePage();
              done();
            }else{
              this.$message.error(res.data.msg);
              setTimeout(()=>{
                done()
              },3000)
            }
          })
        }else{
          postData.modelId = JSON.parse(localStorage.getItem("queryData")).id;
          putObj(postData).then(res => {
            if(res.data.code === 0){
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              this.tableLoading = false;
              this.closePage();
              done();
            }else{
              this.$message.error(res.data.msg);
              setTimeout(()=>{
                done()
              },3000)
            }

          })
        }

      },
      /**
       * @title 跳转关闭页签
       *
       **/
      closePage(){
        this.$refs.formName.resetForm()
        this.$emit('closeDetail');
        localStorage.clear();

        // this.$router.push({ path: '/modelMng/index', query: { page: this.$route.query.page } });
      },

    }
  }
</script>

<style lang="scss" scoped>
.detail-wrap{ background: #fff; padding-top: 30px;}
.form-edit-btn{ margin-left: 10px;}
.el-icon-circle-plus, .el-icon-remove{ font-size: 30px; color: #145B9B; cursor: pointer;}
.t-right{ text-align: right;}
.saveCancel{ text-align: center; margin-top: 20px;}
</style>
<style>
.model-reg .el-input-group__append{ cursor: pointer;}
.dialog-tab.el-table th{ background: #fafafa;}
</style>

