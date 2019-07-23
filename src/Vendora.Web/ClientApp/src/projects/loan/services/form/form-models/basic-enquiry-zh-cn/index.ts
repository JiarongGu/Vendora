import { FormModel, FormSection } from '../../FormModel';
import { basicInformation } from './sections/basicInformation';
import { loanInformation } from './sections/loanInformation';
import { propertyInformation } from './sections/propertyInformation';

const familyInformation: FormSection = {
  name: 'family information',
  label: '家庭情况',
  fieldDescriptors: [
    {
      name: 'marriage status',
      type: 'select',
      label: '婚姻状况',
      fieldOptions: [
        { label: '单身', value: 'single' },
        { label: '已婚', value: 'married' },
        { label: '同居', value: 'de facto' }
      ],
      validationRules: [
        { message: '请选择婚姻状况', required: true }
      ]
    },
    {
      name: 'number of dependents',
      type: 'number',
      label: '家属人数',
      order: 1,
      validationRules: [
        { message: '请输入家属人数', required: true }
      ]
    }
  ]
};

const employmentInformation: FormSection = {
  name: 'employment information',
  label: '工作情况',
  order: 1,
  fieldDescriptors: [
    {
      name: 'employment type',
      type: 'select',
      label: '受雇类型',
      fieldOptions: [
        { label: '雇员', value: 'employee' },
        { label: '自雇', value: 'self-employed' },
        { label: '其他', value: 'other' }
      ],
      validationRules: [
        { message: '请选择受雇类型', required: true }
      ]
    }]
};

const majorIncomeInformation: FormSection = {
  name: 'major income',
  label: '主要收入',
  fieldDescriptors: [
    {
      name: 'primary income',
      type: 'currency',
      label: '家庭总收入',
      validationRules: [
        { message: '请输入家庭总收入', required: true }
      ],
      fieldDependencies: [
        { name: 'marriage status', values: ['married', 'de facto'] }
      ]
    },
    {
      name: 'primary income',
      type: 'currency',
      label: '个人收入',
      validationRules: [
        { message: '请输入个人收入', required: true }
      ],
      fieldDependencies: [
        { name: 'marriage status', values: ['single'] }
      ]
    }]
};

const otherIncomeInformation: FormSection = {
  name: 'other income',
  label: '其他收入',
  fieldDescriptors: [
    {
      name: 'rental income',
      type: 'currency',
      label: '租金收入',
    },
    {
      name: 'total other Incomes',
      type: 'currency',
      label: '其他总收入',
    }
  ]
};

const creditInformation: FormSection =  {
  name: 'credits',
  label: '信用卡情况',
  fieldDescriptors: [
    {
      name: 'total credit card limits',
      type: 'currency',
      label: '信用卡总额度',
    }
  ]
};

const otherLoanInformation: FormSection = {
  name: 'other loans',
  label: '其他贷款',
  fieldDescriptors: [
    {
      name: 'existing loan',
      type: 'radio',
      label: '其他现有贷款',
      fieldOptions: [
        { label: '无其他贷款', value: 'true' },
        { label: '有其他贷款', value: 'false' }],
      validationRules: [
        { message: '请选择其他贷款信息', required: true }
      ]
    },
    {
      name: 'owner-occupied monthly repayment',
      type: 'currency',
      label: '每月自住房还款额度',
      fieldDependencies: [
        { name: 'other loan', values: ['true'] }
      ]
    },
    {
      name: 'total investment monthly repayment',
      type: 'currency',
      label: '每月投资还款额度',
      fieldDependencies: [
        { name: 'other loan', values: ['true'] }
      ]
    },
    {
      name: 'other liabilities monthly repayment',
      type: 'currency',
      label: '每月其他贷款还款额度',
      fieldDependencies: [
        { name: 'other loan', values: ['true'] }
      ]
    }
  ]
};

const contactInformation: FormSection = {
  name: 'contact information',
  label: '详细联络信息',
  order: 0,
  fieldDescriptors: [
    {
      name: 'last name',
      type: 'text',
      label: '姓',
      order: 0,
      validationRules: [
        { message: '请输入姓', required: true }
      ]
    },
    {
      name: 'surname',
      type: 'text',
      label: '名',
      order: 1,
      validationRules: [
        { message: '请输入名', required: true }
      ]
    },
    {
      name: 'contact email',
      type: 'email',
      label: '邮箱',
      order: 2,
      validationRules: [
        { message: '请输入邮箱', required: true }
      ]
    },
    {
      name: 'contact phone',
      type: 'phone',
      label: '联系电话',
      order: 3
    },
    {
      name: 'suitable contact time',
      type: 'multi-check',
      label: '联系时间',
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

export const basicEnquiryZhCn: FormModel = {
  name: 'basic-enquiry',
  language: 'zh-cn',
  metadata: {
    formSections: [
      {
        label: '所需服务',
        name: 'service detail',
        formSections: [
          basicInformation,
          propertyInformation,
          loanInformation
        ]
      },
      {
        label: '关于申请人',
        name: 'applicant detail',
        formSections: [
          familyInformation,
          employmentInformation,
          majorIncomeInformation,
          otherIncomeInformation,
          creditInformation,
          otherLoanInformation
        ],
      },
      {
        label: '联系方式',
        name: 'contact detail',
        formSections: [contactInformation]
      }
    ]
  }
};
