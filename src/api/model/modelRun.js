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
//列表
export function fetchList(query) {
  return request({
    url: '/model/exec/queryModelRunPage',
    method: 'get',
    params: query
  })
}
//启用
export function enableModel(id) {
  return request({
    url: `/model/exec/enableModelById?modelId=${id}`,
    method: 'post'
  })
}
//停用
export function stopModel(id) {
  return request({
    url: `/model/exec/stopModelById?modelId=${id}`,
    method: 'post'
  })
}
//运行情况
export function queryModelRunById(query) {
  return request({
    url: '/model/exec/queryModelRunById',
    method: 'get',
    params: query
  })
}
//操作日志
export function queryModelLogById(query) {
  return request({
    url: '/model/exec/queryModelLogById',
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
    data: obj
  })
}
//详情
export function getObj(id) {
  return request({
    url: `/model/model/queryModelById?modelId=${id}`,
    method: 'get'
  })
}
//详情
export function getModelInfo(id) {
  return request({
    url: `/model/model/getInfoByModelId?modelId=${id}`,
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
export function exampleVisible(impIds, modelId) {
  return request({
    url: `/model/model/modelJoinExample?impIds=${impIds}&modelId=${modelId}`,
    method: 'post'
  })
}
export  function saveModelAddress(obj){
  return request({
    url: '/model/model/saveModelAddress',
    method: 'post',
    data: obj
  })
}

