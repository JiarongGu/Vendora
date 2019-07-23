import { Icon, Radio } from 'antd';
import * as React from 'react';
import { DynamicFieldProps } from './DynamicFieldProps';

import * as styles from './IconRadio.module.less';

export default ({ descriptor, defaultValue, setValue }: DynamicFieldProps) => {
  return (
    <Radio.Group
      defaultValue={defaultValue}
      onChange={(e) => setValue(descriptor.name, e.target.value)}
    >
      {descriptor.fieldOptions &&
        descriptor.fieldOptions.map(
          (option) =>
            option && (
              <Radio.Button className={styles.container} key={option.value.toString()} value={option.value}>
                <span className={styles.iconContainer}>
                  {option.other && <Icon type={option.other.icon} theme={option.other.theme} />}
                  {option.label}
                </span>
              </Radio.Button>
            )
        )}
    </Radio.Group>
  );
};
