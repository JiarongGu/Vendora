import * as React from 'react';
import Button from 'antd/lib/button';

export interface FormProps {
  version: String;
}

export default class Form extends React.Component<FormProps> {
  render() {
    const { version } = this.props;
    return (
      <div></div>
    );
  }
}