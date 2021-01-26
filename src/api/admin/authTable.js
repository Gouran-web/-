import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/dataType/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/dataType',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/dataType/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/dataType/' + id,
    method: 'delete'
  })
}

export function list() {
  return request({
    url: '/admin/dataType/list',
    method: 'get'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/dataType',
    method: 'put',
    data: obj
  })
}
