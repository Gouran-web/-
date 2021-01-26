//列表option
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  align: 'center',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  labelWidth: 100,
  menuWidth:223,
  column: [{
      label: '模型名称',
      prop: 'modelName',
      type: 'text',
      search: true,
    },{
      label: '模型类型',
      prop: 'typeId',
      type: 'select',
      dicUrl: '/model/cog/getConfigByType?type=modelType',
      props: {
        label: "cogValue",
        value: "cogId"
      },

    },{
    label: '模型类型',
    prop: 'typeIds',
    type: 'cascader',
    hide: true,
    dicUrl: '/model/cog/getParentConfigByType?type=modelType',
    props: {
      label: "cogValue",
      value: "cogId",
      children:"children"
    },
    search: true,
  },{
      label: '关联实例',
      prop: 'objectId',
      type: 'cascader',
      hide: true,
      dicUrl: '/model/exp/getExpAll',
      props: {
        label: "impName",
        value: "impId",
        children: 'expImps'
      },
      search: true,
      slot:true
    },{
      label: '版本',
      prop: 'versionId'
    },{
      label: '模型开发商',
      prop: 'modelProvider',
      type: 'text',
      search: true
    },{
      label: '模型上线时间',
      prop: 'enabledTime',
      width: 160

    },{
      label: '模型运行状态',
      prop: 'modelRunStatus',
      type: 'select',
      dicData: [{
        value: '1',
        label: '运行中'
      }, {
        value: '0',
        label: '停止'
      }],
      search: true
    }
  ]
}
//运行情况
export const runOption = {
  border: true,
  stripe: true,
  align: 'center',
  index: true,
  indexLabel: '序号',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  menu: false,
  // columnBtn:false,
  // searchBtn:false,
  // refreshBtn:false,
  labelWidth: 100,
  column: [{
      label: '实例名称',
      prop: 'impName'
    },{
      label: '模型计算分析时间',
      prop: 'resExecTime'
    },{
      label: '模型计算结果',
      prop: 'resResult'
    },{
      label: '模型计算结果描述',
      prop: 'resDesc'
    }
  ]
}
//操作日志
export const logOption = {
  border: true,
  stripe: true,
  align: 'center',
  index: true,
  indexLabel: '序号',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  menu: false,
  labelWidth: 100,
  column: [{
      label: '操作时间',
      prop: 'createTime'
    },{
      label: '操作用户',
      prop: 'createBy'
    },{
      label: '操作描述',
      prop: 'title'
    }
  ]
}

