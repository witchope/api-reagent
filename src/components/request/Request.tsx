import React, {memo} from 'react';
import {Col, Dropdown, Input, Menu, Row, Select, Tabs} from "antd";
import EditableTable from './EditableTable';
import styles from './Request.module.less';

const {TabPane} = Tabs;

const Request: React.FC = () => {
  const {Option} = Select;

  function handleMenuClick(e: any) {
    console.log('click', e);
  }

  const selectBefore = (
    <Select defaultValue="GET" className="select-before">
      <Option value="POST">POST</Option>
      <Option value="GET">GET</Option>
    </Select>
  );
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">发送并下载</Menu.Item>
    </Menu>
  );

  function callback(key: any) {
    console.log(key);
  }

  return <div>
    <Row gutter={8}>
      <Col span={21}>
        <Input addonBefore={selectBefore} defaultValue="mysite"/>
      </Col>
      <Col span={1}>
        <Dropdown.Button type={"primary"} overlay={menu}>发送</Dropdown.Button>
      </Col>
    </Row>
    <Row gutter={8}>
      <Col span={24}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Params" key="1">
            <EditableTable/>
          </TabPane>
          <TabPane tab="Headers" key="2">
            <EditableTable/>
          </TabPane>
          <TabPane tab="Body" key="3">
            <div className={styles.title}>
              test
            </div>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>

}

export default memo(Request);