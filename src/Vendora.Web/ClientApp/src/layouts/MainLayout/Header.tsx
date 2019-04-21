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
import MenuItem from 'antd/lib/menu/MenuItem';

export const Header = () => (
  <Layout.Header className={classnames('.ant-menu-horizontal', styles.container)}>
    <div className={styles.logo}>
      <Link to={'/'}>
        <h1 >LOGO</h1>
      </Link>
    </div>
    <NavMenu />
    <DropdownMenu display={<Avatar className={styles.avatar} size={40} icon={'user'} />}>
      <MenuItem key={'user'}>
        <Link to={'/user'}>
          <span className={styles.dropdownItem}>
            Quotes<FontAwesomeIcon icon={faFile} />
          </span>
        </Link>
      </MenuItem>
      <hr />
      <MenuItem key={'login'}>
        <span className={styles.dropdownItem}>
          Logout&nbsp;<Icon type={'logout'}></Icon>
        </span>
      </MenuItem>
    </DropdownMenu>
  </Layout.Header>
)