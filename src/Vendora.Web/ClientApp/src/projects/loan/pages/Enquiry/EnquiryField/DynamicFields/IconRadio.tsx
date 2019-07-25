import { Icon, Radio } from 'antd';
import * as React from 'react';
import { DynamicFieldProps } from './DynamicFieldProps';

import * as styles from './IconRadio.module.less';
import classNames from 'classnames';


export default ({ descriptor, defaultValue, setValue }: DynamicFieldProps) => {
  return (
    <Radio.Group
      defaultValue={defaultValue}
      onChange={(e) => setValue(descriptor.name, e.target.value)}
      className={styles.container}
    >
      {descriptor.fieldOptions &&
        descriptor.fieldOptions.map(
          (option) => {
            if (!option) return null;
            const other = option.other || {};

            return (
              <Radio.Button className={classNames(styles.button, { [styles.optical]: other.optical })} key={option.value.toString()} value={option.value}>
                  <span className={styles.iconContent}>
                    {option.other && <Icon className={styles.icon} type={other.icon} theme={other.theme} />}
                    {option.label}
                  </span>
              </Radio.Button>
            );
          }
        )}
    </Radio.Group>
  );
};
