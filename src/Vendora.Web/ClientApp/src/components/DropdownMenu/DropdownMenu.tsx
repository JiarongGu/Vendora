import Button from 'antd/lib/button/button';
import Dropdown from 'antd/lib/dropdown/dropdown';
import * as React from 'react';

import Menu from 'antd/lib/menu';
import classnames from 'classnames';
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
