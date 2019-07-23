import { Select } from 'antd';
import * as React from 'react';

import * as styles from './DynamicField.module.less';
import { DynamicFieldProps } from './DynamicFieldProps';

export default ({ descriptor, defaultValue, setValue }: DynamicFieldProps) => {
  return (
    <Select
      className={styles.container}
      placeholder={descriptor.placeholder}
      defaultValue={defaultValue}
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
};
