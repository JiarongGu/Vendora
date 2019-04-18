import * as React from 'react';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Breadcrumb from 'antd/lib/Breadcrumb';
import Menu from 'antd/lib/Menu';
import { Avatar, Dropdown, Icon, Divider} from 'antd';
import * as styles from './mainLayout.module.less';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Route, Link } from "react-router-dom";
import { sinking } from 'redux-sink';
import { NavigationSink } from '@sinks/navgation';

export interface MainLayoutProps {
  navigation: NavigationSink;
}

export class MainLayout extends React.PureComponent<MainLayoutProps> {
  render() {
    const { children, navigation } = this.props;
    console.info(children);
    const logoClasses = [styles.logo, styles.menuItem].join(' ');
    const signInMenuClasses = ['right', styles.menuItem].join(' ');
    const profileMenyClasses = [styles.menuItem, 'right'].join(' ');
    const navMenuClass = [styles.menuItem].join(' ');
    const menu = (
      <div className={styles.dropdownMenu}>
        <button className={styles.dropdownItem}>Notifications<Icon type='bell'></Icon></button>
        <button className={styles.dropdownItem}>Profile<Icon type='user'></Icon></button>
        <button className={styles.dropdownItem}>Prefrences<Icon type='setting'></Icon></button>
        <hr />
        <button className={styles.dropdownItem}>Logout&nbsp;<Icon type='logout'></Icon></button>
    </div>
    );
    return (
      <Layout className={styles.container}>
        <Layout.Header className={styles.header}>
          <Menu theme={'light'} mode={'horizontal'} style={{ lineHeight: '60px' }}>
            <Menu.Item key={'1'} className={logoClasses}><Link to='/'>LOGO</Link></Menu.Item>
            <Menu.Item key={'2'} className={signInMenuClasses}><Button className={styles.menuItemButton}>Login/Sign Up</Button></Menu.Item>
            <Menu.Item key={'3'} className={profileMenyClasses}>
              <Dropdown overlay={menu} placement="bottomRight">
                <Avatar className={styles.profileIcon} size={40} icon="user" />
              </Dropdown>
            </Menu.Item>
            <Menu.Item key={'4'} className={navMenuClass}><Link to='/user'><FontAwesomeIcon icon={faUserTie}/>Talk to Expert</Link></Menu.Item>
            <Menu.Item key={'5'} className={navMenuClass}><Link to='/user'>About Us</Link></Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content>
          { children ? children : null }
        </Layout.Content>
        <Layout.Footer className={styles.footer}>
        Footer</Layout.Footer>
      </Layout>
    );
  };
}

export default sinking(NavigationSink)(MainLayout);