import { FieldDescriptor, FormSection } from '../../../FormModel';

export const otherLoanInformation: FormSection =  {
  name: 'loans information',
  label: 'Other Loans',
  fieldDescriptors: [
    {
      name: 'existing loan',
      type: 'icon-radio',
      label: 'Do you have any other loans?',
      fieldOptions: [
        { label: 'Yes, I do', value: 'true', other: { icon: 'check', optical: true } },
        { label: 'No, I don\'t', value: 'false', other: { icon: 'close', optical: true } }],
      validationRules: [
        { message: 'Please select your current loan situation', required: true }
      ]
    },
    {
      name: 'owner-occupied monthly repayment',
      type: 'currency',
      label: 'Owner-occupied monthly repayment',
      fieldDependencies: [
        { name: 'existing loan', values: ['true'] }
      ]
    },
    {
      name: 'total investment monthly repayment',
      type: 'currency',
      label: 'Total investment monthly repayment',
      fieldDependencies: [
        { name: 'existing loan', values: ['true'] }
      ]
    },
    {
      name: 'other liabilities monthly repayment',
      type: 'currency',
      label: 'Other liabilities monthly repayment',
      fieldDependencies: [
        { name: 'existing loan', values: ['true'] }
      ]
    }
  ]
};