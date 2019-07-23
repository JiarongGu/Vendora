import { FormSection } from '@loan/services/form/FormModel';

export const loanInformation: FormSection = {
  name: 'loan info',
  label: '贷款信息',
  fieldDescriptors: [
    {
      name: 'current deposit',
      type: 'currency',
      label: '已付款额度',
      validationRules: [
        { message: '请输入已付款额度', required: true }
      ]
    },
    {
      name: 'expected loan amount',
      type: 'currency',
      label: '所需贷款额度',
      validationRules: [
        { message: '请输入已所需贷款额度', required: true }
      ]
    }
  ]
};
