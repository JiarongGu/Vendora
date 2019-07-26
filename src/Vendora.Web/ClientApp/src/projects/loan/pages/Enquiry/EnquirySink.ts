import { match } from 'react-router';
import { effect, sink, state } from 'redux-sink';

import { FormModel } from '@loan/services/form/FormModel';
import { ActiveSection, FormResolver } from '@loan/services/form/FormResolver';
import { FormSink } from '@loan/services/form/FormSink';
import { locationTrigger } from '@shared/decorators/locationTrigger';

export enum SectionStatus {
  Disabled = 'disabled',
  Pending = 'pending',
  Completed = 'completed',
}

const emptySection: ActiveSection = { keys: [], fields: [] };

@sink('enquirySink', FormSink)
export class EnquirySink {
  @state public form?: FormModel;
  @state public current: ActiveSection = emptySection;
  @state public fieldValues: { [key: string]: any } = {};
  @state public sectionStatus: { [key: string]: SectionStatus } = {};

  private formResolver?: FormResolver;

  constructor(private formSink: FormSink) { }

  @effect
  public openSection(name: string) {
    if (this.current.name !== name) {
      this.setSectionStatus(name, SectionStatus.Pending);
      this.updateCurrent(name);
    }
  }

  @effect
  public setSectionStatus(name: string, status: SectionStatus) {
    this.sectionStatus = Object.assign({}, this.sectionStatus, { [name]: status });
  }

  @effect
  public setFieldValues(fieldsValue) {
    this.fieldValues = Object.assign({}, this.fieldValues, fieldsValue);
  }

  @effect
  public submit() {
    console.log('submit:: ', this.fieldValues);
  }

  @locationTrigger('/:language/enquiry/:name')
  public async getFormTrigger(matches: match<{ language: string, name: string }>) {
    this.form = this.formSink.get(matches.params.name);
    if (this.form) {
      this.updateForm(this.form);
    } else {
      delete (this.formResolver);
    }
  }

  private updateForm(form: FormModel) {
    this.formResolver = new FormResolver(form);
    this.updateCurrent(this.formResolver.sections[0]);
    this.fieldValues = {};
  }

  private updateCurrent(name: string) {
    this.current = this.formResolver && this.formResolver.getActiveSection(name) || emptySection;
  }
}
