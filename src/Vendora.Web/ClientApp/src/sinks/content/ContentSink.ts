import { sink, state, reducer } from 'redux-sink';

export interface ContentState {
  layout: any;
  home: any;
}

@sink('content')
export class ContentSink {
  @state
  state: ContentState = {
    layout: {},
    home: {
      header: 'Please fork this codesandbox to reproduce your issue.'
    }
  };
}
