import * as React from 'react';

import { FieldDescriptor } from '@loan/services/form/FormModel';
import { DynamicField } from './DynamicFields';
import { DynamicFieldProps, SetValue } from './DynamicFields/DynamicFieldProps';
import * as styles from './EnquiryField.module.less';

interface EnquiryFieldProps {
  fieldDescriptor: FieldDescriptor;
  setValue: SetValue;
  initialValue?: any;
}

const fieldMap: { [key: string]: React.FunctionComponent<DynamicFieldProps> } = {
  radio: DynamicField.Radio,
  select: DynamicField.Select,
  currency: DynamicField.Currency,
  text: DynamicField.Text,
  number: DynamicField.Number,
  email: DynamicField.Email,
  phone: DynamicField.Phone,
  suburb: DynamicField.Suburb,
  ['icon-radio']: DynamicField.IconRadio,
};

export class EnquiryField extends React.Component<EnquiryFieldProps> {
  public render() {
    const { fieldDescriptor, setValue, initialValue } = this.props;

    const MappedField = fieldMap[fieldDescriptor.type];
    if (!MappedField) return null;

    return (
      <div className={styles.container}>
        <MappedField descriptor={fieldDescriptor} defaultValue={initialValue} setValue={setValue} />
      </div>
    );
  }
}
