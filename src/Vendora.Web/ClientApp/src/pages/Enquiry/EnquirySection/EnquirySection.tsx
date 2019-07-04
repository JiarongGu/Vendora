import { IFieldDescriptor, IFormSection } from '@services/enquiry/IFormModel';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';
import { EnquiryField } from '../EnquiryField';
import * as styles from './EnquirySection.module.less';

interface IEnquirySectionProps {
  formSection: IFormSection;
  step: number;
}

function checkFieldDependencies(descriptor: IFieldDescriptor) {
  if (!descriptor.fieldDependencies || descriptor.fieldDependencies.length === 0)
    return true;
  return false;
}

export class EnquirySectionComponent extends React.Component<
  IEnquirySectionProps & FormComponentProps
> {
  public render() {
    const {
      formSection,
      step,
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.decorator}>
          <div className={styles.decoratorNumber}>{step}</div>
          <div>{formSection.label}</div>
        </div>
        <div className={styles.fields}>
          {formSection.fieldDescriptors.map((descriptor, index) =>
            checkFieldDependencies(descriptor) ? (
              <Form.Item key={descriptor.name} label={descriptor.label}>
                {getFieldDecorator(descriptor.name, {
                  rules: [
                    {
                      required: true,
                      message: '请选择服务类型'
                    }
                  ]
                })(<EnquiryField fieldDescriptor={descriptor} />)}
              </Form.Item>
            ) : null
          )}
        </div>
      </div>
    );
  }
}

export const EnquirySection = Form.create<IEnquirySectionProps>({})(EnquirySectionComponent);
