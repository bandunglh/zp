import  request from '@/utils/request'

// 所有求职意向 
export function objectivelists(data) {
    return request({
      url: 'talent/api//applicationInfo/mylistByPage',
      method: 'post',
      data
    });
}
//创建求职意向
export function createobjective(data) {
    return request({
      url: '/talent/api/applicationInfo/create',
      method: 'post',
      data
    });
}

// 删除意向
export function deleteById(data) {
    return request({
      url: '/talent/api/applicationInfo/deleteById',
      method: 'post',
      data
    });
}

// 修改意向
export function updateById(data) {
    return request({
      url: '/talent/api/applicationInfo/update',
      method: 'post',
      data
    });
}

// 我的收藏
export function collectlist(data) {
    return request({
      url: '/talent/api/userCollection/listByPage',
      method: 'post',
      data
    });
}

// 删除收藏
export function deletecollect(data) {
    return request({
      url: '/talent/api/userCollection/deleteById',
      method: 'post',
      data
    });
}



