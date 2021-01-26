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
  menuWidth:283,
  column: [
    {
      label: '模型名称',
      prop: 'modelName',
      type: 'text',
      search: true,
      slot:true
    },{
      label: '模型类型',
      prop: 'typeId',
      type: 'select',
      dicUrl: '/model/cog/getParentConfigByType?type=modelType',
      props: {
        label: "cogValue",
        value: "cogId",
        children:"children"
      }
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
  }
    ,{
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
    },
    {
      label: '版本',
      prop: 'versionId',
      width: 80
    },
    {
      label: '模型开发商',
      prop: 'modelProvider',
      overHidden: true,
      type: 'text',
      search: true
    },
    {
      label: '是否发布',
      prop: 'publishStatus',
      type: 'select',
      width: 80,
      dicData: [{
        value: '未发布',
        label: '未发布'
      }, {
        value: '已发布',
        label: '已发布'
      }],
      search: true
    },
    {
      label: '模型上线时间',
      width: 160,
      prop: 'enabledTime'
    },
    {
      label: "作用对象",
      prop: "dxid",
      type: 'select',
      hide: true,
      dicUrl: '/model/iwellfljkdx/getJkdxByAll',
      props: {
        label: "dxid",
        value: "dxmc"
      },
      rules: [{
        required: true,
        message: '请选择作用对象',
        trigger: 'change'
      }]
    }
  ]
}
//发布版本
export const publicOption = {
  menuBtn: true,
  submitText: '发布',
  emptyText: '取消',
  column: [{
    label: "版本描述",
    prop: "venDescription",
    type: 'textarea',
    span: 24,
    rules: [{
      required: true,
      message: '请输入版本描述',
      trigger: 'blur'
    }]
  }]
}
//关联实例
export const exampleOption = {
  menuBtn: true,
  submitText: '确定',
  emptyText: '取消',
  column: [{
    label: "实例对象",
    prop: "impIds",
    formslot:true,
    span: 24
  }]
}

//模型注册option
export const formOption = (state, typeData,typeOption) => {
  return {
    menuBtn: true,
    emptyBtn: true,
    submitBtn: true,
    submitText: '保存',
    labelWidth: 170,
    gutter:10,
    column: [{
      label: "模型名称",
      prop: "modelName",
      disabled: false,
      rules: [{
        required: true,
        message: '请输入模型名称',
        trigger: 'blur'
      }]
    },{
      label: "模型开发商",
      prop: "modelProvider",
      rules: [{
        required: true,
        message: '请输入模型开发商',
        trigger: 'blur'
      }]
    },{
      label: "模型编码",
      prop: "modelCode",
      rules: [{
        required: true,
        message: '请输入模型编码(自定义，建议与模型云服务名一致)',
        trigger: 'blur'
      }]
    },{
      label: "模型类型",
      prop: "typeIds",
      type: 'cascader',
      dicData: typeData,
      props: {
        label: "cogValue",
        value: "cogId",
        children:'children'
      },
      rules: [{
        required: true,
        message: '请选择模型类型',
        trigger: 'change'
      }]
    },
    {
      label: "作用对象",
      prop: "objectId",
      type: 'select',
      dicData: typeOption,
      props: {
        label: "dxmc",
        value: "dxid"
      },
      rules: [{
        message: '请选择作用对象',
        trigger: 'change'
      }]
    },
    {
      label: "驱动数据类型",
      prop: "drivingDataType",
      type: 'select',
      dicData: [{
        label: '原始数据',
        value: 'frontPurgeData'
      }, {
        label: '优化数据',
        value: 'afterPurgeData'
      }],
      rules: [{
        required: true,
        message: '驱动数据类型',
        trigger: 'change'
      }]
    },
    // {
    //   label: "驱动表达式",
    //   prop: "drivingExp",
    //   disabled: state,
    //   rules: [{
    //     required: true,
    //     message: '请输入模型开发商',
    //     trigger: 'blur'
    //   }]
    // },

    // {
    //   label: "模型启用接口",
    //   prop: "startAddress",
    //   // span: 24,
    //   // formslot:true,
    //   rules: [{
    //     required: true,
    //     message: '请输入模型启用接口的接口信息',
    //     trigger: 'blur'
    //   }]
    // },{
    //   label: "模型停用接口",
    //   prop: "stopAddress",
    //   // span: 24,
    //   // formslot:true,
    //   rules: [{
    //     required: true,
    //     message: '请输入模型停用接口的接口信息',
    //     trigger: 'blur'
    //   }]
    // },{
    //   label: "模型运行状态查询接口",
    //   prop: "queryAddress",
    //   // span: 24,
    //   // formslot:true,
    //   rules: [{
    //     required: true,
    //     message: '请输入模型运行状态查询接口的接口信息',
    //     trigger: 'blur'
    //   }]
    // },

    {
      label: "模型驱动接口",
      prop: "interfaces1",
      span: 24,
      formslot:true,
      rules: [{
        required: true,
        message: '请编辑模型驱动接口的接口信息',
        trigger: 'blur'
      }]
    },
    {
      label: "模型分析结果查看地址",
      prop: "resultAddress",
    },
    {
      label: "模型描述",
      prop: "modelDescription",
      type: "textarea",
      span: 24,
      rules: [{
        required: true,
        message: '请输入模型描述',
        trigger: 'blur'
      }]
    }]
  }
}
//编辑接口信息option  tab1
export const firstOption = (state) => {
  return {
    menuBtn: true,
    emptyBtn: false,
    submitText: '下一步',
    column:[{
      label:'接口地址',
      prop:'ineName',
      span: 24,
      disabled: state,
      rules: [{
        required: true,
        message: '请输入接口地址',
        trigger: 'blur'
      }]
    },
    // {
    //   label:'作用对象',
    //   prop:'objectId',
    //   type:'select',
    //   disabled: state,
    //   rules: [{
    //     required: true,
    //     message: '请选择作用对象',
    //     trigger: 'blur'
    //   }]
    // },
    {
      label: "请求示例",
      prop: "ineExampleRequest",
      type: "textarea",
      span: 24,
      disabled: state,
      rules: [{
        required: true,
        message: '请输入请求示例',
        trigger: 'blur'
      }]
    },{
      label: "返回示例",
      prop: "ineExampleReturn",
      type: "textarea",
      span: 24,
      disabled: state,
      rules: [{
        required: true,
        message: '请输入返回示例',
        trigger: 'blur'
      }]
    }]
  }
}
export const secondOption = [
  {cName: '驱动参数', eName: 'cslx'},
  {cName: '参数编码', eName: 'csmc'},
  // {cName: '是否必填', eName: 'mustInput'},
  {cName: '说明', eName: 'csDetails'}
]
export const thirdOption = [
  {cName: '参数名称', eName: 'csmc'},
  {cName: '类型', eName: 'cslx'},
  {cName: '说明', eName: 'csDetails'}
]

