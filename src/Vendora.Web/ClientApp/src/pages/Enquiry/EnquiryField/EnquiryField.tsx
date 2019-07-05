import { CurrencyInput } from '@components';
import { IFieldDescriptor } from '@services/enquiry/IFormModel';
import { Input, InputNumber, Radio, Select } from 'antd';
import * as React from 'react';
import * as styles from './EnquiryField.module.less';

interface EnquiryFieldProps {
  fieldDescriptor: IFieldDescriptor;
}

function mapRadioField(descriptor: IFieldDescriptor) {
  return (
    <Radio.Group>
      {descriptor.fieldOptions.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
}

function mapSelectField(descriptor: IFieldDescriptor) {
  return (
    <Select className={styles.field} placeholder={descriptor.placeholder}>
      {descriptor.fieldOptions.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
}

function mapCurrencyField(descriptor: IFieldDescriptor) {
  return <CurrencyInput />;
}

function mapTextField(descriptor: IFieldDescriptor) {
  return <Input className={styles.field} />;
}

function mapNumberField(descriptor: IFieldDescriptor) {
  return <InputNumber className={styles.field} />;
}

function mapEmailField(descriptor: IFieldDescriptor) {
  return <InputNumber className={styles.field} />;
}

function mapPhoneField(descriptor: IFieldDescriptor) {
  return <InputNumber className={styles.field} />;
}

const fieldMap: { [key: string]: (descriptor?: IFieldDescriptor) => JSX.Element } = {
  radio: mapRadioField,
  select: mapSelectField,
  currency: mapCurrencyField,
  text: mapTextField,
  number: mapNumberField,
  email: mapEmailField,
  phone: mapPhoneField
};

export class EnquiryField extends React.Component<EnquiryFieldProps> {
  public render() {
    const { fieldDescriptor } = this.props;
    const mapper = fieldMap[fieldDescriptor.type];
    return mapper ? <div className={styles.container}>{mapper(fieldDescriptor)}</div> : null;
  }
}
