import { FieldDescriptor } from '@loan/services/form/FormModel';

export type SetValue = (name: string, value: any) => void;
export interface DynamicFieldProps {
  descriptor: FieldDescriptor;
  defaultValue: any;
  setValue: SetValue;
}
