import * as React from 'react';
import { sinking, SinkFactory } from 'redux-sink';
import Button from 'antd/lib/button';
import { ContentSink } from '@sinks/content';
import Content from 'antd/lib/layout';

export interface HomeProps {
  version: String;
}

interface HomePropsWithSink extends HomeProps {
  content: ContentSink;
}

export class Home extends React.Component<HomePropsWithSink> {
  render() {
    const {content } = this.props;
    return (
      <div className="HomePage">
        <h1>{content.state && content.state.home.header}</h1>
        <div style={{ marginTop: "16px" }}>
          <Button type="primary">Example button</Button>
        </div>
      </div>
    );
  }
}

export default sinking(ContentSink)(Home) as React.ComponentClass<HomeProps>;