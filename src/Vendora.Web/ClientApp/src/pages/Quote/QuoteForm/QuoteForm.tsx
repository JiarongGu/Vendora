import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form/Form';
import InputNumber from 'antd/lib/input';
import Input from 'antd/lib/input';
import AutoComplete from 'antd/lib/auto-complete';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';

import { CurrencyInput } from '@components/Input';
import * as styles from './QuoteForm.module.less';


interface QuoteFormProps extends FormComponentProps {

}

export class QuoteFormComponent extends React.Component<QuoteFormProps> {
  state = { suburbAutoCompleteResult: []};


  handleSuburbChange = (value) => {
    let result;
    if (!value) {
      result = ['Burwood', 'Chatswood', 'Ashfield', 'Hornsby'];
    } else {
      result = ['Burwood', 'Chatswood', 'Ashfield', 'Hornsby'].filter((sub) => new RegExp(value, "i").test(sub));
    }
    this.setState({ 'suburbAutoCompleteResult': result });
  }
  
  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { suburbAutoCompleteResult } = this.state;
    const suburbOptionsTemplate = suburbAutoCompleteResult.map(sub => (
      <AutoComplete.Option key={sub}>{sub}</AutoComplete.Option>
    ));

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="61">+61</Select.Option>
      </Select>,
    );
    return (
      <Form className={styles.container}>
        <div id="step1" className={styles.section}>
          <div className={styles.formRow}>
            <div className={styles.column12}>
              <Form.Item label={'服务类型'}>
                {getFieldDecorator('service', {
                  rules: [
                    {
                      required: true,
                      message: '请选择服务类型',
                    },
                  ]
                })(
                  <Radio.Group>
                    <Radio value={'newhome'}>购置新房</Radio>
                    <Radio value={'refinance'}>房屋融资</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'房产使用类型'}>
                {getFieldDecorator('propertyUsage', {
                  rules: [{ required: true, message: 'Please select your use property!' }],
                })(
                  <Select placeholder={'请选择房产使用类型'}>
                    <Select.Option value={'living'}>自主房</Select.Option>
                    <Select.Option value={'invest'}>投资房</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </div>
            
            <div className={styles.column6}>
              <Form.Item label={'房产价值'}>
                {getFieldDecorator('propertyValue', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your property value',
                    },
                  ],
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
          </div>
        </div>
        <div id="step1"  className={styles.section}>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'已付款额度'}>
                {getFieldDecorator('currentDepoist', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'所需贷款额度'}>
                {getFieldDecorator('currentDepoist', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'申请人数'}>
                {getFieldDecorator('applicantsNumber', {
                  rules: [
                    {
                      required: true,
                      message: '请输入申请人数！',
                    },
                  ],
                })(<InputNumber min={1} max={5} />)}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'房屋所在地区'}>
                {getFieldDecorator('propertySuburb', {
                    rules: [{ required: true, message: '请输入房屋所在区域！' }],
                  })(
                    <AutoComplete
                      dataSource={suburbOptionsTemplate}
                      onChange={this.handleSuburbChange}
                      placeholder="所在区"
                    >
                      <Input />
                    </AutoComplete>
                  )}
              </Form.Item>
            </div>
          </div>
        </div>
        <div id='step3' className={styles.section}>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'婚姻状况'}>
                {getFieldDecorator('marriageStatus', {
                  rules: [{ required: true, message: '请选择婚姻状况' }],
                })(
                  <Select placeholder={'请选择婚姻状况'}>
                    <Select.Option value={'married'}>已婚</Select.Option>
                    <Select.Option value={'single'}>单身</Select.Option>
                    <Select.Option value={'de facto'}>同居</Select.Option>
                    <Select.Option value={'devorced'}>离婚</Select.Option>
                    <Select.Option value={'widowed'}>丧偶</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'家属人数'}>
                {getFieldDecorator('dependentsNumber', {
                    rules: [{ required: true, message: '请输入家属人数' }],
                  })(<InputNumber min={1} max={20} />)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'雇佣状况'}>
                {getFieldDecorator('employmentStatus', {
                  rules: [{ required: true, message: '请选择雇佣状况' }],
                })(
                  <Select placeholder={'请选择雇佣状况'}>
                    <Select.Option value={'employee'}>雇员</Select.Option>
                    <Select.Option value={'worker'}>合同工</Select.Option>
                    <Select.Option value={'selfEmployed'}>自雇</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'请输入家庭总收入'}>
                {getFieldDecorator('housholdIncome', {
                    rules: [{ required: true, message: '请输入家庭总收入' }],
                  })(<CurrencyInput />)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'租金收入'}>
                {getFieldDecorator('rentalIncome', {
                  rules: [{ required: true, message: '请输入租金收入' }],
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'其他总收入'}>
                {getFieldDecorator('otherIncome', {
                    rules: [{ required: true, message: '请输入家庭总收入' }],
                  })(<CurrencyInput />)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'每月投资总还款额'}>
                {getFieldDecorator('investmentRepayment', {
                  rules: [{ required: true, message: '请输入每月投资总还款额' }],
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'自住房每月还款额'}>
                {getFieldDecorator('ooRepayment', {
                    rules: [{ required: true, message: '请输入自住房每月还款额' }],
                  })(<CurrencyInput />)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'其他债务每月还款额'}>
                {getFieldDecorator('otherLabilityRepayment', {
                  rules: [{ required: true, message: '请输入其他债务每月还款额' }],
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'信用总额度'}>
                {getFieldDecorator('totalCredit', {
                    rules: [{ required: true, message: '请输入信用总额度' }],
                  })(<CurrencyInput />)}
              </Form.Item>
            </div>
          </div>
        </div>
        <div id='step4' className={styles.section}>
          <div className={styles.formRow}>
            <div className={styles.column3}>
              <Form.Item label={'姓氏'}>
                {getFieldDecorator('surname', {
                    rules: [{ required: true, message: '请输入姓氏' }],
                  })(<Input placeholder="姓氏"/>)}
              </Form.Item>
            </div>
            <div className={styles.column5}>
              <Form.Item label={'名'}>
                {getFieldDecorator('firstname', {
                    rules: [{ required: true, message: '请输入名字' }],
                  })(<Input placeholder="名"/>)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label="邮箱">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: '请输入正确的邮箱地址格式',
                    },
                    {
                      required: true,
                      message: '请输入邮箱地址！',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label="手机号码">
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请输入手机号码！' }],
                })(<Input addonBefore={prefixSelector} />)}
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}

export const QuoteForm = Form.create({ name: 'quote' })(QuoteFormComponent);