import * as React from 'react';
import { sinking } from 'redux-sink';
import Button from 'antd/lib/button';
import { ContentSink } from '@sinks/content';

interface HomePropsWithSink {
  content: ContentSink;
}

export class Home extends React.Component<HomePropsWithSink> {
  render() {
    const { content } = this.props;
    return (
      <div className="HomePage">
        <h1>{content && content.home.header}</h1>
        <div style={{ marginTop: "16px" }}>
          <Button type="primary">Example button</Button>
        </div>
      </div>
    );
  }
}

export default sinking(ContentSink)(Home) as React.ComponentClass;