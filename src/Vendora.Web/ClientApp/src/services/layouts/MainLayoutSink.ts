import { sink, state, trigger } from 'redux-sink';

@sink('mainLayoutSink')
export class MainLayoutSink {
  @state
  public headerBackground = true;

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
