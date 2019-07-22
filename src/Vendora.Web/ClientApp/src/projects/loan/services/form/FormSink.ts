import * as _ from 'lodash';
import { sink, state } from 'redux-sink';

import { languageTrigger } from '@shared/decorators/languageTrigger';
import { CommonSink } from '@shared/services/common';
import * as formModels from './form-models';
import { FormModel } from './FormModel';

const formGroups = _.groupBy(formModels, 'language');

@sink('formSink', CommonSink)
export class FormSink {
  @state
  public get: (name: string) => FormModel | undefined;

  constructor() {
    this.get = () => undefined;
  }

  @languageTrigger
  public languageChangeTrigger(language: string): void {
    this.get = (name: string) => {
      return formGroups[language].find(x => x.name === name);
    }
  }
}
