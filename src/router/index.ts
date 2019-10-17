import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Tests from '@/components/tests/baseRoute';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [...Tests]
});
