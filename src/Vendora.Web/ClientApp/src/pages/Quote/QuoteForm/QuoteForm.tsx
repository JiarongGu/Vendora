import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form/Form';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';

import { CurrencyInput } from '@components/Input';
import * as styles from './QuoteForm.module.less';


interface QuoteFormProps extends FormComponentProps {

}

export class QuoteFormComponent extends React.Component<QuoteFormProps> {
  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form className={styles.container}>
        <div className={styles.section}>
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
          <Form.Item label={'房产使用类型'}>
            {getFieldDecorator('propertyUsage', {
              rules: [{ required: true, message: 'Please select your use property!' }],
            })(
              <Select placeholder={'请选择房产使用类型'}>
                <Select.Option value={'living'}>自主房</Select.Option>
                <Select.Option value={'invest'}>投资房</Select.Option>
              </Select>,
            )}
          </Form.Item>
        </div>
        <div className={styles.section}>
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
      </Form>
    )
  }
}

export const QuoteForm = Form.create({ name: 'quote' })(QuoteFormComponent);