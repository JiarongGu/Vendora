import * as _ from 'lodash';
import { match } from 'react-router';
import { effect, sink, state } from 'redux-sink';

import { FieldDescriptor, FormModel } from '@loan/services/form/FormModel';
import { FormResolver } from '@loan/services/form/FormResolver';
import { FormSink } from '@loan/services/form/FormSink';
import { locationTrigger } from '@shared/decorators/locationTrigger';

interface EnquiryMatches {
  language: string;
  name: string;
}

interface CurrentSection {
  keys: Array<string>;
  fields: Array<FieldDescriptor>;
  name?: string;
  next?: string;
  previous?: string;
}

export enum SectionStatus {
  Disabled = 'disabled',
  Pending = 'pending',
  Completed = 'completed',
}

@sink('enquirySink', FormSink)
export class EnquirySink {
  @state public form?: FormModel;
  @state public current: CurrentSection = { keys: [], fields: [] };
  @state public fieldValues: { [key: string]: any } = {};
  @state public sectionStatus: { [key: string]: SectionStatus } = {};

  private formResolver?: FormResolver;

  constructor(private formSink: FormSink) { }

  @effect
  public openSection(name: string) {
    if (this.current.name !== name) {
      this.setSectionStatus(name, SectionStatus.Pending);
      this.updateCurrentSection(name);
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
  public async getFormTrigger(matches: match<EnquiryMatches>) {
    this.form = this.formSink.get(matches.params.name);
    if (this.form) {
      this.updateForm(this.form);
    } else {
      delete (this.formResolver);
    }
  }

  private updateForm(form: FormModel) {
    this.formResolver = new FormResolver(form);
    this.updateCurrentSection(this.formResolver.sections[0]);
    this.fieldValues = {};
  }

  private updateCurrentSection(name?: string) {
    const keys: Array<string> = [];
    const fields: Array<FieldDescriptor> = [];
    let previous: string | undefined;
    let next: string | undefined;

    if (this.formResolver && name) {
      const mappedSection = this.formResolver.sectionMap[name];
      if (mappedSection !== name) {
        this.updateCurrentSection(mappedSection);
        return;
      }

      const mapOrder = this.formResolver.orderMap[name];

      previous = this.formResolver.sections[mapOrder - 1];
      next = this.formResolver.sections[mapOrder + 1];

      const mapFields = this.formResolver.fieldMap[name];
      if (mapFields) {
        fields.push(...mapFields);
      }

      keys.push(name);

      const mapKeys = this.formResolver.nameMap[name];
      if (mapKeys) {
        keys.push(...mapKeys);
      }
    }

    this.current = { fields, keys, name, previous, next };
  }
}
