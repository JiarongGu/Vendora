import { Button, Icon } from 'antd';
import classnames from 'classnames';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'redux';
import { sinking } from 'redux-sink';

import { FieldDescriptor } from '@loan/services/form/FormModel';
import { FormSink } from '@loan/services/form/FormSink';
import { EnquiryMenu } from '../EnquiryMenu/EnquiryMenu';
import { EnquirySection } from '../EnquirySection/EnquirySection';
import { EnquirySink } from '../EnquirySink';
import * as styles from './Enquiry.module.less';


interface EnquiryProps extends RouteComponentProps<{ name: string }> {
  enquirySink: EnquirySink;
  formSink: FormSink;
}

function formatSections(currentEnquiry): Array<FieldDescriptor> {
  let results: Array<FieldDescriptor> = [];
  if (currentEnquiry) {
    currentEnquiry.metadata.formSections.forEach((section) => {
      results = [
        ...results,
        ...section.fieldDescriptors.filter((descriptor) => descriptor.type === 'group')
      ];
    });
  }
  return results;
}

export class EnquiryComponent extends React.Component<EnquiryProps> {
  public changeSection = (name: string) => {
    return () => {
      this.props.enquirySink.updateState((sink) => {
        sink.stepName = name;
      });
      const targetEl = document.getElementById(name);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    };
  }

  public render() {
    console.log(this.props);
    const {
      match: { params },
      formSink
    } = this.props;

    console.log(formSink);

    const form = formSink.get(params.name);

    console.log(form);
    const prevButton = classnames(styles.prev, styles.navButon);
    const nextButton = classnames(styles.next, styles.navButon);

    return (
      <div className={styles.container}>
        <div className={styles.nav}>
          <EnquiryMenu />
        </div>
        <div className={styles.form}>
          {/* <div className={styles.formOutter}>
            {formatSections(currentEnquiry).map((section, index, sections) => (
              <div key={index} id={section.name} className={styles.sectionContainer}>
                {index > 0 ? (
                  <Button
                    className={prevButton}
                    onClick={this.changeSection(sections[index - 1].name)}
                  >
                    <Icon type="left-square" />
                    Previous
                  </Button>
                ) : null}
                {section ? (
                  <EnquirySection key={section.label} step={index + 1} formSection={section} />
                ) : null}
                {index < sections.length - 1 ? (
                  <Button
                    className={nextButton}
                    onClick={this.changeSection(sections[index + 1].name)}
                  >
                    Next Step
                    <Icon type="right-square" />
                  </Button>
                ) : null}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    );
  }
}

export const Enquiry = compose(
  sinking(EnquirySink, FormSink),
  withRouter
)(
  EnquiryComponent
) as React.ComponentClass;
