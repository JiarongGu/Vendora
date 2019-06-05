import { sink, state, trigger } from 'redux-sink';

@sink('mainLayoutService')
export class MainLayoutService {
  @state 
  headerBackground = true;

  // ignoreHeaderBackgroundPaths= ['', '/'];

  // @trigger('LOCATION_CHANGE', { fireOnInit: true })
  // onLocationChange(payload: Location) {
  //   if (this.ignoreHeaderBackgroundPaths.find(x => x === payload.pathname)) {
  //     this.headerBackground = false;
  //   } else {
  //     this.headerBackground = true;
  //   }
  // }
}