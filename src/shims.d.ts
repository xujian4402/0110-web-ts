declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

// TODO: remove this part after vue-count-to has its typescript file
declare module 'js-cookie'

declare module 'element-ui/lib/locale/lang/*' {
  export const elementLocale: any
}
