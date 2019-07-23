import { InputNumber } from 'antd';
import * as React from 'react';

import * as styles from './DynamicField.module.less';
import { DynamicFieldProps } from './DynamicFieldProps';

export default ({ descriptor, defaultValue, setValue }: DynamicFieldProps) => {
  return (
    <InputNumber
      className={styles.container}
      defaultValue={defaultValue}
      onChange={(value) => setValue(descriptor.name, value)}
    />
  );
};
