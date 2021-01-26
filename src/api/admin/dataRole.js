import request from '@/router/axios'
import de from "element-ui/src/locale/lang/de";

export function fetchList(query) {
  return request({
    url: '/admin/dataRole/page',
    method: 'get',
    params: query
  })
}

export function list() {
  return request({
    url: '/admin/dataRole/list/',
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/dataRole',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/dataRole/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/dataRole/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/dataRole',
    method: 'put',
    data: obj
  })
}


export function permission(obj) {
  return request({
    url: '/admin/dataRole/permission',
    method: 'put',
    data: obj
  })
}


export function fetchWellTreeList(val1, val2) {
  return request({
    url: '/admin/dataRole/fetchWellTreeList/' + val1 + "/" + val2,
    method: 'get'
  })
}
