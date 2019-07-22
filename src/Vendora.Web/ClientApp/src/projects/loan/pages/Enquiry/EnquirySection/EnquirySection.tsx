import { Form } from 'antd';
import * as React from 'react';

import { FieldDescriptor } from '@loan/services/form/FormModel';
import { FormComponentProps } from 'antd/lib/form';
import { EnquiryField } from '../EnquiryField';
import * as styles from './EnquirySection.module.less';

interface EnquirySectionProps {
  formSection: any;
  step: number;
}

function checkFieldDependencies(descriptor: FieldDescriptor) {
  if (!descriptor.fieldDependencies || descriptor.fieldDependencies.length === 0) return true;
  return false;
}

export class EnquirySectionComponent extends React.Component<
  EnquirySectionProps & FormComponentProps
> {
  public render() {
    const {
      formSection,
      step,
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.fields}>
          {formSection.fieldDescriptors.map((descriptor, index) =>
            checkFieldDependencies(descriptor) ?
              descriptor.type === 'group' ? (
                <EnquirySection key={descriptor.label} step={index + 1} formSection={descriptor}/>
              ) :
              (
                <Form.Item key={descriptor.name} label={descriptor.label}>
                  {getFieldDecorator<string>(descriptor.name, {
                    rules: descriptor.validationRules
                  })(<EnquiryField fieldDescriptor={descriptor} />)}
                </Form.Item>
              ) : null
          )}
        </div>
      </div>
    );
  }
}

export const EnquirySection = Form.create<EnquirySectionProps & FormComponentProps>({})(EnquirySectionComponent);
