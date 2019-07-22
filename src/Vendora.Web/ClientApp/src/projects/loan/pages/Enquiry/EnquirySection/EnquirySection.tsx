import { Button, Form, Icon } from 'antd';
import * as React from 'react';
import { useSink } from 'redux-sink';

import { FieldDescriptor } from '@loan/services/form/FormModel';
import { FormComponentProps } from 'antd/lib/form';
import { EnquiryField } from '../EnquiryField';
import { EnquirySink } from '../EnquirySink';
import * as styles from './EnquirySection.module.less';

function isFieldValid(descriptor: FieldDescriptor, fieldValues: { [key: string]: any }): boolean {
  let valid = true;
  if (descriptor.fieldDependencies) {
    valid = descriptor.fieldDependencies.every((dependency) => {
      const dependencyValue = fieldValues[dependency.name];
      if (dependencyValue !== undefined) {
        if (dependency.values.includes(dependencyValue)) return true;
      }
      return false;
    });
  }
  return valid;
}

export const EnquirySectionComponent = ({ form }: FormComponentProps) => {
  const enquirySink = useSink(EnquirySink)!;
  const current = enquirySink.current;

  const handelNext = () => {
    form.validateFields((errors) => {
      if (!errors) {
        enquirySink.setFieldValues(form.getFieldsValue());
        enquirySink.openSection(current.next!);
      }
    });
  };

  const handelFieldValue = (name, value) => {
    form.setFieldsValue({ [name]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        {enquirySink.current.fields.map((descriptor) =>
          isFieldValid(descriptor, enquirySink.fieldValues) ? (
            <Form.Item key={descriptor.name} label={descriptor.label}>
              {form.getFieldDecorator(descriptor.name, {
                rules: descriptor.validationRules
              })(
                <EnquiryField
                  fieldDescriptor={descriptor}
                  setValue={handelFieldValue}
                  defaultValue={enquirySink.fieldValues[descriptor.name]}
                />
              )}
            </Form.Item>
          ) : null
        )}
      </div>
      <div className={styles.buttons}>
        <Button className={styles.button} onClick={handelNext}>
          <Icon type="right-square" />
          <span className={styles.buttonText}>{current.next ? 'Next' : 'Submit'}</span>
        </Button>
        {current.previous && (
          <Button
            className={styles.button}
            onClick={() => enquirySink.openSection(current.previous!)}
          >
            <Icon type="left-square" />
            <span className={styles.buttonText}>Previous</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export const EnquirySection = Form.create()(EnquirySectionComponent);
