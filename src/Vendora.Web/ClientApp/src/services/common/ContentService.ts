import { sink, state } from 'redux-sink';

@sink('contentService')
export class ContentService {
  @state
  layout = {}

  @state
  home = {
    header: 'Please fork this codesandbox to reproduce your issue.'
  }
}
