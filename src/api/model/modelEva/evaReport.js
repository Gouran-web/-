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

//模型类型
export function modelTypeOption(type) {
  return request({
    url: `/model/cog/getConfigByType?type=${type}`,
    method: 'get'
  })
}
//模型类型
export function modelTypeOptionTree(type) {
  return request({
    url: `/model/cog/getParentConfigByType?type=${type}`,
    method: 'get'
  })
}
//获取所有模型提供商
export function getModelProvider() {
  return request({
    url: '/model/model/getModelProvider',
    method: 'get'
  })
}
//获取所有模型
export function getAllModel() {
  return request({
    url: '/model/model/getAllModel',
    method: 'get'
  })
}
//获取所有驱动参数 http://localhost:12011/iwellfljkcs/getJkcsByAll
export function drivingParams() {
  return request({
    url: `/model/iwellfljkcs/getJkcsByAll`,
    method: 'get'
  })
}
//获取所有作用对象
export function getJkdxByAll() {
  return request({
    url: `/model/iwellfljkdx/getJkdxByAll`,
    method: 'get'
  })
}
//列表
export function fetchList(query) {
  return request({
    url: '/model/nom/getNormAssessByPage',
    method: 'get',
    params: query
  })
}
//历史图表
export function getCharts(query) {
  return request({
    url: '/model/nom/getNormAssessAllByPage',
    method: 'get',
    params: query
  })
}
//历史图表
export function getNormByAll(type) {
  return request({
    url: `/model/nom/getNormByAll`,
    method: 'get'
  })
}

