import * as React from 'react';
import Dropdown from 'antd/lib/dropdown/dropdown';
import Button from 'antd/lib/button/button';
import { DropdownMenuOverlay } from './DropdownMenuOverlay';

import classnames from 'classnames';
import * as styles from './DropdownMenu.module.less';

interface DropdownMenuProps {
  display: JSX.Element;
  children?: React.ReactNode;
}

export const DropdownMenu = ({ display, children }: DropdownMenuProps) => (
  <div className={classnames('right', styles.container)}>
    <Dropdown
      overlay={
        <DropdownMenuOverlay>
          {children}
        </DropdownMenuOverlay>
      }
      placement={'bottomRight'}
    >
      {display}
    </Dropdown>
    <Button>Login/Sign Up</Button>
  </div>
);