import * as React from 'react';
import { Layout } from 'antd';
import { Menu } from 'antd';
import { Route, Link, Switch } from "react-router-dom";
import { Quotes } from './Quotes';
import { Profile } from './Profile';
import { QuoteDetail } from './quote-detail';

export interface UserProps {
  match: any;
}
const menuItems: Array<any> = [
  { path: 'quotes', display: 'My Quotes', component: Quotes },
  { path: 'profile', display: 'My Proile', component: Profile },
  { path: 'quote/:quoteId', component: QuoteDetail }
];

export default class User extends React.PureComponent<UserProps> {
  render() {
    const match = this.props.match;
    console.info(this.props)
    return (
      <Layout>
        <Layout.Sider>
          <Menu theme={'light'} mode={'vertical'} selectedKeys={['quotes']}>
            {menuItems.filter((item) => item.display).map(item =>
              <Menu.Item key={item.path}>
                <Link to={match.url + '/' + item.path}>{item.display}</Link>
              </Menu.Item>
            )}
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          <div>User Page</div>
          <Switch>
            <Route exact path={match.url} component={Profile} />
            {menuItems.map((item) =>
              <Route strict path={match.url + '/' + item.path} key={item.path} render={(props) => <item.component {...props} />} />
            )}
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}