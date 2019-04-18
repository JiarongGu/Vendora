import { sink, state } from 'redux-sink';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Home } from '@components/home';
import { User } from '@components/user';
import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';

export interface NavigationModel {
  display?: string;
  path: string;
  icon?: IconDefinition;
  component: React.ComponentClass<any, any> | React.FunctionComponent<any>
}

export interface NavigationState {
  layout: Array<NavigationModel>;
}

@sink('navigation')
export class NavigationSink {
  @state
  layout: Array<NavigationModel> = [
    { path: '/', component: Home },
    { path: '/user', display: 'Talk to Expert', component: User, icon: faUserTie },
    { path: '/user', display: 'About Us', component: User }
  ]
}
