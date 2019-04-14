import { sink, state, reducer } from 'redux-sink';

export interface NavigationModel {
  name: string;
  path: string;
}

export interface NavigationState {
  layout: Array<NavigationModel>;
}

@sink('navigation')
export class NavigationSink {
  @state
  navigations: NavigationState =  {
    layout: [ ]
  }

  @reducer
  setLayoutNavigations(layoutNavigations: Array<NavigationModel>) {
    return { ...this.navigations, layout: layoutNavigations };
  }
}