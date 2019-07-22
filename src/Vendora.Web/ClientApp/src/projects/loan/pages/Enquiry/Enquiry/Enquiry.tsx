import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'redux';
import { sinking } from 'redux-sink';

import { FormSink } from '@loan/services/form/FormSink';
import { EnquiryMenu } from '../EnquiryMenu/EnquiryMenu';
import { EnquirySection } from '../EnquirySection/EnquirySection';
import { EnquirySink } from '../EnquirySink';
import * as styles from './Enquiry.module.less';

interface EnquiryProps extends RouteComponentProps<{ name: string }> {
  enquirySink: EnquirySink;
  formSink: FormSink;
}

export class EnquiryComponent extends React.Component<EnquiryProps> {
  public changeSection = (name: string) => {
    return () => {
      const targetEl = document.getElementById(name);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    };
  };

  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.nav}>
          <EnquiryMenu />
        </div>
        <div className={styles.form}>
          <EnquirySection />
        </div>
      </div>
    );
  }
}

export const Enquiry = compose(
  sinking(EnquirySink),
  withRouter
)(EnquiryComponent) as React.ComponentClass;
