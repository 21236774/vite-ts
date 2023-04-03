export interface UserModel {
  userName: string;
  token: string;
  password: string;
  userRole: string;
}
export const userInfo: UserModel[] = [
  {
    userName: 'admin',
    token: 'admin__admin',
    password: '123',
    userRole: 'admin'
  },
  {
    userName: 'user',
    token: 'user__user',
    password: '123',
    userRole: 'user'
  },
  {
    userName: 'xdd',
    token: 'xdd__xdd',
    password: 'a123',
    userRole: 'xdd'
  }
]

export const infoRouter: { [key: string]: AuthRoute.Route[] } = {
  admin: [
    {
      name: 'front',
      path: '/basic/front',
      component: 'basic',
      meta: {
        title: '仪表盘',
        auth: true
      }
    },
    {
      name: 'list',
      path: '/list',
      component: 'basic',
      meta: {
        title: '列表',
        auth: true
      },
      redirect: '/basic/list',
      children: [
        {
          name: 'basic_list',
          path: '/basic/list',
          component: 'basic',
          meta: {
            title: '列表搜索',
            auth: true
          },
        }
      ]
    },
    {
      name: 'plugin',
      path: '/plugin',
      component: 'basic',
      meta: {
        title: '插件',
        auth: true
      },
      redirect: '/basic/markdown',
      children: [
        {
          name: 'basic_markdown',
          path: '/basic/markdown',
          component: 'basic',
          meta: {
            title: 'Markdown',
            auth: true
          },
        },
        {
          name: 'basic_map',
          path: '/basic/map',
          component: 'basic',
          meta: {
            title: '高德地图',
            auth: true
          },
        }
      ]
    },
    {
      name: 'edit',
      path: '/basic/edit',
      component: 'basic',
      meta: {
        title: '系统设置',
        auth: true
      }
    }
  ],
  user: [
    {
      name: 'front',
      path: '/basic/front',
      component: 'basic',
      meta: {
        title: '仪表盘',
        auth: true
      }
    },
    {
      name: 'list',
      path: '/list',
      component: 'basic',
      meta: {
        title: '列表',
        auth: true
      },
      redirect: '/basic/list',
      children: [
        {
          name: 'basic_list',
          path: '/basic/list',
          component: 'basic',
          meta: {
            title: '列表搜索',
            auth: true
          },
        }
      ]
    }
  ],
  xdd: [
    {
      name: 'front',
      path: '/basic/front',
      component: 'basic',
      meta: {
        title: '仪表盘',
        auth: true
      }
    }
  ]
}
