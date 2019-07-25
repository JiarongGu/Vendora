import { FieldDescriptor, FormSection } from '../../../FormModel';

export const incomeInformation: FormSection = {
  name: 'income section',
  label: 'Income Details',
  fieldDescriptors: [
     {
      name: 'employment type',
      type: 'select',
      label: 'Employment',
      fieldOptions: [
        { label: 'Employee', value: 'employee' },
        { label: 'Self-employed', value: 'self-employed' },
        { label: 'Other', value: 'other' }
      ],
      validationRules: [
        { message: 'Please select employment type', required: true }
      ]
    },
    {
      name: 'primary income',
      type: 'currency',
      label: 'Family income',
      validationRules: [
        { message: 'Please enter total family income', required: true }
      ],
      fieldDependencies: [
        { name: 'marriage status', values: ['married', 'de facto'] }
      ]
    },
    {
      name: 'primary income',
      type: 'currency',
      label: 'Personal income',
      validationRules: [
        { message: 'Please enter your personal income', required: true }
      ],
      fieldDependencies: [
        { name: 'marriage status', values: ['single'] }
      ]
    },
    {
      name: 'rental income',
      type: 'currency',
      label: 'Rental income',
    },
    {
      name: 'total other Incomes',
      type: 'currency',
      label: 'Other incomes',
    }]
};
