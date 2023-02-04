const views: { [key: string | number]: any } = {
  404: () => import('./blank/404/index.vue'),
  login: () => import('./blank/login/index.vue'),
  front: () => import('./basic/front/index.vue'),
  edit: () => import('./basic/edit/index.vue'),
  basic_list: () => import('./basic/list/index.vue'),
}
export { views }