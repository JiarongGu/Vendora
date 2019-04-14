import * as React from 'react';
import { sinking } from 'redux-sink';
import Button from 'antd/lib/button';
import { ContentSink } from '@sinks/content';

export interface HomeProps {
  version: String;
}

interface HomePropsWithSink extends HomeProps {
  content: ContentSink;
}

export class Home extends React.Component<HomePropsWithSink> {
  render() {
    const { version, content } = this.props;
    return (
      <div className={'HomePage'}>
        <h1>{content.state && content.state.home.header}</h1>
        <div>Current antd version: {version}</div>
        <div style={{ marginTop: '16px' }}>
          <Button type={'primary'} >Example button</Button>
        </div>
      </div>
    );
  }
}

export default sinking(ContentSink)(Home) as React.ComponentClass<HomeProps>;