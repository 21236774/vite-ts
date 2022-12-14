import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import Pages from 'vite-plugin-pages'
import vue from '@vitejs/plugin-vue'

// 直接引入path报错，解构就好了
// loadEnv接收三个参数，第一个是.env后面的名字，第二个是绝对路径，第三个参数是你环境变量名的前缀，在vite中默认是VITE_

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const base = loadEnv(mode, process.cwd(), 'VITE_BASE_URL').VITE_BASE_URL
  console.log(command) // 可判断环境
  return {
    resolve: {
      // 目录别名
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    base,
    server: {
      // 是否自动打开浏览器
      open: false,
      // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      host: '0.0.0.0',
      // 服务器端口号
      port: 3001,
      // 设为 true ,若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      // 为开发服务器配置 CORS
      cors: true,
      // 设置为 true 强制使依赖预构建
      force: false,
      // 代理
      proxy: {
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true
        }
      },
    },
    // 配置less全局变量
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__dirname, 'src/assets/styles/main.less')}";`
        }
      }
    },
    plugins: [
      vue({
        reactivityTransform: true
      }),
      Pages({
        dirs: 'src/views',
        exclude: ['**/components/*.vue']
      })
    ]
  }
})
