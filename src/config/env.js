/**
 * baseUrl:域名
 * routerMode:路由模式
 * baseImgPath:图片存放地址
 */

let baseUrl = '';
let routerMode = 'hash';
let baseImgPath;

// let ModeType = import.meta.env.MODE || 'production';
if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://127.0.0.1:8001';
    baseImgPath = 'http://127.0.0.1:8001/img/';
} else {
    baseUrl = '/api';
    baseImgPath = '/api/img/';
}

export default {
    baseUrl,
    routerMode,
    baseImgPath
}