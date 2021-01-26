import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/roleAuth/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/roleAuth',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/roleAuth/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/roleAuth/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/roleAuth',
    method: 'put',
    data: obj
  })

}export function getObjByRoleId(roleId) {
  return request({
    url: '/admin/roleAuth/getObjByRoleId/' + roleId,
    method: 'get'
  })
}
