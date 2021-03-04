import React, {memo} from 'react';
import {Col, Dropdown, Input, Menu, Row, Select} from "antd";
import ParamTab from "./ParamTab";

const {Option} = Select;

/**
 * API Request
 *
 * @constructor
 */
const Request: React.FC = () => {

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
        <ParamTab/>
      </Col>
    </Row>
  </div>

}

export default memo(Request);