import { sink, state } from 'redux-sink';

@sink('content')
export class ContentSink {
  @state
  layout = {}

  @state
  home = {
    header: 'Please fork this codesandbox to reproduce your issue.'
  }
}
