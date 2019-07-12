import { EnquirySink } from '@services/enquiry';
import { Button, Icon} from 'antd';
import * as React from 'react';
import { sinking } from 'redux-sink';
import { EnquiryNav } from '../EnquiryNav/EnquiryNav';
import { EnquirySection } from '../EnquirySection/EnquirySection';
import { IFieldDescriptor } from '@services/enquiry/IFormModel';
import classnames from 'classnames';
import * as styles from './Enquiry.module.less';

interface EnquiryProps {
  enquirySink: EnquirySink;
}
function formatSections(currentEnquiry): IFieldDescriptor[] {
  let results: IFieldDescriptor[] = [];
  if (currentEnquiry) {
    currentEnquiry.metadata.formSections.forEach((section) => {
      results = [...results, ...section.fieldDescriptors.filter((descriptor) => descriptor.type === 'group')];
    });
  }
  return results;
}

export class EnquiryComponent extends React.Component<EnquiryProps> {

  public componentDidUpdate() {
    if (this.props.enquirySink.currentEnquiry && !this.props.enquirySink.currentStepName) {
      this.props.enquirySink.updateState((sink) => {
        sink.currentStepName = this.props.enquirySink.currentEnquiry.metadata.formSections[0].fieldDescriptors[0].name;
      });
    }
  }
  public changeSection = (name: string) => {
    return () => {
      this.props.enquirySink.updateState((sink) => {
        sink.currentStepName = name;
      });
      const targetEl = document.getElementById(name);
      if (targetEl) {
        targetEl.scrollIntoView({behavior: 'smooth', block: 'end'});
      }
    };
  }
  public render() {
    const {
      enquirySink: { currentEnquiry, currentStepName, updateFormFields }
    } = this.props;
    const prevButton = classnames(styles.prev, styles.navButon);
    const nextButton = classnames(styles.next, styles.navButon);
    return currentEnquiry ? (
      <div className={styles.container}>
        <div className={styles.nav}>
          <EnquiryNav sections={currentEnquiry.metadata.formSections} currentStepName={currentStepName} />
        </div>
        <div className={styles.form}>
          <div className={styles.formOutter}>
            {
              formatSections(currentEnquiry).map((section, index, sections) => (
                <div key={index} id={section.name} className={styles.sectionContainer}>
                  {index > 0 ?
                    (<Button className={prevButton} onClick={this.changeSection(sections[index - 1].name)}>
                      <Icon type="left-square" />Previous</Button>)
                    : null
                  }
                  <EnquirySection key={section.label} step={index + 1} formSection={section}/>
                  {index < sections.length - 1 ?
                    (<Button className={nextButton} onClick={this.changeSection(sections[index + 1].name)}>
                      Next Step
                    <Icon type="right-square" /></Button>) : null
                  }
                </div>
            ))}
          </div>
        </div>
      </div>
    ) : null;
  }

}

export const Enquiry = sinking(EnquirySink)(EnquiryComponent) as React.ComponentClass;
