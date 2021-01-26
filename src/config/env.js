// 配置编译环境和线上环境之间的切换

const env = process.env
let baseUrl = ''
// const requestUrl = window.location.origin
// const requestUrl = 'http://localhost:12003'
// const requestUrl = 'http://localhost:12003'
 const requestUrl = 'http://oo-ppd-gateway-esp-ts.tjdevapp.cnooc'
  // const requestUrl = 'http://oo-ppd-gateway-znzc.tjdevapp.cnooc'


let codeUrl = `${requestUrl}/code`
let actUrl = `${requestUrl}/act/modeler.html?modelId=`
if (env.NODE_ENV == 'development') {

} else if (env.NODE_ENV == 'production') {
  env.BASE_URL = requestUrl
} else if (env.NODE_ENV == 'test') {

}
export {
  baseUrl,
  actUrl,
  codeUrl,
  env
}
