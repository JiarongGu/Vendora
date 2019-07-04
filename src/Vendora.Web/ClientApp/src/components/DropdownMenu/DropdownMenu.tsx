import * as React from 'react';

import { Dropdown, Menu } from 'antd';

import * as styles from './DropdownMenu.module.less';

interface DropdownMenuProps {
  display: JSX.Element;
  children?: React.ReactNode;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
}

export const DropdownMenu = ({ display, children, placement }: DropdownMenuProps) => (
  <Dropdown
    overlay={
      <Menu className={styles.overlay}>
        {children}
      </Menu>
    }
    placement={placement}
  >
    {display}
  </Dropdown>
);
