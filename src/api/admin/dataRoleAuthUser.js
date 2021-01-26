import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/dataRoleAuthUser/page',
    method: 'get',
    params: query
  })
}

export function list() {
  return request({
    url: '/admin/dataRoleAuthUser/list',
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/dataRoleAuthUser',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/dataRoleAuthUser/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/dataRoleAuthUser/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/dataRoleAuthUser',
    method: 'put',
    data: obj
  })
}


export function handlePermission(obj) {
  return request({
    url: '/admin/dataRoleAuthUser/handlePermission',
    method: 'put',
    data: obj
  })
}

export function getObjByRoleIdOrg(roleId) {
  return request({
    url: '/admin/dataRoleAuthUser/getObjByRoleIdOrg/' + roleId,
    method: 'get'
  })
}


export function getObjByRoleIdUser(roleId) {
  return request({
    url: '/admin/dataRoleAuthUser/getObjByRoleIdUser/' + roleId,
    method: 'get'
  })
}

