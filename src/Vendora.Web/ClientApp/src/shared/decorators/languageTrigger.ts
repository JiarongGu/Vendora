import { CommonSink } from '@shared/services/common';
import { SinkFactory, trigger } from 'redux-sink';

export const languageTrigger = (target: any, name: string, descriptor: PropertyDescriptor) => {
  // initialize commonSink;
  SinkFactory.sink(CommonSink);

  let language = '';
  const method = descriptor.value;

  descriptor.value = function(newLanguage: string) {
    if (language !== newLanguage) {
      language = newLanguage;
      method.call(this, newLanguage);
    }
  };

  return trigger('commonSink/language', { fireOnInit: true })(target, name, descriptor);
};
