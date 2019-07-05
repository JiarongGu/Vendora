import { EnquirySink } from '@services/enquiry';
import { Steps } from 'antd';
import * as React from 'react';
import { sinking } from 'redux-sink';
import { EnquirySection } from '../EnquirySection/EnquirySection';
import * as styles from './Enquiry.module.less';

interface EnquiryProps {
  enquirySink: EnquirySink;
}

export class EnquiryComponent extends React.Component<EnquiryProps> {
  public render() {
    const {
      enquirySink: { currentEnquiry, currentStep }
    } = this.props;
    return currentEnquiry ? (
      <div className={styles.container}>
        {currentEnquiry.metadata.formSections.map((section, index) => (
          <EnquirySection key={section.label} step={index + 1} formSection={section} />
        ))}
      </div>
    ) : null;
  }
}

export const Enquiry = sinking(EnquirySink)(EnquiryComponent) as React.ComponentClass;
