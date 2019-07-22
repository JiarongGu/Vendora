import { Button, Form, Icon } from 'antd';
import * as React from 'react';
import { useSink } from 'redux-sink';

import { FieldDescriptor } from '@loan/services/form/FormModel';
import { FormComponentProps } from 'antd/lib/form';
import { EnquiryField } from '../EnquiryField';
import { EnquirySink } from '../EnquirySink';
import * as styles from './EnquirySection.module.less';

export const EnquirySectionComponent = (props: FormComponentProps) => {
  const {
    form: { getFieldDecorator }
  } = props;
  const enquirySink = useSink(EnquirySink)!;
  const current = enquirySink.current;

  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        {enquirySink.current.fields.map((descriptor) => (
          <Form.Item key={descriptor.name} label={descriptor.label}>
            {getFieldDecorator(descriptor.name, {
              rules: descriptor.validationRules
            })(<EnquiryField fieldDescriptor={descriptor} />)}
          </Form.Item>
        ))}
      </div>
      <div className={styles.buttons}>
        {current.next && (
          <Button className={styles.button} onClick={() => enquirySink.open(current.next!)}>
            <Icon type="right-square" />
            <span className={styles.buttonText}>Next</span>
          </Button>
        )}
        {current.previous && (
          <Button className={styles.button} onClick={() => enquirySink.open(current.previous!)}>
            <Icon type="left-square" />
            <span className={styles.buttonText}>Previous</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export const EnquirySection = Form.create({})(EnquirySectionComponent);
