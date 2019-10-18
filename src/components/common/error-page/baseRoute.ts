import Router, { RouteConfig } from 'vue-router';

const baseRoute: RouteConfig[] = [
  {
    path: '/401',
    name: 'Page401',
    component: () => import(/* webpackChunkName: "404" */ '@/components/common/error-page/401.vue')
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import(/* webpackChunkName: "404" */ '@/components/common/error-page/404.vue')
  }
];

export default baseRoute;
