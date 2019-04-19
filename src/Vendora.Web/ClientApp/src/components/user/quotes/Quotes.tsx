import * as React from 'react';

import { Row, Col, Card, Icon} from 'antd';
import {Link} from "react-router-dom";

export default function (props) {
  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Row gutter={16}>
        <Col span={6}>
          <QuoteCard />
        </Col>
        <Col span={6}>
          <QuoteCard />
        </Col>
        <Col span={6}>
          <QuoteCard />
        </Col>
        <Col span={6}>
          <QuoteCard />
        </Col>
      </Row>
    </div>
  );
}

const QuoteCard = () => {
  const quoteActions = [
    <Link to={'/user/quote/1'}>
      <Icon type="edit" />
    </Link>,
    <Link  to={'/quote'}>
      <Icon type="delete" />
    </Link>
  ];
  return (

    <Card actions={quoteActions} bordered={true}>
      <h2>Status: Unassigned</h2>
      <div><p>Quote Ref: RXCV89K</p></div>
      <div><span>Last updated: 19/04/2018 10:00</span></div>
    </Card>
  );
}