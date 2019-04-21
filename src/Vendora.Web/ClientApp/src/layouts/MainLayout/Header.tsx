import * as React from 'react';
import Avatar from 'antd/lib/avatar';
import Icon from 'antd/lib/icon';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { DropdownMenu, NavMenu } from '@components';

import classnames from 'classnames';
import * as styles from './Header.module.less';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Button from 'antd/lib/button';

export const Header = () => (
  <Layout.Header className={classnames('.ant-menu-horizontal', styles.container)}>
    <div className={styles.logo}>
      <Link to={'/'}>
        <h1 >LOGO</h1>
      </Link>
    </div>
    <NavMenu />
    <div className={classnames('right', styles.dropdown)}>
      <DropdownMenu display={<Avatar className={styles.avatar} size={40} icon={'user'} />}>
        <Menu.Item key={'user'}>
          <Link to={'/user'}>
            <span className={styles.dropdownItem}>
              Quotes<FontAwesomeIcon icon={faFile} />
            </span>
          </Link>
        </Menu.Item>
        <hr />
        <Menu.Item key={'login'}>
          <span className={styles.dropdownItem}>
            Logout&nbsp;<Icon type={'logout'}></Icon>
          </span>
        </Menu.Item>
      </DropdownMenu>
      <Button>Login/Sign Up</Button>
    </div>
  </Layout.Header>
)