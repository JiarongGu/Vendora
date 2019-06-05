import { sink, state } from 'redux-sink';

@sink('contentService')
export class ContentService {
  @state
  public layout = {};

  @state
  public home = {
    header: 'Please fork this codesandbox to reproduce your issue.'
  };

}
