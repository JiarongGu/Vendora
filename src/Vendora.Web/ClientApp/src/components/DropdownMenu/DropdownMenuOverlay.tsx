import * as React from 'react';
import * as styles from './DropdownMenuOverlay.module.less';

interface DropdownMenuOverlayProps {
  children?: React.ReactNode;
}

export const DropdownMenuOverlay = ({ children }: DropdownMenuOverlayProps) => (
  <div className={styles.container}>
    {children}
  </div>
)