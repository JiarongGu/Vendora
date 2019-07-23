import { Radio } from 'antd';
import * as React from 'react';
import { DynamicFieldProps } from './DynamicFieldProps';

export default ({ descriptor, defaultValue, setValue }: DynamicFieldProps) => {
  return (
    <Radio.Group
      defaultValue={defaultValue}
      onChange={(e) => setValue(descriptor.name, e.target.value)}
    >
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
};
