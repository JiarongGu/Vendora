import { EnquirySink } from '@services/enquiry';
import * as React from 'react';
import { sinking } from 'redux-sink';
import { EnquiryNav } from '../EnquiryNav/EnquiryNav';
import { EnquirySection } from '../EnquirySection/EnquirySection';
import { IFieldDescriptor } from '@services/enquiry/IFormModel';
import * as styles from './Enquiry.module.less';
import { Button } from 'antd';

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
                    (<Button className={styles.prevButton} onClick={this.changeSection(sections[index - 1].name)}>Previous Step</Button>) 
                    : null
                  }
                  <EnquirySection key={section.label} step={index + 1} formSection={section}/>
                  {index < sections.length - 1 ?
                    (<Button className={styles.nextButton} onClick={this.changeSection(sections[index + 1].name)}>Next Step</Button>) : null}
                </div>
            ))}
          </div>
        </div>
      </div>
    ) : null;
  }

}

export const Enquiry = sinking(EnquirySink)(EnquiryComponent) as React.ComponentClass;
