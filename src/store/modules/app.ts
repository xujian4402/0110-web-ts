import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';

export interface IAppState {
  device: string;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public device = 'test';

  @Mutation
  private TEST_APP(test: string) {
    this.device = test;
  }

  @Action
  public ToggleSideBar(test: string) {
    this.TEST_APP(test);
  }
}

// tslint:disable-next-line: variable-name
export const AppModule = getModule(App);
