const views: { [key: string | number]: any } = {
  404: () => import('./blank/404/index.vue'),
  login: () => import('./blank/login/index.vue'),
  front: () => import('./basic/front/index.vue'),
  edit: () => import('./basic/edit/index.vue'),
  basic_list: () => import('./basic/list/index.vue'),
  basic_markdown: () => import('./basic/plugin/markdown/index.vue'),
  basic_map: () => import('./basic/plugin/map/index.vue'),
  gis_map: () => import('./basic/plugin/gisMap/index.vue')
}
export { views }
