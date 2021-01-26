/*
 *    Copyright (c) 2018-2025, lchye All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lchye (Chomer1949@163.com)
 */

import request from '@/router/axios'
import jsonp from '@/router/jsonp'
//列表
export function fetchList(query) {
  return request({
    url: '/model/model/queryModelByList',
    method: 'get',
    params: query
  })
}
//删除
export function delObj(id) {
  return request({
    url: `/model/model/deleteModel?modelId=${id}`,
    method: 'delete'
  })
}
//新增
export function addObj(obj) {
  return request({
    url: '/model/model/addModel',
    method: 'post',
    data: obj
  })
}
//测试接口
export function checkInterface(obj) {
  return request({
    url: '/model/model/checkInterface',
    method: 'post',
    params: obj
  })
}
//详情
export function getObj(id) {
  return request({
    url: `/model/model/queryModelById?modelId=${id}`,
    method: 'get'
  })
}
//修改
export function putObj(obj) {
  return request({
    url: '/model/model/updateModel',
    method: 'PUT',
    data: obj
  })
}

//发布版本
export function publicVersion(obj) {
  return request({
    url: '/model/ven/publicVersion',
    method: 'post',
    data: obj
  })
}
//关联实例-数据
export function getExpAll() {
  return request({
    url: `/model/exp/getExpAll`,
    method: 'get'
  })
}
//关联实例
export function exampleVisible(data) {
  return request({
    url: `/model/model/modelJoinExample`,
    method: 'post',
    data: data
  })
}
//关联实例详情
export function getModelJoin(modelId) {
  return request({
    url: `/model/model/getModelJoin?modelId=${modelId}`,
    method: 'post'
  })
}

//关联实例-数据
export function getExpAllTree() {
  return request({
    url: `/model/exp/getExpAllTree`,
    method: 'get'
  })
}

export function synchro () {

  return request({
    url: `/model/model/synchroModel`,
    method: 'get'
  })
}

