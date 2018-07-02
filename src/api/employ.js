import  request from '@/utils/request'

//应聘列表
export function getAllEmpList(data) {
    return request({
      url: '/talent/api/applicationInfo/listByPage?',
      method: 'post',
      data
    });
}

// 应聘信息详情
export function readSomOne(ids) {
    return request({
      url: '/talent/api/applicationInfo/findById?',
      method: 'get',
      params: {
          id: ids
      }
    });
}

// 应聘信息详情
export function userdetail(ids) {
    return request({
      url: '/talent/api/companyCollection/findById?',
      method: 'get',
      params: {
          id: ids
      }
    });
}

//岗位
export function postCategory() {
    return request({
      url: '/talent/api/commonDic/listByTypeAndPid?type=1&pid=0',
      method: 'get'
    });
}




//加入人才库
export function addTalent(data) {
    return request({
      url: '/talent/api/companyCollection/insert?',
      method: 'post',
      data
    });
}
//取消加入人才库
export function clectTalent(data) {
    return request({
      url: '/talent/api/companyCollection/deleteById?',
      method: 'post',
      data
    });
}

//预约面试
export function appoint(data) {
    return request({
      url: '/talent/api/company/appoint',
      method: 'post',
      data
    });
}


// 删除已收到的简历
export function delresume(data) {
    return request({
      url: '/talent/api/companyResume/deleteById',
      method: 'post',
      data
    });
}

