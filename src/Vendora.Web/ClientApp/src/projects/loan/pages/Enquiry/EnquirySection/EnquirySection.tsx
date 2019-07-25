import { Button, Form, Icon } from 'antd';
import * as classNames from 'classnames';
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
    enquirySink.setFieldValues({ [name]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        <div>
          {enquirySink.current.fields.map((descriptor) => {
            if (!isFieldValid(descriptor, enquirySink.fieldValues))
              return null;
            const initialValue = enquirySink.fieldValues[descriptor.name];

            return (
              <Form.Item className={styles.field} key={descriptor.name}>
                <h3>{descriptor.label}</h3>
                {form.getFieldDecorator(descriptor.name, {
                  initialValue,
                  rules: descriptor.validationRules
                })(
                  <EnquiryField
                    initialValue={initialValue}
                    fieldDescriptor={descriptor}
                    setValue={handelFieldValue}
                  />
                )}
              </Form.Item>
            );
          })}
        </div>
      </div>
      <div className={styles.buttons}>
        <Button className={classNames(styles.button, styles.buttonSuccess)} onClick={handelNext}>
          <Icon className={styles.buttonIcon} type={'right-square'} />
          <span className={styles.buttonText}>{current.next ? 'NEXT' : 'SUBMIT'}</span>
        </Button>
        {current.previous && (
          <Button
            className={styles.button}
            onClick={() => enquirySink.openSection(current.previous!)}
          >
            <Icon className={styles.buttonIcon} type={'left-square'} />
            <span className={styles.buttonText}>PREVIOUS</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export const EnquirySection = Form.create()(EnquirySectionComponent);
