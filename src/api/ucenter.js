import request from '@/utils/request';

// 个人信息
export function myinfo() {
    return request({
      url: '/talent/api/wxUser/stat',
      method: 'get',
    });
}

// 更新个人信息
export function updateucenter(data) {
    return request({
      url: '/talent/api/wxUser/update',
      method: 'post',
      data
    });
}

// 创建简历
export function createresume(data) {
    return request({
      url: '/talent/api/userResume/create',
      method: 'post',
      data
    });
}

// 获取简历
export function resumedetail (data) {
    return request({
      url: '/talent/api/userResume/detail',
      method: 'get',
      params: {
        'id': data
        }
    });
}

// 评价
export function ratecom (data) {
    return request({
      url: '/talent/api/evaluation/toCompany',
      method: 'post',
      data
    });
}




// 应聘职位列表
export function companyResume() {
    return request({
      url: '/talent/api/companyResume/listByPage',
      method: 'post',
      data: {}
    });
}

// 创建毕业信息
export function addDiplomas(data) {
    return request({
      url: '/talent/api/userResume/addDiplomas',
      method: 'post',
      data
    })
}

// 获取微信JS-SDK config信息
export function getConfig(data) {
    return request({
      url: '/talent/api/wxjs/getWXParam?',
      method: 'post',
      data
    });
}
//上传图片
export function uploadimg(data) {
    return request({
      url: '/talent/api/img/create',
      method: 'post',
      data
    });
}

// 微信上传图片
export function weixinuploadimg(data) {
    return request({
      url: '/talent/api/avatar/editAvatar',
      method: 'post',
      data
    });
}

// 添加毕业信息专业信息等
export function addMajory(data) {
    return request({
      url: '/talent/api/commonDic/create?',
      method: 'post',
      data
    });
}
// 提交毕业信息
export function postMajory(data) {
    return request({
      url: '/talent/api/userResume/addDiplomas?',
      method: 'post',
      data
    });
}

//新增职称
export function addTitle(data) {
    return request({
      url: '/talent/api/userResume/addTitle',
      method: 'post',
      data
    });
}

// 创建上岗证
export function addPosted(data) {
    return request({
      url: '/talent/api/userResume/addLicense?',
      method: 'post',
      data
    });
}


// 切换省份
export function changeCurrentUserType(data) {
    return request({
      url: '/talent/api/wxUser/changeCurrentUserType?',
      method: 'post',
      data
    });
}

// 删除上岗证
export function removeLicense(userLicenseId) {
    return request({
      url: '/talent/api/userResume/removeLicense',
      method: 'post',
      data: {
          "userLicenseId": userLicenseId
      }
    });
}
// 删除毕业证
export function removeDiplomas(userDiplomasId) {
    return request({
      url: '/talent/api/userResume/removeDiplomas',
      method: 'post',
      data: {
          "userDiplomasId": userDiplomasId
      }
    });
}

// 删除职称
export function removeTitle(userTitleId) {
    return request({
      url: '/talent/api/userResume/removeTitle',
      method: 'post',
      data: {
          "userTitleId": userTitleId
      }
    });
}
