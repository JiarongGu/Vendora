import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Menu from 'antd/lib/menu';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './NavMenu.module.less';

interface NavMenuProps {
  className?: string;
}

export const NavMenu = ({ className }: NavMenuProps) => (
  <Menu theme={'light'} mode={'horizontal'} className={styles.nav}>
    <Menu.Item className={styles.navItem}>
      <Link to={'/'}>Service</Link>
    </Menu.Item>
    <Menu.Item className={styles.navItem}>
      <Link to={'/'}>About us</Link>
    </Menu.Item>
    <Menu.Item className={styles.navItem}>
      <Link to={'/'}>Success story</Link>
    </Menu.Item>
    <Menu.Item className={styles.navItem}>
      <Link to={'/'}>Media</Link>
    </Menu.Item>
    <Menu.Item className={styles.navItem}>
      <Link to={'/'}>Career</Link>
    </Menu.Item>
    <Menu.Item className={styles.navItem}>
      <Link to={'/'}>Contact us</Link>
    </Menu.Item>
    <Menu.Item className={styles.navItem}>
      <Icon type="search" className={styles.searchIcon} />
    </Menu.Item>
    <Menu.Item className={styles.navItem}>
      <Link to={'/quote/buyinghome'}>
        <Button size={'large'} type={'primary'}>
          Online Enquire Form
        </Button>
      </Link>
    </Menu.Item>
    <Menu.Item className={styles.navItem}>
      <div className={styles.language}>
        <Link to={''}>EN</Link> | <Link to={''}>中文</Link>
      </div>
    </Menu.Item>
  </Menu>
);
