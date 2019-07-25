import { FormModel, FormSection } from '../../FormModel';
import { basicInformation } from './sections/basicInformation';
import { loanInformation } from './sections/loanInformation';
import { propertyInformation } from './sections/propertyInformation';
import { familyInformation } from './sections/familyInformation';
import { incomeInformation } from './sections/incomeInformation';
import { creditInformation } from './sections/creditInformation';
import { otherLoanInformation } from './sections/otherLoanInformation';

const contactTimeInformation: FormSection = {
  name: 'available time',
  label: 'Choose Available Time',
  order: 0,
  fieldDescriptors: [
    {
      name: 'suitable contact time',
      type: 'multi-check',
      label: 'Please select your suitable time slots:',
      order: 4,
      fieldOptions: [
        { label: '任何时间', value: 'anytime' },
        { label: '早上', value: 'morning' },
        { label: '午餐时间', value: 'lunch' },
        { label: '下午', value: 'afternoon' },
        { label: '晚上', value: 'evening' }
      ],
      validationRules: [
        { message: '请选择至少一个联系时间, 已方便我们及时联系您', required: true }
      ]
    }
  ]
};

const contactInformation: FormSection = {
  name: 'contact information',
  label: 'Contact Detail',
  order: 0,
  fieldDescriptors: [
    {
      name: 'last name',
      type: 'text',
      label: 'Last name',
      order: 0,
      validationRules: [
        { message: 'Please enter your last name', required: true }
      ]
    },
    {
      name: 'surname',
      type: 'text',
      label: 'Surname',
      order: 1,
      validationRules: [
        { message: 'Please enter your surname', required: true }
      ]
    },
    {
      name: 'contact email',
      type: 'email',
      label: 'Email',
      order: 2,
      validationRules: [
        { message: 'Please enter your email', required: true }
      ]
    },
    {
      name: 'contact phone',
      type: 'phone',
      label: 'Phone',
      order: 3
    }
  ]
};

export const basicEnquiryEnGB: FormModel = {
  name: 'basic-enquiry',
  language: 'en-gb',
  metadata: {
    formSections: [
      {
        label: 'Start application',
        name: 'service detail',
        formSections: [
          basicInformation,
          propertyInformation,
          loanInformation
        ]
      },
      {
        label: 'About applicant',
        name: 'applicant detail',
        formSections: [
          familyInformation,
          incomeInformation,
          creditInformation,
          otherLoanInformation
        ],
      },
      {
        label: 'Final step',
        name: 'contact details',
        formSections: [
          contactInformation,
          contactTimeInformation
        ]
      }
    ]
  }
};
