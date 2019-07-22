import { Menu } from 'antd';
import * as React from 'react';
import { useSink } from 'redux-sink';

import { FormSection } from '@loan/services/form/FormModel';
import { EnquirySink } from '../EnquirySink';
import * as styles from './EnquiryMenu.module.less';

const getSubMenuSection = (section: FormSection, open: (key: string) => void) => (
  <Menu.SubMenu key={section.name} title={section.label} onTitleClick={() => open(section.name)}>
    {section.formSections &&
      section.formSections.map((subSection) => getSubMenuSection(subSection, open))}
  </Menu.SubMenu>
);

export const EnquiryMenu = () => {
  const enquirySink = useSink(EnquirySink)!;
  if (!enquirySink.form) return null;

  return (
    <div className={styles.container}>
      <Menu mode={'inline'} openKeys={enquirySink.openKeys}>
        {enquirySink.form.metadata.formSections.map((section) =>
          getSubMenuSection(section, enquirySink.open)
        )}
      </Menu>
    </div>
  );
};
