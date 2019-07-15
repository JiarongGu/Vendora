import * as React from 'react';
import { EnquiryMenuSection } from '../EnquiryMenuSection/EnquiryMenuSection';
import * as styles from './EnquiryMenu.module.less';

export class EnquiryMenu extends React.Component {
  public render() {
    return (
      <div className={styles.container}>
        <EnquiryMenuSection name={'Start Application'} />
      </div>
    );
  }
}
