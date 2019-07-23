import { Dropdown, Icon, Menu } from 'antd';
import * as React from 'react';
import * as styles from './DropdownInput.module.less';

function DropdownInput(props, ref) {
  const menu = (
    <Menu>
      {props.items.map((item) => (
        <Menu.Item key="0">
          <span>{item.text}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className={styles.dlabel + ' ant-dropdown-link'} href="#">
        <span>Click me </span>
        <Icon type={'down'} />
      </a>
    </Dropdown>
  );
}

export default React.forwardRef(DropdownInput);
