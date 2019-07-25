import { FieldDescriptor, FormSection } from '../../../FormModel';

const applicantsField: FieldDescriptor = {
  name: 'number of applicants',
  type: 'icon-radio',
  label: 'Applicants',
  fieldOptions: [
    {
      label: 'One',
      value: 1,
      other: {
        icon: 'user'
      }
    },
    {
      label: 'Two',
      value: 2,
      other: {
        icon: 'team'
      }
    }
  ],
  validationRules: [
    {
      message: 'Please select applicants',
      required: true
    }
  ]
};

const serviceTypeField: FieldDescriptor = {
  name: 'service type',
  type: 'icon-radio',
  label: 'Service Type',
  fieldOptions: [
    {
      label: 'Home loan',
      value: 'home loan',
      other: {
        icon: 'home'
      }
    },
    {
      label: 'Refinance',
      value: 'refinance',
      other: {
        icon: 'red-envelope'
      }
    }
  ],
  validationRules: [
    {
      message: 'Please select one service type',
      required: true
    }
  ]
};

export const basicInformation: FormSection = {
  name: 'basic information section',
  label: 'Select a service ',
  fieldDescriptors: [applicantsField, serviceTypeField]
};
