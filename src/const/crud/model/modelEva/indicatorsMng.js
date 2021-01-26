//列表option
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  align: 'center',
  addBtn: true,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  labelWidth: 100,
  menuWidth: 223,
  dialogTop: 50,
  dialogHeight: 320,
  column: [{
      label: '指标名称',
      prop: 'nomName',
      type: 'text',
      search: true,
    },
    {
      label: '模型类型',
      prop: 'configValue',
      addDisplay:false,
      editDisplay:false,
      formslot: true,
      slot: true,
      overHidden: true,
    },
    {
      label: '模型类型',
      prop: 'cogIds',
      type: 'cascader',
      dicUrl: '/model/cog/getParentConfigByType?type=modelType',
      hide: true,
      formslot:true,
      search: true,
      props: {
        label: "cogValue",
        value: "cogId",
        children:"children"
      },

    },{
      label: '计算规则',
      prop: 'nomRule'
    },{
      label: '评价周期',
      prop: 'nomCycle',
      type: 'select',
      dicData: [{
        value: '每天',
        label: '每天'
      }, {
        value: '每周',
        label: '每周'
      }, {
        value: '每月',
        label: '每月'
      }]
    },{
      label: '评价说明',
      prop: 'nomDesc',
      span: 24,
      type: 'textarea',
      slot:true
    }
  ]
}

