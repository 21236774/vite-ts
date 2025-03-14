import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import Pages from 'vite-plugin-pages'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteEslint from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
import mars3dCesium from 'vite-plugin-mars3d'

// 直接引入path报错，解构就好了aa
// loadEnv接收三个参数，第一个是.env后面的名字，第二个是绝对路径，第三个参数是你环境变量名的前缀，在vite中默认是VITE_

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const { VITE_BASE_URL, VITE_LOGO } = loadEnv(mode, process.cwd())
  console.log(command) // 可判断环境
  return {
    resolve: {
      // 目录别名
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    base: VITE_BASE_URL,
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
        '/api-proxy': {
          target: 'http://localhost:9999/api/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-proxy/, '')
        }
      }
    },
    // 配置less全局变量
    css: {
      extract: false,
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(
            __dirname,
            'src/assets/styles/main.less'
          )}";`
        },
        scss: {
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      vue({
        reactivityTransform: true // 设置ref不需.value, 只写成$ref
      }),
      mars3dCesium(),
      Pages({
        dirs: 'src/views',
        exclude: ['**/components/*.vue']
      }),
      viteEslint({
        failOnError: false
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: VITE_LOGO
          }
        }
      }),
      viteCompression() // 开启gzip压缩
    ],
    optimizeDeps: {
      exclude: ['src/assets/model/3k.glb']
    }
  }
})
