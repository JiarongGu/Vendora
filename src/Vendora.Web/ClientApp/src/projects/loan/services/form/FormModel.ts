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
  name: string;
  label: string;
  order?: number;
  formSections?: Array<FormSection>;
  fieldDescriptors?: Array<FieldDescriptor>;
}

export interface FieldDescriptor {
  name: string;
  label: string;
  type: string;
  defaultValues?: Array<string>;
  placeholder?: string;
  hint?: string;
  icon?: string;
  information?: string;
  order?: number;
  fieldDependencies?: Array<FieldDependency>;
  fieldOptions?: Array<FieldOption>;
  fieldDescriptors?: Array<FieldDescriptor>;
  validationRules?: Array<ValidationRule>;
}

export interface FieldDependency {
  name: string;
  values: Array<string>;
  pattern?: string;
}

export interface FieldOption {
  label: string;
  value: string | number | boolean;
}
