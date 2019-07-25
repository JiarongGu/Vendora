import { Menu } from 'antd';
import * as React from 'react';
import { useSink } from 'redux-sink';

import { FormSection } from '@loan/services/form/FormModel';
import { EnquirySink } from '../EnquirySink';
import * as styles from './EnquiryMenu.module.less';

const getSubMenuSection = (section: FormSection, open: (key: string) => void) => {
  if (section.formSections && section.formSections.length > 0) {
    return (
      <Menu.SubMenu
        key={section.name}
        className={styles.menu}
        title={section.label}
        onTitleClick={() => open(section.name)}
      >
        {section.formSections.map((subSection) => getSubMenuSection(subSection, open))}
      </Menu.SubMenu>
    );
  } else {
    return (
      <Menu.Item className={styles.menu} key={section.name} onClick={() => open(section.name)}>
        {section.label}
      </Menu.Item>
    );
  }
};

export const EnquiryMenu = () => {
  const enquirySink = useSink(EnquirySink)!;
  if (!enquirySink.form) return null;

  return (
    <div className={styles.container}>
      <Menu
        mode={'inline'}
        openKeys={enquirySink.current.keys}
        selectedKeys={enquirySink.current.keys}
      >
        {enquirySink.form.metadata.formSections.map((section) =>
          getSubMenuSection(section, enquirySink.openSection)
        )}
      </Menu>
    </div>
  );
};
