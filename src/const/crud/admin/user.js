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
import {getDetails} from '@/api/admin/user'

var validateUsername = (rule, value, callback) => {

  getDetails(value).then(response => {
    let result = response.data.data
    if (window.boxType === 'edit') {
      if (result !== null && window.userId != result.userId) {
        callback(new Error('用户名已经存在'))
      } else {
        callback()
      }
    }
    if (result !== null) {

      callback(new Error('用户名已经存在'))
    } else {
      callback()
    }
  })
}

var validateCheckPassWord = function (rule, value, callback) {
  if (window.form.password != '' && window.form.password != undefined) {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== window.form.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  } else {
    callback()
  }

};
var passwordValue = function (rule, value, callback) {
  if(value!=undefined&&value!=''){
    window.form.password = value;

    var regex = new RegExp("^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\\\W_!@#$%^&*`~()-+=]{8,30}$");
    if(!regex.test(value)){
      callback(new Error('密码必须同时包含大写、小写、数字和特殊字符其中三项且至少8位并不大于30位'));
    }else {
      callback()
    }
  }else {
    callback()
  }

};
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  dialogDirection: 'rtl',
  dialogType: 'drawer',
  column: [{
    fixed: true,
    label: 'id',
    prop: 'userId',
    span: 24,
    hide: true,
    editDisabled: true,
    addDisplay: false,
    editDisplay: false
  }, {
    fixed: true,
    label: '用户名',
    prop: 'username',
    editDisabled: false,
    slot: true,
    search: true,
    span: 24,
    rules: [{
      required: true,
      message: '请输入用户名'
    },
      {
        min: 3,
        max: 20,
        message: '长度在 3 到 20 个字符',
        trigger: 'blur'
      },
      {validator: validateUsername, trigger: 'blur'}
    ]
  }, {
    label: '密码',
    prop: 'password',
    type: 'password',
    value: '',
    hide: true,
    span: 24,
    rules: [{
      min: 6,
      max: 20,
      message: '长度在 6 到 20 个字符',
      trigger: 'blur'
    }, {
      validator: passwordValue, trigger: 'blur'
    }]
  },
    {
      label: '确认密码',
      prop: 'oldPassword',
      type: 'password',
      value: '',
      hide: true,
      span: 24,
      rules: [{
        validator: validateCheckPassWord, trigger: 'blur'
      }]
    }, {
      label: '所属部门',
      prop: 'deptId',
      formslot: true,
      slot: true,
      span: 24,
      hide: true,
      rules: [{
        required: true,
        message: '请选择部门',
        trigger: 'change'
      }]
    }, {
      label: '邮箱',
      prop: 'email',
      type: 'email',
      value: '',
      span: 24,
      rules: [
        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
      ]
    }, {
      label: '手机号',
      prop: 'phone',
      type: 'phone',
      value: '',
      span: 24,
      rules: [
        {
          required: true,
          pattern: /^1[3456789]\d{9}$/,//可以写正则表达式呦呦呦
          message: '请输入11位正确的手机号码',
          trigger: 'blur'
        }]
    }, {
      label: '系统角色',
      prop: 'role',
      formslot: true,
      slot: true,
      overHidden: true,
      span: 24,
      rules: [{
        required: true,
        message: '请选择角色',
        trigger: 'blur'
      }]
    },




    {
      label: '数据角色',
      prop: 'dataRole',
      formslot: true,
      slot: true,
      overHidden: true,
      span: 24
    },




    {
      label: '部门',
      prop: 'deptName',
      overHidden: true,
      addDisplay: false,
      editDisplay: false,
      span: 24,
    }, {
      label: '状态',
      prop: 'lockFlag',
      type: 'select',
      slot: true,
      span: 24,
      rules: [{
        required: true,
        message: '请选择状态',
        trigger: 'blur'
      }],
      dicData: [{
        label: '有效',
        value: '0'
      }, {
        label: '锁定',
        value: '9'
      }]
    }, {
      width: 120,
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd',
      editDisabled: true,
      addDisplay: false,
      span: 24
    }]
}
