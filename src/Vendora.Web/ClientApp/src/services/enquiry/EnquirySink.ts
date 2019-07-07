import { HttpClient } from '@services/httpclient';

import { matchPath } from 'react-router';
import { effect, sink, state, trigger } from 'redux-sink';
import { IFormModel } from './IFormModel';

@sink('enquirySink')
export class EnquirySink {
  @state
  public currentEnquiry: IFormModel;

  @state
  public currentStep: number = 0;

  @state
  public currentStepName: string = '';

  @effect
  public async getForm(name: string, language: string) {
    const httpClient = new HttpClient();
    const formRequest = await httpClient.get<IFormModel[]>('/api/forms', { name, language });
    const form = formRequest.data.find(() => true);

    if (form) {
      this.currentEnquiry = form;
    }
  }

  @effect
  public updateState(updateAction: (enquirySink: EnquirySink) => void) {
    updateAction(this);
  }

  @effect
  public updateFormFields() {
    // call it on answers change
  }

  @trigger('LOCATION_CHANGE', { fireOnInit: true })
  public async getFormTrigger(location: Location) {
    const matches = matchPath<{language: string; name: string }>(
      location.pathname, { path: '/:language/enquiry/:name' }
    );
    if (matches) {
      await this.getForm(matches.params.name, matches.params.language);
    }
  }
}
