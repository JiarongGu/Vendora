import { Icon, Menu } from 'antd';

import { FieldDescriptor, FormSection } from '@loan/services/enquiry';
import * as React from 'react';

const { SubMenu } = Menu;
function findFormSectionIndex(sections: Array<FormSection>, currentStepName): string {
    for (const i in sections) {
      if (sections[i].fieldDescriptors.some((descriptor) => descriptor.name === currentStepName) === true) {
        console.info(i);
        return i;
      }
    }
    return '';
}

function checkFieldDependencies(descriptor: FieldDescriptor) {
  if (!descriptor.fieldDependencies || descriptor.fieldDependencies.length === 0) return true;
  return false;
}

interface EnquiryNavProps {
  sections: Array<FormSection>;
  currentStepName: string;
}
export class EnquiryNav extends React.Component<EnquiryNavProps> {

  public render() {
    const {sections, currentStepName} = this.props;
    return (
      <Menu
        openKeys={[findFormSectionIndex(sections, currentStepName)]}
        style={{ width: 256 }}
        selectedKeys={[currentStepName]}
        mode="inline"
      >
        { sections.map((formSection, index) =>
            formSection.order !== 3 ? ( // if is the contact section for temp
            <SubMenu
              key={index}
              title={
                <span>
                  <Icon type="mail" />
                  <span>{formSection.label}</span>
                </span>
              }
            >
              {
                formSection.fieldDescriptors.sort((fd1, fd2) => fd1.order - fd2.order).map((fieldDescriptor) =>
                  fieldDescriptor.type === 'group' ?
                    (<Menu.Item key={fieldDescriptor.name} >{fieldDescriptor.label}</Menu.Item>) : null
                )
              }
            </SubMenu>) : (<Menu.Item key={'sec' + index}>{formSection.label}</Menu.Item>)
        ) }
      </Menu>
    );
  }
}
