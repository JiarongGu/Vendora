import { sink, state } from 'redux-sink';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Home } from '@components/home';
import { User } from '@components/user';
import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { Quote } from '@components/quote';

export interface NavigationModel {
  key: string;
  display?: string;
  path: string;
  icon?: IconDefinition;
  component: React.ComponentClass<any, any> | React.FunctionComponent<any>
}

// export interface NavigationState {
//   layout: Array<NavigationModel>;
//   dropdownMenu: any;
// }

@sink('navigation')
export class NavigationSink {
  @state
  layout: Array<NavigationModel> = [
    { key: 'HOME', path: '/', display: 'Home', component: Home, icon: faHome },
    { key: 'QUOTE', path: '/quote', display: 'Talk to Expert', component: Quote, icon: faUserTie },
    { key: 'USER', path: '/user', component: User }
  ]
}
