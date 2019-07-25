import { FormSection } from '@loan/services/form/FormModel';

export const propertyInformation: FormSection = {
  name: 'property info',
  label: 'Property detail',
  fieldDescriptors: [
    {
      name: 'property value',
      type: 'currency',
      label: 'Property value',
      validationRules: [
        { message: 'Please enter your property value', required: true }
      ]
    },
    {
      name: 'property suburb',
      type: 'suburb',
      label: 'Property suburb',
      validationRules: [
        { message: 'Please choose the subrub your property located', required: true }
      ]
    },
    {
      name: 'use of property',
      type: 'radio',
      label: 'Use of Property',
      fieldOptions: [
        { label: 'Owner-Occupied', value: 'owner-occupied' },
        { label: 'Investment', value: 'investment' }
      ],
      validationRules: [
        { message: 'Please select usage of property', required: true }
      ]
    }
  ]
};
