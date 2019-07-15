import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import * as React from 'react';
import * as styles from './EnquiryMenuSection.module.less';

export interface EnquiryMenuSectionProps {
  name: string;
  steps?: string[];
}

export class EnquiryMenuSection extends React.Component<EnquiryMenuSectionProps> {
  public render() {
    const { name, steps } = this.props;
    return (
      <div className={styles.container}>
        <Menu mode={'inline'} openKeys={['sub1', 'sub1-1']}>
          <SubMenu key={'sub1'} title={name}>
            <SubMenu key={'sub1-1'} title={'Before we start'} >
              <Menu.Item>Applicants</Menu.Item>
              <Menu.Item>Loan type</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>);
  }
}
