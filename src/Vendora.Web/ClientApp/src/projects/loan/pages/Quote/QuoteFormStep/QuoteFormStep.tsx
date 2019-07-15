import { Form, Radio, Select } from 'antd';
import * as React from 'react';
import * as styles from './QuoteFormStep.module.less';

export function QuoteFormStepComponent(props: { form: { getFieldDecorator: any; }; }) {
  const {
    form: { getFieldDecorator }
  } = props;

  return (
    <div className={styles.stepContainer}>
      <div>
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
      <div className={styles.select}>
        <Form.Item label={'房产使用类型'}>
          {getFieldDecorator('propertyUsage', {
            rules: [{ required: true, message: 'Please select your use property!' }]
          })(
            <Select placeholder={'请选择房产使用类型'}>
              <Select.Option value={'living'}>自主房</Select.Option>
              <Select.Option value={'invest'}>投资房</Select.Option>
            </Select>
          )}
        </Form.Item>
      </div>
    </div>
    // <div id="step1" className={styles.section}>
    //     <div className={styles.formRow}>
    //         <div className={styles.column12}>
    //         <Form.Item label={'服务类型'}>
    //             {getFieldDecorator('service', {
    //             rules: [
    //                 {
    //                 required: true,
    //                 message: '请选择服务类型',
    //                 },
    //             ]
    //             })(
    //             <Radio.Group>
    //                 <Radio value={'newhome'}>购置新房</Radio>
    //                 <Radio value={'refinance'}>房屋融资</Radio>
    //             </Radio.Group>,
    //             )}
    //         </Form.Item>
    //         </div>
    //     </div>

    //     <div className={styles.formRow}>
    //         <div className={styles.column6}>
    //         <Form.Item label={'房产使用类型'}>
    //             {getFieldDecorator('propertyUsage', {
    //             rules: [{ required: true, message: 'Please select your use property!' }],
    //             })(
    //             <Select placeholder={'请选择房产使用类型'}>
    //                 <Select.Option value={'living'}>自主房</Select.Option>
    //                 <Select.Option value={'invest'}>投资房</Select.Option>
    //             </Select>
    //             )}
    //         </Form.Item>
    //         </div>

    //         <div className={styles.column6}>
    //         <Form.Item label={'房产价值'}>
    //             {getFieldDecorator('propertyValue', {
    //             rules: [
    //                 {
    //                 required: true,
    //                 message: 'Please input your property value',
    //                 },
    //             ],
    //             })(<CurrencyInput />)}
    //         </Form.Item>
    //         </div>
    //     </div>
    // </div>
  );
}