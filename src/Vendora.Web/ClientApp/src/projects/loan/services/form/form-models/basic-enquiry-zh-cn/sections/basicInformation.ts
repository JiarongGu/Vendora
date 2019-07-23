import { FieldDescriptor, FormSection } from '../../../FormModel';

const applicantsField: FieldDescriptor = {
  name: 'number of applicants',
  type: 'icon-radio',
  label: '申请人数',
  fieldOptions: [
    {
      label: '个人',
      value: 1,
      other: {
        icon: 'user'
      }
    },
    {
      label: '两人',
      value: 2,
      other: {
        icon: 'team'
      }
    }
  ],
  validationRules: [
    {
      message: '请选择申请人数',
      required: true
    }
  ]
};

const serviceTypeField: FieldDescriptor = {
  name: 'service type',
  type: 'icon-radio',
  label: '服务类型',
  fieldOptions: [
    {
      label: '购置新房',
      value: 'home loan',
      other: {
        icon: 'home'
      }
    },
    {
      label: '房屋融资',
      value: 'refinance',
      other: {
        icon: 'red-envelope'
      }
    }
  ],
  validationRules: [
    {
      message: '请选择服务类型',
      required: true
    }
  ]
};

export const basicInformation: FormSection = {
  name: 'basic information section',
  label: '基本信息',
  fieldDescriptors: [applicantsField, serviceTypeField]
};
