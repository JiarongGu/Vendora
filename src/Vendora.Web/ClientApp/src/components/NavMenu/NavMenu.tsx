import * as React from 'react';

import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

import * as styles from './NavMenu.module.less';

interface NavMenuProps {
  className?: string;
  pathname: string;
  language: string;
}

export const NavMenu = ({ className, language, pathname }: NavMenuProps) => (
  <Menu theme={'light'} mode={'horizontal'} className={styles.nav}>
    <Menu.Item className={styles.navItemRight} />
    <Menu.Item className={styles.navItem}>
      <Icon type="search" className={styles.searchIcon} />
    </Menu.Item>
    <Menu.Item className={styles.navItem}>
      <Link to={`/${language}/quote/buyinghome`}>
        <Button size={'large'} type={'primary'}>
          Online Enquire Form
        </Button>
      </Link>
    </Menu.Item>
    <Menu.Item className={styles.navItem}>
      <div className={styles.language}>
        <Link to={`/en-gb${pathname}`}>EN</Link> | <Link to={`/zh-cn${pathname}`}>中文</Link>
      </div>
    </Menu.Item>
  </Menu>
);
