import { Input } from 'antd';
import * as React from 'react';

import * as styles from './DynamicField.module.less';
import { DynamicFieldProps } from './DynamicFieldProps';

export default ({ descriptor, defaultValue, setValue }: DynamicFieldProps) => {
  return (
    <Input
      className={styles.container}
      defaultValue={defaultValue}
      onChange={(event) => setValue(descriptor.name, event.target.value)}
    />
  );
};
