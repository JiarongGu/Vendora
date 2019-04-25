import { sink, state, effect, trigger } from 'redux-sink';

@sink('mainLayoutService')
export class MainLayoutService {
  @state 
  footer = true;

  ignoreFooterPaths= ['/'];

  @trigger('LOCATION_CHANGE', { fireOnInit: true })
  onLocationChange(payload: Location) {
    if (this.ignoreFooterPaths.find(x => x === payload.pathname)) {
      this.footer = false;
    } else {
      this.footer = true;
    }
  }
}