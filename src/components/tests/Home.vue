<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <div>{{data}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './HelloWorld.vue'; // @ is an alias to /src
import UserService from '@/services/UserService';

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  private userInfo: any;
  private data: any = '234567';
  private created() {
    this.userInfo = new UserService();
    this.userInfo.queryUserInfo('xujian', '1234').then((res: any) => {
      this.data = res;
    });
  }
}
</script>
