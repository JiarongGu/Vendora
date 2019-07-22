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

interface SectionMap {
  name: string;
  map: string;
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
  @state public current: CurrentSection = { keys: [], fields: [] };
  @state public fieldValues: { [key: string]: any } = {};

  private sectionMap: { [key: string]: string } = {};
  private sections: Array<string>;
  private nameMap: { [key: string]: Array<string> } = {};
  private fieldMap: { [key: string]: Array<FieldDescriptor> } = {};
  private orderMap: { [key: string]: number };

  constructor(private formSink: FormSink) { }

  @effect
  public openSection(name: string) {
    if (this.current.name !== name) {
      this.updateCurrentSection(name);
    }
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
    if (this.form) this.updateForm(this.form);
  }

  private updateForm(from: FormModel) {
    const sections = from.metadata.formSections;

    this.updateOrderMap(sections);
    this.updateNameMap(sections);
    this.updateFieldMap(sections);

    this.updateCurrentSection(this.sections[0]);
    this.fieldValues = {};
  }

  private updateCurrentSection(name?: string) {
    const keys: Array<string> = [];
    const fields: Array<FieldDescriptor> = [];
    let previous: string | undefined;
    let next: string | undefined;

    if (name) {
      const mappedSection = this.sectionMap[name];
      if (mappedSection !== name) {
        this.updateCurrentSection(mappedSection);
        return;
      }

      const mapOrder = this.orderMap[name];

      previous = this.sections[mapOrder - 1];
      next = this.sections[mapOrder + 1];

      const mapFields = this.fieldMap[name];
      if (mapFields) {
        fields.push(...mapFields);
      }

      keys.push(name);

      const mapKeys = this.nameMap[name];
      if (mapKeys) {
        keys.push(...mapKeys);
      }
    }

    this.current = { fields, keys, name, previous, next };
  }

  private updateOrderMap(formSections: Array<FormSection>): void {
    const sectionMaps = _.flatMap(formSections.map(section => this.getOrderMap(section)));
    this.sectionMap = sectionMaps.reduce((map, sectionMap) => (map[sectionMap.name] = sectionMap.map, map), {});
    this.sections = sectionMaps.filter(x => x.map === x.name).map(x => x.name);
    this.orderMap = this.sections.reduce((map, name, index) => (map[name] = index, map), {});
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

  private getOrderMap(fromSection: FormSection): Array<SectionMap> {
    const orderMaps: Array<SectionMap> = [];
    const sections = fromSection.formSections;
    const subOrderMap = sections && _.flatMap(sections.map(section => this.getOrderMap(section))) || [];

    if (fromSection.fieldDescriptors && fromSection.fieldDescriptors.length > 0) {
      orderMaps.push({ name: fromSection.name, map: fromSection.name });
    } else {
      orderMaps.push({ name: fromSection.name, map: subOrderMap[0].map });
    }

    orderMaps.push(...subOrderMap);
    return orderMaps;
  }
}
