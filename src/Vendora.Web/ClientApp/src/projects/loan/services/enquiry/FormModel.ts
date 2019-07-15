import { ValidationRule } from 'antd/lib/form';

export interface FormModel {
  name: string;
  language: string;
  metadata: FormMetadata;
}

export interface FormMetadata {
  formSections: Array<FormSection>;
}

export interface FormSection {
  label: string;
  order: number;
  fieldDescriptors: Array<FieldDescriptor>;
}

export interface FieldDescriptor {
  name: string;
  label: string;
  type: string;
  defaultValues: string[];
  placeholder: string;
  hint: string;
  information: string;
  order: number;
  fieldDependencies: FieldDependency[];
  fieldOptions: FieldOption[];
  validationRules: ValidationRule[];
  fieldDescriptors: FieldDescriptor[];
}

export interface FieldDependency {
  name: string;
  values: string[];
  pattern: string;
}

export interface FieldOption {
  label: string;
  value: string;
}
