//列表option
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  align: 'center',
  menu: false,
  addBtn: false,
  labelWidth: 100,
  column: []
}

//分析结果
export const analysisOption = {
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
      label: '模型名称',
      prop: 'modelName'
    },{
      label: '模型类型',
      prop: 'cogValue'
    },{
      label: '实例名称',
      prop: 'impName'
    },{
      label: '模型计算分析时间',
      prop: 'resRxecTime'
    },{
      label: '模型计算结果',
      prop: 'resResult'
    },{
      label: '模型计算结果描述',
      prop: 'resDesc'
    },{
      label: '计算结果处置',
      prop: 'resHandle'
    }
  ]
}
