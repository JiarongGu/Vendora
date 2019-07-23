import * as React from 'react';

import { CurrencyInput } from '@shared/components';
import { DynamicFieldProps } from './DynamicFieldProps';

export default ({ descriptor, defaultValue, setValue }: DynamicFieldProps) => {
  return (
    <CurrencyInput
      defaultValue={defaultValue}
      onChange={(value) => setValue(descriptor.name, value)}
    />
  );
};
