
import * as React from 'react';
import Menu from 'antd/lib/menu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';

interface NavMenuProps {
  className?: string
}

export const NavMenu = ({ className }: NavMenuProps) => (
  <Menu theme={'light'} mode={'horizontal'} className={className}>
    <Menu.Item>
      <Link to={'/'}>Home</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={'/quote'}>
        Talk to Expert <FontAwesomeIcon icon={faUserTie} />
      </Link>
    </Menu.Item>
  </Menu>
)