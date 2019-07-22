import { Input, InputNumber, Radio, Select } from 'antd';
import * as React from 'react';

import { FieldDescriptor } from '@loan/services/form/FormModel';
import { CurrencyInput, NumberInput } from '@shared/components';
import * as styles from './EnquiryField.module.less';

type SetValue = (name: string, value: any) => void;

interface EnquiryFieldProps {
  fieldDescriptor: FieldDescriptor;
  setValue: SetValue;
}

function mapRadioField(descriptor: FieldDescriptor, setValue: SetValue) {
  return (
    <Radio.Group onChange={(e) => setValue(descriptor.name, e.target.value)}>
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

function mapSelectField(descriptor: FieldDescriptor, setValue: SetValue) {
  return (
    <Select
      className={styles.field}
      placeholder={descriptor.placeholder}
      onChange={(value) => setValue(descriptor.name, value)}
    >
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

function mapCurrencyField(descriptor: FieldDescriptor, setValue: SetValue) {
  return <CurrencyInput onChange={(value) => setValue(descriptor.name, value)} />;
}

function mapTextField(descriptor: FieldDescriptor, setValue: SetValue) {
  return (
    <Input
      className={styles.field}
      onChange={(event) => setValue(descriptor.name, event.target.value)}
    />
  );
}

function mapNumberField(descriptor: FieldDescriptor, setValue: SetValue) {
  return <InputNumber onChange={(value) => setValue(descriptor.name, value)} />;
}

function mapEmailField(descriptor: FieldDescriptor, setValue: SetValue) {
  return (
    <Input
      className={styles.field}
      onChange={(event) => setValue(descriptor.name, event.target.value)}
    />
  );
}

function mapPhoneField(descriptor: FieldDescriptor, setValue: SetValue) {
  return (
    <Input
      className={styles.field}
      onChange={(event) => setValue(descriptor.name, event.target.value)}
    />
  );
}

function mapSuburbField(descriptor: FieldDescriptor, setValue: SetValue) {
  return (
    <Input
      className={styles.field}
      onChange={(event) => setValue(descriptor.name, event.target.value)}
    />
  );
}

const fieldMap: {
  [key: string]: (descriptor: FieldDescriptor, setValue: SetValue) => JSX.Element;
} = {
  radio: mapRadioField,
  select: mapSelectField,
  currency: mapCurrencyField,
  text: mapTextField,
  number: mapNumberField,
  email: mapEmailField,
  phone: mapPhoneField,
  suburb: mapSuburbField
};

export class EnquiryField extends React.Component<EnquiryFieldProps> {
  public render() {
    const { fieldDescriptor, setValue } = this.props;
    const mapper = fieldMap[fieldDescriptor.type];
    return mapper ? (
      <div className={styles.container}>{mapper(fieldDescriptor, setValue)}</div>
    ) : null;
  }
}
