import React from 'react';
import { Row, Col } from 'antd';

import {Home} from "./components/Home"

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={24}>
          <Home />
        </Col>
      </Row>
    </div>
  );
}

export default App;
