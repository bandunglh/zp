import request from '@/utils/request';


// 显示公司信息
export function findOneCompany(id) {
  return request({
    url: '/talent/api/company/findOneCompany',
    method: 'get',
    params: {
      'id': id
  }
  });
}

// 各个公司
export function findCompany(id) {
  return request({
    url: '/talent/api/company/detail',
    method: 'get',
    params: {
      'id': id
  }
  });
}


// 创建公司信息
export function createOneCompany(data) {
    return request({
      url: '/talent/api/company/create',
      method: 'post',
      data
    });
}


// 修改公司信息
export function updateCompany(data) {
    return request({
      url: '/talent/api/company/update',
      method: 'POST',
      data
    });
}

// 招聘历史
export function recruiment(data) {
    return request({
      url: '/talent/api/recruiment/listByPage',
      method: 'POST',
      data
    });
}

// 删除发布历史
export function deleteById (data) {
    return request({
      url: '/talent/api/recruiment/deleteById',
      method: 'POST',
      data
    });
}


// 企业信息首页
export function companyindex() {
    return request({
      url: 'talent/api/company/stat',
      method: 'get',
    })
   }

// 根据id获取招聘详情
export function findById(id) {
    return request({
      url: '/talent/api/recruiment/findById',
      method: 'get',
      params: {
          'id': id
      }
    });
  }


// 发布招聘
export function postjob (data) {
    return request({
      url: '/talent/api/recruiment/create',
      method: 'POST',
      data
    });
}
// 修改招聘
export function updatejob (data) {
    return request({
      url: '/talent/api/recruiment/update',
      method: 'POST',
      data
    });
}

// 个人信息
export function myinfo() {
    return request({
      url: '/talent/api/wxUser/stat',
      method: 'get',
    });
}


// 我的伯乐录用
export function companyEmploy (data) {
    return request({
      url: '/talent/api/companyEmploy/listByPage',
      method: 'POST',
      data
    });
}

// 我被收藏
export function mycollected (data) {
    return request({
      url: '/talent/api/companyEmploy/listByPage',
      method: 'POST',
      data
    });
}

// 已收简历列表
export function receivedresume (data) {
    return request({
      url: '/talent/api/companyResume/listResumeByPage',
      method: 'POST',
      data
    });
}

// 人才库列表
export function employlist (data) {
    return request({
      url: '/talent/api/companyEmploy/listByPage',
      method: 'POST',
      data
    });
}

// 员工档案列表
export function employees (data) {
    return request({
      url: '/talent/api/companyEmploy/listByPage',
      method: 'POST',
      data
    });
}


// 预约面试
export function appoint (data) {
    return request({
      url: '/talent/api/company/appoint',
      method: 'POST',
      data: {userId: data}
    });
}

//人才库
export function collection(data) {
    return request({
      url: '/talent/api/companyCollection/listByPage',
      method: 'post',
      data
    });
}

// 档案库


// 加入档案库
export function addEmploy(data) {
  return request({
    url: '/talent/api/companyEmploy/create',
    method: 'post',
    data
  });
}
// 移出档案库
export function delEmploy(data) {
  return request({
    url: '/talent/api/companyEmploy/deleteById',
    method: 'post',
    data
  });
}


// 评价
export function rateuser(data) {
  return request({
    url: '/talent/api/evaluation/listPendingByPage',
    method: 'post',
    data
  });
}


// 意见反馈
export function feedback(data) {
  return request({
    url: '/talent/api/board/create',
    method: 'post',
    data
  });
}

