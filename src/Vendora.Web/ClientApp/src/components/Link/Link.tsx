import * as React from 'react';
import Menu from 'antd/lib/menu';
import { Link, LinkProps } from 'react-router-dom';
import * as styles from './Link.module.less';
import classnames from 'classnames';

export interface MenuLinkProps extends LinkProps {
  className?: string
}

export function MenuLink(props: MenuLinkProps) {
  const { to, replace, children, className} = props;

  return (
    <Menu className={classnames(className, styles.container)}>
      <Menu.Item className={styles.item}>
        <Link to={to} replace={replace}>
          {children}
        </Link>
      </Menu.Item>
    </Menu>
  )
}