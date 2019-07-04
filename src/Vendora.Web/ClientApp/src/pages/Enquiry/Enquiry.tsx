import { EnquirySink } from '@services/enquiry';
import { Steps } from 'antd';
import * as React from 'react';
import { sinking } from 'redux-sink';

interface IEnquiryProps {
  enquirySink: EnquirySink;
}

export class EnquiryComponent extends React.Component<IEnquiryProps> {
  public render() {
    const {
      enquirySink: { currentEnquiry, currentStep }
    } = this.props;
    console.log(currentEnquiry);
    return currentEnquiry ? (
      <div>
        {currentEnquiry.name}
        <Steps current={currentStep} direction={'horizontal'}>
          {currentEnquiry.metadata.formSections.map((section, index) => (
            <Steps.Step
              key={index}
              title={`Step ${index + 1}`}
              description={section.label}
            />
          ))}
        </Steps>
      </div>
    ) : null;
  }
}

export const Enquiry = sinking(EnquirySink)(EnquiryComponent) as React.ComponentClass;
