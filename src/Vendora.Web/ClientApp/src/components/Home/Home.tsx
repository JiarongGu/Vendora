import * as React from 'react';
import { sinking, SinkFactory } from 'redux-sink';
import Button from 'antd/lib/button';
import { ContentSink } from '@sinks/content';
import { NavigationSink } from '@sinks/navgation';

export interface HomeProps {
  version: String;
}

interface HomePropsWithSink extends HomeProps {
  content: ContentSink;
}

export const Home = (props: HomePropsWithSink) => {
  const content = props.content;

  return (
    <div className={'HomePage'}>
      <h1>{content.home.header}</h1>
      <div>Current antd version: {props.version}</div>
      <div style={{ marginTop: '16px' }}>
        <Button type={'primary'}>Example button</Button>
      </div>
    </div>
  )
};

export default sinking(ContentSink)(Home) as React.FunctionComponent<HomeProps>;
