import * as _ from 'lodash';
import { match } from 'react-router';
import { effect, sink, state } from 'redux-sink';

import { FieldDescriptor, FormModel, FormSection } from '@loan/services/form/FormModel';
import { FormSink } from '@loan/services/form/FormSink';
import { locationTrigger } from '@shared/decorators/locationTrigger';

interface EnquiryMatches {
  language: string;
  name: string;
}

interface FieldMap {
  name: string;
  map: Array<FieldDescriptor>;
}

@sink('enquirySink', FormSink)
export class EnquirySink {
  @state public form?: FormModel;
  @state public step: number;
  @state public stepName: string = '';
  @state public openKeys: Array<string> = [];
  @state public openFields: Array<FieldDescriptor> = [];

  private currentOpen: string;
  private nameMap: { [key: string]: Array<string> } = {};
  private fieldMap: { [key: string]: Array<FieldDescriptor> } = {};

  constructor(private formSink: FormSink) { }

  @effect
  public updateState(updateAction: (enquirySink: EnquirySink) => void) {
    updateAction(this);
  }

  @effect
  public updateFormFields() {
    // call it on answers change
  }

  @effect
  public open(name: string) {
    if (this.currentOpen !== name) {
      this.updateOpen(name);
      this.currentOpen = name;
    }
  }

  @locationTrigger('/:language/enquiry/:name')
  public async getFormTrigger(matches: match<EnquiryMatches>) {
    this.form = this.formSink.get(matches.params.name);
    this.step = 0;
    if (this.form) this.updateForm(this.form);
  }

  private updateForm(from: FormModel) {
    const sections = from.metadata.formSections;
    this.updateNameMap(sections);
    this.updateFieldMap(sections);

    this.updateOpen(sections[0] && sections[0].name);
  }

  private updateOpen(name?: string) {
    const openKeys: Array<string> = [];
    const openFields: Array<FieldDescriptor> = [];

    if (name) {
      openKeys.push(name);

      const mapKeys = this.nameMap[name];
      if (mapKeys) openKeys.push(...mapKeys);

      const mapFields = this.fieldMap[name];
      if (mapFields) openFields.push(...mapFields);
    }

    this.openKeys = openKeys;
    this.openFields = openFields;
  }

  private updateFieldMap(formSections: Array<FormSection>): void {
    this.fieldMap = _.flatMap(
      formSections.map(section => this.getFieldMap(section))
    ).reduce((map, current) => (map[current.name] = current.map), {});
  }

  private updateNameMap(formSections: Array<FormSection>): void {
    this.nameMap = _.flatMap(formSections.map(
      section => this.getNameMap(section)
    )).reduce((map, current) => (map[current.name] = current.map, map), {});
  }

  private getNameMap(fromSection: FormSection): Array<{ name: string, map: Array<string> }> {
    const sections = fromSection.formSections;

    if (!sections || sections.length === 0)
      return [];

    return _.flatMap(sections.map(section => {
      const subNameMap = this.getNameMap(section);
      subNameMap.forEach(x => x.map.push(fromSection.name));

      return [
        ...subNameMap,
        {
          name: section.name,
          map: [fromSection.name]
        }];
    }));
  }

  private getFieldMap(formSection: FormSection): Array<FieldMap> {
    const fieldMaps: Array<FieldMap> = [];

    if (formSection.fieldDescriptors && formSection.fieldDescriptors.length > 0) {
      fieldMaps.push({ name: formSection.name, map: formSection.fieldDescriptors });
    }

    const subSection = formSection.formSections;

    if (subSection) {
      const subFieldMaps = _.flatMap(subSection.map(section => this.getFieldMap(section)));
      fieldMaps.push(...subFieldMaps);
    }

    return fieldMaps;
  }
}
