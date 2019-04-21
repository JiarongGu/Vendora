import * as React from 'react';
import Menu from 'antd/lib/menu';
import * as Router from 'react-router-dom';
import * as styles from './Link.module.less';
import classnames from 'classnames';

export interface LinkProps extends Router.LinkProps {
  className?: string
}

export function Link(props: LinkProps) {
  const { to, replace, children, className} = props;

  return (
    <Menu className={classnames(className, styles.container)}>
      <Menu.Item className={styles.item}>
        <Router.Link to={to} replace={replace}>
          {children}
        </Router.Link>
      </Menu.Item>
    </Menu>
  )
}