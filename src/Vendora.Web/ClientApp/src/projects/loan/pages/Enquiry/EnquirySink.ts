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

interface CurrentSection {
  keys: Array<string>;
  fields: Array<FieldDescriptor>;
  name?: string;
  next?: string;
  previous?: string;
}

@sink('enquirySink', FormSink)
export class EnquirySink {
  @state public form?: FormModel;
  @state public current: CurrentSection =  { keys: [], fields: [] };
  @state public fieldData: { [key: string]: any } = {};

  private currentOpen: string;
  private sections: Array<string>;
  private nameMap: { [key: string]: Array<string> } = {};
  private fieldMap: { [key: string]: Array<FieldDescriptor> } = {};
  private orderMap: { [key: string]: number };

  constructor(private formSink: FormSink) {}

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
    if (this.form) this.updateForm(this.form);
  }

  private updateForm(from: FormModel) {
    const sections = from.metadata.formSections;

    this.updateOrderMap(sections);
    this.updateNameMap(sections);
    this.updateFieldMap(sections);

    this.updateOpen(sections[0] && sections[0].name);
    this.fieldData = {};
  }

  private updateOpen(name?: string) {
    const keys: Array<string> = [];
    const fields: Array<FieldDescriptor> = [];
    let previous: string | undefined;
    let next: string | undefined;

    if (name) {
      keys.push(name);

      const mapKeys = this.nameMap[name];
      if (mapKeys) keys.push(...mapKeys);

      const mapFields = this.fieldMap[name];
      if (mapFields) fields.push(...mapFields);

      const mapOrder = this.orderMap[name];
      previous = this.sections[mapOrder - 1];
      next = this.sections[mapOrder + 1];
    }

    this.current = { fields, keys, name, previous, next };
  }

  private updateFieldMap(formSections: Array<FormSection>): void {
    this.fieldMap = _.flatMap(
      formSections.map(section => this.getFieldMap(section))
    ).reduce((map, current) => (map[current.name] = current.map, map), {});
  }

  private updateNameMap(formSections: Array<FormSection>): void {
    this.nameMap = _.flatMap(formSections.map(
      section => this.getNameMap(section)
    )).reduce((map, current) => (map[current.name] = current.map, map), {});
  }

  private updateOrderMap(formSections: Array<FormSection>): void {
    this.sections = _.flatMap(formSections.map(
      section => this.getOrderMap(section)
    ));

    this.orderMap = this.sections
      .reduce((map, name, index) => (map[name] = index, map), {});
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

  private getOrderMap(fromSection: FormSection): Array<string> {
    const orderMaps: Array<string> = [fromSection.name];
    const sections = fromSection.formSections;

    if (sections) {
      const subOrderMap = _.flatMap(sections.map(section => this.getOrderMap(section)));
      orderMaps.push(...subOrderMap);
    }
    return orderMaps;
  }
}
