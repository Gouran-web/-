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
    url: '/model/nom/getNormByPage',
    method: 'get',
    params: query
  })
}

//删除
export function delObj(id) {
  return request({
    url: `/model/nom/deleteNormById?nomId=${id}`,
    method: 'delete'
  })
}

//新增
export function addObj(obj) {
  return request({
    url: '/model/nom/saveOrUpdateNorm',
    method: 'post',
    data: obj
  })
}

//详情
export function getObj(id) {
  return request({
    url: `/model/nom/getNormById?nomId=${id}`,
    method: 'get'
  })
}

//修改
export function putObj(obj) {
  return request({
    url: '/model/nom/saveOrUpdateNorm',
    method: 'post',
    data: obj
  })
}

