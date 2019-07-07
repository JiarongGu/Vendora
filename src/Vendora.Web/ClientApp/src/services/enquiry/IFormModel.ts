import { ValidationRule } from 'antd/lib/form';

export interface IFormModel {
  name: string;
  language: string;
  metadata: IFormMetadata;
}

export interface IFormMetadata {
  formSections: IFormSection[];
}

export interface IFormSection {
  label: string;
  order: number;
  fieldDescriptors: IFieldDescriptor[];
}

export interface IFieldDescriptor {
  name: string;
  label: string;
  type: string;
  defaultValues: string[];
  placeholder: string;
  hint: string;
  information: string;
  order: number;
  fieldDependencies: IFieldDependency[];
  fieldOptions: IFieldOption[];
  validationRules: ValidationRule[];
  fieldDescriptors: IFieldDescriptor[];
}

export interface IFieldDependency {
  name: string;
  values: string[];
  pattern: string;
}

export interface IFieldOption {
  label: string;
  value: string;
}
