import { sink, state } from 'redux-sink';

export interface NavigationModel {
  name: string;
  path: string;
}

export interface NavigationState {
  mainRoutes: Array<NavigationModel>;
}

export const navigationSink = 'navigation';

sink(navigationSink)
export class NavigationSink {
  @state
  state: NavigationState =  {
    mainRoutes: [ ]
  }
}