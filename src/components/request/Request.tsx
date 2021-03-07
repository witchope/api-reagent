import React, {memo, useState} from 'react';
import {Col, Dropdown, Input, Menu, Row, Select} from "antd";
import ParamTab from "./ParamTab";
import {
  DownOutlined
} from '@ant-design/icons';
import Response from "../response/Response";
import styles from "./Request.module.less"

const {Option} = Select;

export type RequestHeader = {
  key: string;
  value: string;
  description: string;
}

export type FormParameters = {
  key: string;
  value: string;
  description: string;
}

export type RequestBody = {
  method: "GET" | "POST";
  url: string;
  headers: RequestHeader[];
  parameterType: "none" | "form-data" | "x-www-form-urlencoded" | "json" | "xml";
  jsonParameter: string,
  formParameters: FormParameters[],
}

/**
 * API Request
 *
 * @constructor
 */
const Request: React.FC = () => {
  const [requestBody, setRequestBody] = useState<RequestBody>({
    method: "GET",
    url: "",
    headers: [],
    parameterType: "none",
    jsonParameter: "",
    formParameters: [],
  });

  function handleMenuClick(e: any) {
    console.log('click', e);
  }

  const selectBefore = (
    <Select defaultValue="GET" className={styles.selectBefore}>
      <Option value="POST"><b>POST</b></Option>
      <Option value="GET"><b>GET</b></Option>
    </Select>
  );
  const menu = (
    <Menu onClick={handleMenuClick} color={"black"}>
      <Menu.Item key="1">Send and Download</Menu.Item>
    </Menu>
  );

  return <div>
    <Row gutter={8}>
      <Col span={21}>
        <Input addonBefore={selectBefore} size="large" placeholder={"Enter request URL"}/>
      </Col>
      <Col span={1}>
        <Dropdown.Button
          className={styles.sendButton}
          size="large"
          type="primary"
          overlay={menu}
          icon={<DownOutlined/>}
        >Send</Dropdown.Button>
      </Col>
    </Row>
    <Row gutter={8}>
      <Col span={24}>
        <ParamTab requestBody={requestBody} setRequestBody={setRequestBody}/>
      </Col>
    </Row>
    <Row gutter={8}>
      <Col span={24}>
        <Response/>
      </Col>
    </Row>
  </div>

}

export default memo(Request);