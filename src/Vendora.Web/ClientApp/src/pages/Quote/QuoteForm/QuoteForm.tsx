import { Button, Carousel, Form, Input, InputNumber, Radio, Select } from 'antd';
import * as React from 'react';

import { CurrencyInput } from '@components/Input';
import SuburbInput from '@components/Input/SuburbInput/SuburbInput';
import { FormComponentProps } from 'antd/lib/form';
import * as styles from './QuoteForm.module.less';

interface  QuoteFormProps extends FormComponentProps {
  onIndexChange: any;
}


export class QuoteFormComponents extends React.Component<QuoteFormProps> {
  public suburbRef = React.createRef();
  public componentDidMount() {
    console.info(this.suburbRef.current);
  }

  public render() {
    let carousel: Carousel | null;

    const prev = (currentId) => {
      if (carousel) {
        carousel.prev();
        this.props.onIndexChange(currentId - 2);
      }
    };
    const next = (currentId) => {

      if (carousel) {
        carousel.next();
        this.props.onIndexChange(currentId);
      }
    };
    const {
      form: { getFieldDecorator }
    } = this.props;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86'
    })(
      <Select style={{ width: 70 }}>
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="61">+61</Select.Option>
      </Select>
    );
    return (
      <Form className={`${styles.container} quote-form`}>
        <Carousel
          dots={false}
          ref={(instance) => {
            carousel = instance;
          }}
        >
        <div id="step1" className={styles.section}>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'服务类型'}>
                {getFieldDecorator('service', {
                  rules: [
                    {
                      required: true,
                      message: '请选择服务类型'
                    }
                  ]
                })(
                  <Radio.Group>
                    <Radio value={'newhome'}>购置新房</Radio>
                    <Radio value={'refinance'}>房屋融资</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'房产价值'}>
                {getFieldDecorator('propertyValue', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your property value'
                    }
                  ]
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
          </div>

          <div className={` ${styles.formRow} ${styles.formButtonGroup} ${styles.single}`}>
            <Button size={'large'} type={'primary'} className={styles.right} onClick={() => next(1)}>Next</Button>
          </div>
        </div>
        <div id="step2" className={styles.section}>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'已付款额度'}>
                {getFieldDecorator('currentDepoist', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your E-mail!'
                    }
                  ]
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'所需贷款额度'}>
                {getFieldDecorator('currentDepoist', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your E-mail!'
                    }
                  ]
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
                      message: '请输入申请人数！'
                    }
                  ]
                })(<InputNumber min={1} max={5} />)}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'房屋所在地区'}>
                {getFieldDecorator('propertySuburb', {
                  rules: [{ required: true, message: '请输入房屋所在区域！' }]
                })(<SuburbInput ref={this.suburbRef} />)}
              </Form.Item>
            </div>
          </div>

           <div className={` ${styles.formRow} ${styles.formButtonGroup}`}>
              <Button size="large" className={styles.left} onClick={() => prev(2)}>Back</Button>
              <Button size={'large'} type={'primary'} className={styles.right} onClick={() => next(2)}>Next</Button>
            </div>
        </div>
        <div id="step3" className={styles.section}>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'婚姻状况'}>
                {getFieldDecorator('marriageStatus', {
                  rules: [{ required: true, message: '请选择婚姻状况' }]
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
                  rules: [{ required: true, message: '请输入家属人数' }]
                })(<InputNumber min={1} max={20} />)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'雇佣状况'}>
                {getFieldDecorator('employmentStatus', {
                  rules: [{ required: true, message: '请选择雇佣状况' }]
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
                  rules: [{ required: true, message: '请输入家庭总收入' }]
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'租金收入'}>
                {getFieldDecorator('rentalIncome', {
                  rules: [{ required: true, message: '请输入租金收入' }]
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'其他总收入'}>
                {getFieldDecorator('otherIncome', {
                  rules: [{ required: true, message: '请输入家庭总收入' }]
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'每月投资总还款额'}>
                {getFieldDecorator('investmentRepayment', {
                  rules: [{ required: true, message: '请输入每月投资总还款额' }]
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'自住房每月还款额'}>
                {getFieldDecorator('ooRepayment', {
                  rules: [{ required: true, message: '请输入自住房每月还款额' }]
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column6}>
              <Form.Item label={'其他债务每月还款额'}>
                {getFieldDecorator('otherLabilityRepayment', {
                  rules: [{ required: true, message: '请输入其他债务每月还款额' }]
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
            <div className={styles.column6}>
              <Form.Item label={'信用总额度'}>
                {getFieldDecorator('totalCredit', {
                  rules: [{ required: true, message: '请输入信用总额度' }]
                })(<CurrencyInput />)}
              </Form.Item>
            </div>
          </div>

          <div className={` ${styles.formRow} ${styles.formButtonGroup}`}>
            <Button size="large" className={styles.left} onClick={() => prev(3)}>Back</Button>
            <Button size={'default'} type={'primary'} className={styles.right} onClick={() => next(3)}>Next</Button>
          </div>
        </div>
        <div id="step4" className={styles.section}>
          <div className={styles.formRow}>
            <div className={styles.column3}>
              <Form.Item label={'姓氏'}>
                {getFieldDecorator('surname', {
                  rules: [
                    { required: true, message: '请输入姓氏' },
                    { required: true, message: '请输入姓氏' },
                    { pattern: /[a-zA-Z]/i, message: '仅拼音' }
                  ]
                })(<Input placeholder="姓氏" />)}
              </Form.Item>
            </div>
            <div className={styles.column4}>
              <Form.Item label={'名'}>
                {getFieldDecorator('firstname', {
                  rules: [
                    { required: true, message: '请输入名字拼音' },
                    { pattern: /[a-zA-Z]/i, message: '仅拼音' }
                  ]
                })(<Input placeholder="名" />)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column7}>
              <Form.Item label="邮箱">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: '请输入正确的邮箱地址格式'
                    },
                    {
                      required: true,
                      message: '请输入邮箱地址！'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.column7}>
              <Form.Item label="手机号码">
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '手机号码不能为空！' }]
                })(<Input addonBefore={prefixSelector} />)}
              </Form.Item>
            </div>
          </div>

          <div className={styles.formRow}/>
          <div className={` ${styles.formRow} ${styles.formButtonGroup}`}>
            <Button size="large" className={styles.left} onClick={() => prev(4)}>Back</Button>
            <Button size={'large'} type={'primary'} className={styles.right}>Finish</Button>
          </div>
        </div>
        </Carousel>
      </Form>
    );
  }
}

export const QuoteForm = Form.create({ name: 'quote' })(QuoteFormComponents);
