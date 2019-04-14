import * as React from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import * as styles from './mainLayout.module.less';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { version, Button } from "antd";
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
        <Route path="/" component={Home}></Route>
        <Route path="/user" component={User}></Route>
      </Layout>
    );
  };
}
class Home extends React.Component {
  constructor(property){
    super(property);
  }
  render() {
    return (<div className="App">
    <h1>Please fork this codesandbox to reproduce your issue.</h1>
    <div>Current antd version: {version}</div>
    <div style={{ marginTop: "16px" }}>
      <Button type="primary">Example button</Button>
    </div>
  </div>);
  }
}

class User extends React.Component {
  constructor(property){
    super(property);
  }
  render() {
    return (
      <Layout>
          <Layout.Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode={'inline'}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.SubMenu key={'sub1'} title={<span><Icon type={'user'} />subnav 1</span>}>
                <Menu.Item key={'1'}>option1</Menu.Item>
                <Menu.Item key={'2'}>option2</Menu.Item>
                <Menu.Item key={'3'}>option3</Menu.Item>
                <Menu.Item key={'4'}>option4</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Layout.Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout.Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
            </Layout.Content>
          </Layout>
        </Layout>
    );
  }
}