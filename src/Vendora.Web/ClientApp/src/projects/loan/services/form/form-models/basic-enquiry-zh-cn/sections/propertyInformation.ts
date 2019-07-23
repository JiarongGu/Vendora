import { FormSection } from '@loan/services/form/FormModel';

export const propertyInformation: FormSection = {
  name: 'property info',
  label: '房产信息',
  fieldDescriptors: [
    {
      name: 'property value',
      type: 'currency',
      label: '房产价值',
      validationRules: [
        { message: '请输入房产价值', required: true }
      ]
    },
    {
      name: 'property suburb',
      type: 'suburb',
      label: '房屋所在地区',
      validationRules: [
        { message: '请选择房屋所在地区', required: true }
      ]
    },
    {
      name: 'use of property',
      type: 'radio',
      label: '房产使用类型',
      fieldOptions: [
        { label: '自住房', value: 'owner-occupied' },
        { label: '投资房', value: 'investment' }
      ],
      validationRules: [
        { message: '请选择房产使用类型', required: true }
      ]
    }
  ]
};
