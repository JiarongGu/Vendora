import { Input, InputNumber, Radio, Select } from 'antd';
import * as React from 'react';

import { FieldDescriptor } from '@loan/services/form/FormModel';
import { CurrencyInput, RenshuInput } from '@shared/components';
import * as styles from './EnquiryField.module.less';

interface EnquiryFieldProps {
  fieldDescriptor: FieldDescriptor;
}

function mapRadioField(descriptor: FieldDescriptor) {
  return (
    <Radio.Group>
      {descriptor.fieldOptions &&
        descriptor.fieldOptions.map((option) =>
          option ? (
            <Radio key={option.value.toString()} value={option.value}>
              {option.label}
            </Radio>
          ) : null
        )}
    </Radio.Group>
  );
}

function mapSelectField(descriptor: FieldDescriptor) {
  return (
    <Select className={styles.field} placeholder={descriptor.placeholder}>
      {descriptor.fieldOptions &&
        descriptor.fieldOptions.map((option) =>
          option ? (
            <Select.Option key={option.value.toString()} value={option.value.toString()}>
              {option.label}
            </Select.Option>
          ) : null
        )}
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
