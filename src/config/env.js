/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';

if (process.env.NODE_ENV == 'development') {
    // baseUrl = 'http://192.168.17.168:8012';
    baseUrl = 'http://192.168.17.166:8088/exam';
    // baseUrl = 'http://192.168.17.170:8088/exam';
    // baseUrl = 'http://172.31.10.184:8012';
    // baseUrl = 'http://172.31.10.184:8012';
    // baseUrl = 'http://172.31.12.14:8088/exam';


    // baseUrl = 'http://192.168.17.159:3000/ex/exam';

}else if(process.env.NODE_ENV == 'production'){
    baseUrl = 'http://guahao.easthospital.cn:8088/exam';
}
export {
    baseUrl,
}