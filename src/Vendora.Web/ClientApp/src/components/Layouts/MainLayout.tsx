import * as React from 'react';
import Layout from 'antd/lib/layout';
import Breadcrumb from 'antd/lib/Breadcrumb';
import Icon from 'antd/lib/Icon';
import Menu from 'antd/lib/Menu';
import * as styles from './mainLayout.module.less';

import { Route, Link } from "react-router-dom";

export interface MainLayoutProps {
  
}

export class MainLayout extends React.PureComponent<MainLayoutProps> {
  render() {
    const { children } = this.props;
    return (
      <Layout className={styles.container}>
        <Layout.Header className={'header'}>
          <div className={'logo'} />
          <Menu theme={'light'} mode={'horizontal'} defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
            <Menu.Item key={'1'}>nav 1</Menu.Item>
            <Menu.Item key={'2'}>nav 2</Menu.Item>
            <Menu.Item key={'3'}>nav 3</Menu.Item>
          </Menu>
        </Layout.Header>
        <div>
          { children ? children : null }
        </div>
      </Layout>
    );
  };
}