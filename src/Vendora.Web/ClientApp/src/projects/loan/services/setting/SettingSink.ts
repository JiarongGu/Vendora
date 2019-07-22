import * as _ from 'lodash';
import { sink, state } from 'redux-sink';

import { languageTrigger } from '@shared/decorators/languageTrigger';
import { CommonSink } from '@shared/services/common';

const languageSettings = {
  'en-gb': require('./en-gb'),
  'zh-cn': require('./zh-cn')
};

@sink('settingSink', CommonSink)
export class SettingSink {
  @state
  public get = (key: string) => ''

  @languageTrigger
  public languageChangeTrigger(language: string): void {
    this.get = (key: string) => {
      return _.get(languageSettings[language], key);
    };
  }
}
