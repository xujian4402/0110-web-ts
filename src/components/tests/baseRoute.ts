import Router, { RouteConfig } from 'vue-router';
import about from './About.vue';
import home from './Home.vue';

const baseRoute: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  }
];

export default baseRoute;
