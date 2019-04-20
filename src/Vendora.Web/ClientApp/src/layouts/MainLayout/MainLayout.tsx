import * as React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Avatar from 'antd/lib/avatar';
import Icon from 'antd/lib/icon';

import { Home, Quote, User } from '@pages';
import { DropdownMenu, HeaderMenu } from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import classnames from 'classnames';
import * as styles from './MainLayout.module.less';


export default class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <div className={classnames('.ant-menu-horizontal', styles.header)}>
          <div className={styles.headerLogo}>
            <h1 >LOGO</h1>
          </div>
          <HeaderMenu />
          <DropdownMenu display={<Avatar className={styles.userAvatar} size={40} icon={'user'} />}>
            <Link to={'/user'}>
              <button className={styles.dropdownItem}>
                Quotes<FontAwesomeIcon icon={faFile} />
              </button>
            </Link>
            <hr />
            <button className={styles.dropdownItem}>Logout&nbsp;<Icon type={'logout'}></Icon></button>
          </DropdownMenu>
        </div>

        <Switch>
          <Route key={'/user'} strict path={'/user'} render={(match) => <User {...match} />} />
          <Route key={'/quote'} strict path={'/quote'} render={() => <Quote />} />
          <Route key={'/'} strict path={'/'} render={() => <Home />} />
        </Switch>
      </div>
    );
  };
}