import request from '@/utils/request';


export function listByTypeAndPid(type, pid) {
  return request({
    url: '/talent/api/commonDic/listByTypeAndPid',
    method: 'get',
    params: {
        'type': type,
        'pid': pid
    }
  });
}

export function createcommonDic(data) {
    return request({
      url: '/talent/api/commonDic/create',
      method: 'post',
      data
    });
}
