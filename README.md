# Vue 3 + TypeScript + Vite + Naive + pinia

### 快速开始

##### 克隆仓库
```bash
git clone https://github.com/21236774/vite-ts.git
```

##### 进入目录
```bash
cd vite-ts
```

##### 安装依赖 （没有pnpm 记得 npm i pnpm -g ）
```bash
pnpm i
```

##### 运行项目
```bash
npm run dev
```

##### 运行script

``` javascript
  // 本地环境运行
  "dev": "vite"
  // 打包生产环境
  "build": "vite build"
  // 打包后本地`3002`端口测试运行
  "preview": "vite preview --port 3002"
  // git 提交初始化，已配置好勿用
  "prepare": "husky install"
  // esline 提交代码校验
  "lint": "lint-staged"
```

##### 新增菜单Menu
1. src/views/basic 新建文件夹和vue文件
2. src/views/index.ts 导出所创建的vue文件、key值起名和 `mock` 数据一致
3. src/mock/router.ts 中给对应的角色设置对应的权限（注意：`name`需与第二步的`key`值一样）

> 有真实接口的话，可让后台返回真实对应的即可

### 目录结构
```
public                               公共资源
|-- config.json                      GIS地图配置文件
src                                  源码目录
|-- api                              所有后端交互接口
|   |-                                ...
|-- assets                           静态资源，images, icons, styles等
|   |-- images                       全局公用图片
|   |-- icons                        全局公用svg
|   |-- styles                       全局公用样式
|-- components                       公用组件
|-- hooks                            公用方法封装,例如Echarts 
|-- language                         语言翻译文件
|-- layout                           全局布局结构
|-- mock                             模拟数据
|-- plugins                          一些公共插件、自定义指令等
|-- directives                       自定义指令
|-- filters                          过滤器，全局工具
|-- router                           路由，统一管理
|-- service                          全局axios方法请求
|-- store                            pinia, 统一状态管理
|-- theme-pack                       颜色主题配置, 如暗黑模式等
|-- typings                          Ts全局变量
|-- utils                            全局公共函数
|-- views                            视图目录
|-- |-- basic                        需要权限的路由
|-- |-- blank                        不需要权限的路由
|-- |-- index.ts                     路由入口, 导出全部路由
App.vue                              vue文件入口
main.ts                              项目入口ts文件
index.css                            项目引入tailwindcss
.env                                 全局环境文件
.env.development                     开发环境文件
.env.production                      生产环境文件
.eslintignore                        忽略eslint检查的配置文件
.eslintrc.js                         eslint配置文件
.prettierrc.js                       prettierrc配置文件
.commitlint.config.js                git commit提交规范
index.html                           项目入口
package.json                         npm依赖描述文件
pnpm-lock.yaml                       npm包管理器pnpm依赖锁定文件
postcss.config.js                    tailwindcss预配文件
README.md                            项目说明文件
tailwind.config.js                   tailwindcss配置文件
tsconfig.json                        Ts配置文件
tsconfig.node.json                   Ts配置json文件
vite.config.ts                       vite配置文件
```