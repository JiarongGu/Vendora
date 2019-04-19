import * as React from 'react';
import Dropdown from 'antd/lib/dropdown/dropdown';
import Avatar from 'antd/lib/avatar';
import Button from 'antd/lib/button/button';
import { AccountDropdownMenu } from './AccountDropdownMenu';

import classnames from 'classnames';
import * as styles from './account-section.module.less';

export const AccountSection = () => (
  <div className={classnames('right', styles.container)}>
    <Dropdown
      overlay={<AccountDropdownMenu />}
      placement={'bottomRight'}
    >
      <Avatar className={styles.userAvatar} size={40} icon={'user'} />
    </Dropdown>
    <Button>Login/Sign Up</Button>
  </div>
);