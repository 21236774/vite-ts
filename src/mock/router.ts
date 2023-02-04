interface UserModel {
  userName: string;
  token: string;
  password: string;
}
export const userInfo: UserModel[] = [
  {
    userName: 'admin',
    token: 'admin__admin',
    password: '123'
  },
  {
    userName: 'user',
    token: 'user__user',
    password: '123'
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
  ]
}
