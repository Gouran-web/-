/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the www.dcoit.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */
export const tableOption = {
  border: true,
  selection: true,
  index: true,
  menuWidth: 300,
  indexLabel: '序号',
  stripe: true,
  labelWidth: 150,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  viewBtn: true,
  column: [{
    label: '数据类型名称',
    prop: 'dataTypeName',
    span: 24,
    rules: [
      {
        required: true,
        message: '数据类型名称不能为空',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 20,
        message: '长度在 3 到 20 个字符',
        trigger: 'blur'
      }]
  }, {
    width: 120,
    label: '取值列',
    prop: 'valueColumn',
    span: 24,
    editDisplay: true,
    addDisplay: true,
    rules: [
      {
        required: true,
        message: '取值列不能为空',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 20,
        message: '长度在 3 到 20 个字符',
        trigger: 'blur'
      }
    ]
  }, {
    width: 150,
    label: '权限列',
    prop: 'authColumn',
    editDisplay: true,
    addDisplay: true,
    overHidden: true,
    span: 24,
    value: '-1',
    rules: [
      {
        required: true,
        message: '权限列不能为空',
        trigger: 'blur'
      }
    ]
  }, {
    width: 150,
    label: '权限表',
    prop: 'valueTable',
    overHidden: true,
    editDisplay: true,
    addDisplay: true,
    span: 24,
    rules: [
      {
        required: true,
        message: '权限表不能为空',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 20,
        message: '长度在 3 到 20 个字符',
        trigger: 'blur'
      }
    ]
  }, /*{
    label: 'parentId',
    prop: 'parentId',
    editDisplay: true,
    addDisplay: true,
    span: 24,
    rules: [
      {
        required: true,
        message: 'parentId不能为空',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 255,
        message: '长度在 3 到 255 个字符',
        trigger: 'blur'
      }
    ]
  },*/  {
    label: '数据类型描述',
    prop: 'dataTypeDesc',
    editDisplay: true,
    addDisplay: true,
    span: 24,
    rules: [
      {
        required: true,
        message: '数据类型描述不能为空',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 255,
        message: '长度在 3 到 255 个字符',
        trigger: 'blur'
      }
    ]
  }
  ],
}
