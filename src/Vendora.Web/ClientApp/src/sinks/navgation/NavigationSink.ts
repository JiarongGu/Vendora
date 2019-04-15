import { sink, state } from 'redux-sink';

export interface NavigationModel {
  name: string;
  path: string;
  component: React.ComponentClass<any, any> | React.FunctionComponent<any>
}

export interface NavigationState {
  layout: Array<NavigationModel>;
}

@sink('navigation')
export class NavigationSink {
  @state
  layout: Array<NavigationModel> = []
}
