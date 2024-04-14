import type { Component } from 'vue'
const views: { [key: string | number]: Component } = {
  404: () => import('./blank/404/index.vue'),
  login: () => import('./blank/login/index.vue'),
  front: () => import('./basic/front/index.vue'),
  edit_drag: () => import('./basic/edit/drag/index.vue'),
  edit_account: () => import('./basic/edit/account/index.vue'),
  list_search: () => import('./basic/list/index.vue'),
  plugin_markdown: () => import('./basic/plugin/markdown/index.vue'),
  plugin_map: () => import('./basic/plugin/map/index.vue'),
  plugin_gismap: () => import('./basic/plugin/gisMap/index.vue'),
  article_list: () => import('./basic/article/list/index.vue'),
  article_new: () => import('./basic/article/new/index.vue'),
  article_type: () => import('./basic/article/type/index.vue')
}
export { views }
