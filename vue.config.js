/**
 * 配置该文件可以参考:
 * https://cli.vuejs.org/zh/config/#%E7%9B%AE%E6%A0%87%E6%B5%8F%E8%A7%88%E5%99%A8
 *
 */
//const url = 'http://dcoit-gateway:12003'
//  const url = 'http://localhost:12003'
//  const url = 'http://localhost:12003'
 const url = 'http://oo-ppd-gateway-esp-ts.tjdevapp.cnooc'
// const url = 'http://oo-ppd-gateway-znzc.tjdevapp.cnooc'
// 基础路径，发布前修改这里,当前配置打包出来的资源都是相对路径
let publicPath = './'
module.exports = {
  publicPath: publicPath,
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      'axios': 'axios'
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  },
  // 配置转发代理
  devServer: {
    proxy: {
      '/auth': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/admin': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      '/code': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/code': '/code'
        }
      },
      '/gen': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/gen': '/gen'
        }
      },
      '/znzc': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/znzc': '/znzc'
        }
      },
      '/model': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/model': '/model'
        }
      }

    }
  }
}