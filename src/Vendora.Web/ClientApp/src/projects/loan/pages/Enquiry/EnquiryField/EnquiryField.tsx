import { FieldDescriptor } from '@loan/services/enquiry';
import { CurrencyInput, RenshuInput } from '@shared/components';
import { Input, InputNumber, Radio, Select } from 'antd';
import * as React from 'react';
import * as styles from './EnquiryField.module.less';

interface EnquiryFieldProps {
  fieldDescriptor: FieldDescriptor;
}

function mapRadioField(descriptor: FieldDescriptor) {
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

function mapSelectField(descriptor: FieldDescriptor) {
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

function mapCurrencyField(descriptor: FieldDescriptor) {
  return <CurrencyInput />;
}

function mapTextField(descriptor: FieldDescriptor) {
  return <Input className={styles.field} />;
}

function mapNumberField(descriptor: FieldDescriptor) {
  return <RenshuInput />;
}

function mapEmailField(descriptor: FieldDescriptor) {
  return <Input className={styles.field} />;
}

function mapPhoneField(descriptor: FieldDescriptor) {
  return <Input className={styles.field} />;
}

const fieldMap: { [key: string]: (descriptor?: FieldDescriptor) => JSX.Element } = {
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
