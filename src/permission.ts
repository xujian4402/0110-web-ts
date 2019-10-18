import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Route } from 'vue-router';
import AuthService from '@/services/AuthService';

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to: Route, from: Route, next: any) => {
  // 测试执行过程
  // Start progress bar
  // tslint:disable-next-line: no-console
  console.log(process.env.VUE_APP_BASE_API);
  AuthService.initToken();

  NProgress.start();

  next();
});

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done();
});
