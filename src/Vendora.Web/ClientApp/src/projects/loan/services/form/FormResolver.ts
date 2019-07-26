import * as _ from 'lodash';

import { FieldDescriptor, FormModel, FormSection } from './FormModel';

export interface FieldMap {
  name: string;
  map: Array<FieldDescriptor>;
}

export interface SectionMap {
  name: string;
  map: string;
}

export class FormResolver {
  public sectionMap: { [key: string]: string } = {};
  public sections: Array<string>;
  public nameMap: { [key: string]: Array<string> } = {};
  public fieldMap: { [key: string]: Array<FieldDescriptor> } = {};
  public orderMap: { [key: string]: number };

  constructor(form: FormModel) {
    const formSections = form.metadata.formSections;

    const { sections, orderMap, sectionMap } = this.formatOrderMap(formSections);
    const nameMap = this.formatNameMap(formSections);
    const fieldMap = this.formatFieldMap(formSections);

    this.sections = sections;
    this.orderMap = orderMap;
    this.nameMap = nameMap;
    this.fieldMap = fieldMap;
    this.sectionMap = sectionMap;
  }

  private formatOrderMap(formSections: Array<FormSection>) {
    const sectionMaps = _.flatMap(formSections.map(section => this.getOrderMap(section)));
    const sections = sectionMaps.filter(x => x.map === x.name).map(x => x.name);
    const orderMap = sections.reduce((map, name, index) => (map[name] = index, map), {});

    const sectionMap = sectionMaps.reduce((map, section) => (map[section.name] = section.map, map), {});

    return { sections, sectionMap, orderMap };
  }

  private formatNameMap(formSections: Array<FormSection>) {
    return _.flatMap(formSections.map(
      section => this.getNameMap(section)
    )).reduce((map, current) => (map[current.name] = current.map, map), {});
  }

  private formatFieldMap(formSections: Array<FormSection>) {
    return _.flatMap(
      formSections.map(section => this.getFieldMap(section))
    ).reduce((map, current) => (map[current.name] = current.map, map), {});
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
