import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form/Form';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import { CurrencyInput } from '@components/Input';

interface QuoteFormProps extends FormComponentProps {

}

export class QuoteFormComponent extends React.Component<QuoteFormProps> {
  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form>
        <Form.Item label={'Needed Service'}>
          {getFieldDecorator('service', {
            rules: [
              {
                required: true,
                message: 'Please select service',
              },
            ]
          })(
            <Radio.Group>
              <Radio value={'newhome'}>New Home Loan</Radio>
              <Radio value={'refinance'}>Refinance</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <div style={{ display: 'flex' }}>
          <Form.Item label={'Use of Property'}>
            {getFieldDecorator('property', {
              rules: [
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={'Property Value'}>
            {getFieldDecorator('property', {
              rules: [
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </div>
        <div style={{ display: 'flex' }}>
          <Form.Item label={'Current Deposit'}>
            {getFieldDecorator('currentDepoist', {
              rules: [
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<CurrencyInput />)}
          </Form.Item>
          <Form.Item label={'Expected Loan Amount'}>
            {getFieldDecorator('currentDepoist', {
              rules: [
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </div>
      </Form>
    )
  }
}

export const QuoteForm = Form.create({ name: 'quote' })(QuoteFormComponent);