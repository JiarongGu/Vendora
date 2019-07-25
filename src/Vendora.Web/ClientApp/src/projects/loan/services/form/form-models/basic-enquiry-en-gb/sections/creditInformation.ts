import { FieldDescriptor, FormSection } from '../../../FormModel';

export const creditInformation: FormSection =  {
  name: 'credit information',
  label: 'Credit Detail',
  fieldDescriptors: [
    {
      name: 'total credit card limits',
      type: 'currency',
      label: 'Total credit card limits',
    }
  ]
};