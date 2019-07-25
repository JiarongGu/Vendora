import * as React from 'react';

import { CurrencyInput } from '@shared/components';
import { DynamicFieldProps } from './DynamicFieldProps';

import * as styles from './DynamicField.module.less';

export default ({ descriptor, defaultValue, setValue }: DynamicFieldProps) => {
  return (
    <CurrencyInput
      className={styles.container}
      defaultValue={defaultValue}
      onChange={(value) => setValue(descriptor.name, value)}
    />
  );
};
