import  request from '@/utils/request'

//主页招聘
export function allRecruitList(data) {
    return request({
      url: '/talent/api/recruiment/listByPage?',
      method: 'post',
      data
    });
}
// 专业筛选
export function majorFir() {
    return request({
      url: '/talent/api/commonDic/listByTypeAndPid?type=0&pid=0',
      method: 'get'
    })
}
// 二级
export function majorSec(pid) {
    return request({
      url: '/talent/api/commonDic/listByTypeAndPid?type=0&pid='+pid,
      method: 'get'
    })
}

// 按id查看招聘信息
export function recruitInfo(ids) {
    return request({
      url: '/talent/api/recruiment/findById?',
      method: 'get',
      params: {
            id: ids
      }
    })
}
//收藏
export function collect(data) {
    return request({
      url: '/talent/api/userCollection/create?',
      method: 'post',
      data
    });
}
// 取消收藏
export function cancelColl(data) {
    return request({
      url: '/talent/api/userCollection/deleteById',
      method: 'post',
      data
    });
}
// 我要应聘
export function wantEmploy(data) {
    return request({
      url: '/talent/api/companyResume/create?',
      method: 'post',
      data
    });
}

//企业收到的简历查询单个
export function findbyid(id) {
    return request({
      url: '/talent/api/companyResume/findById?id='+id,
      method: 'get',
    });
}