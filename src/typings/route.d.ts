/**
 * declare: .d.ts的顶级声明必须以declare开头
 * 以declare声明的变量和模块后，其他地方不需要引入，就可以直接使用了
 * 
 * namespace: 命名空间，可以防止出现重复的
 */


declare namespace AuthRoute {
  /**
   * 路由的组件
   * - basic - 基础布局，具有公共部分的布局
   * - blank - 空白布局
   * - multi - 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
   * - self - 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
   */
  type RouteComponentType = 'basic' | 'blank' | 'multi' | 'self';

  interface RouteMeta {
    /** 路由标题 */
    title: string;
    auth: boolean;
  }

  type Route = {
    name: string;
    path: string;
    redirect?: string;
    component?: RouteComponentType;
    children?: Route[];
    meta?: RouteMeta
  }
}