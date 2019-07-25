import { FieldDescriptor, FormSection } from '../../../FormModel';

export const familyInformation: FormSection = {
  name: 'family information',
  label: 'Family Status',
  fieldDescriptors: [
    {
      name: 'marriage status',
      type: 'select',
      label: 'Marriage',
      fieldOptions: [
        { label: 'Single', value: 'single' },
        { label: 'Married', value: 'married' },
        { label: 'De Facto', value: 'de facto' }
      ],
      validationRules: [
        { message: 'Please select marriage status', required: true }
      ]
    },
    {
      name: 'number of dependents',
      type: 'number',
      label: 'Dependents',
      order: 1,
      validationRules: [
        { message: 'Please enter the number of your dependents', required: true }
      ]
    }
  ]
};