import { FormSection } from '@loan/services/form/FormModel';

export const loanInformation: FormSection = {
  name: 'loan info',
  label: 'About the loan',
  fieldDescriptors: [
    {
      name: 'current deposit',
      type: 'currency',
      label: 'Current deposit value',
      validationRules: [
        { message: 'Please enter current deposit value', required: true }
      ]
    },
    {
      name: 'expected loan amount',
      type: 'currency',
      label: 'Required loan amount',
      validationRules: [
        { message: 'Please enter required loan amount', required: true }
      ]
    }
  ]
};
