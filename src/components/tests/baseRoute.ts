import Router, { RouteConfig } from 'vue-router';
import about from './About.vue';
import home from './Home.vue';

const baseRoute: RouteConfig[] = [
  {
    path: '/',
    name: 'about',
    component: home
  },
  {
    path: 'apps/new',
    name: 'createApp',
    component: home
  }
];

export default baseRoute;
