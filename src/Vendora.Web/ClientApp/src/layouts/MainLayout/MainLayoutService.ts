import { sink, state, effect } from 'redux-sink';

@sink('mainLayoutService')
export class MainLayoutService {
  @state 
  footer = true;

  @effect
  displayFooter(display: boolean) {
    this.footer = display;
  }
}