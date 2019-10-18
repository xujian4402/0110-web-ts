import Vue, { DirectiveOptions } from 'vue';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import 'normalize.css';
import ElementUI, { Message, MessageBox } from 'element-ui';
import SvgIcon from 'vue-svgicon';

import store from './store';
import router from './router';
import i18n from '@/lang';
import { globalAxiosMap, stringifyRequest } from '@/services/Request';
import App from './App.vue';

import '@/permission';

import * as directives from '@/directives';
import * as filters from '@/filters';

Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
});

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
});

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]);
});

// Register global filter functions
Object.keys(filters).forEach(key => {
  // tslint:disable-next-line: ban-types
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});

Vue.config.productionTip = false;

axios.interceptors.response.use(
  response => {
    const config: any = response.config;

    if (config.method === 'get') {
      const path = stringifyRequest(config.url.substr(config.baseURL.length), {
        params: config.params
      });

      delete globalAxiosMap[path];
    }

    return response;
  },
  error => {
    const config = error.config;
    if (config) {
      if (config.method === 'get') {
        const path = stringifyRequest(
          config.url.substr(config.baseURL.length),
          { params: config.params }
        );

        delete globalAxiosMap[path];
      }
    } else if (error.message) {
      /*
       * when cancel a request,
       * the error.config is undefined
       * so nowadays
       * we only can clear the cache object to ensure other request is sent ok
       */
      Object.keys(globalAxiosMap).map(key => delete globalAxiosMap[key]);
    }

    if (error.response) {
      Message({
        message: error.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });
      //   if (
      //     error.response.config.method !== 'get' &&
      //     error.response.config.method !== 'head'
      //   ) {
      //     window.Noty.error(error.response.data.err_msg);
      //   } else if (![401, 403].includes(error.response.status)) {
      //     window.Noty.error(
      //       error.response.data.err_msg || '未知错误，请稍后重试'
      //     );
      //   }
      // } else if (error.request) {
      //   window.Noty.error('网络异常，请稍后重试');
    }

    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
