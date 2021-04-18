import React, {memo, useState} from 'react';
import {Col, Dropdown, Input, Menu, Row, Select} from "antd";
import {DownOutlined} from '@ant-design/icons';
import ParamTab from "./ParamTab";
import Response from "../response/Response";
import styles from "./Request.module.less"

const {Option} = Select;

export interface Parameter {
  key: string;
  name: string;
  value: string;
  description: string;
}

export interface RequestHeader extends Parameter {
}

export interface UrlParameter extends Parameter {
}

export interface FormParameter extends Parameter {
}

export type ParameterType = "none" | "form-data" | "x-www-form-urlencoded" | "json" | "xml"

export type RequestBody = {
  method: "GET" | "POST";
  url: string;
  urlParameters: UrlParameter[];
  headers: RequestHeader[];
  parameterType: ParameterType;
  jsonParameter: string,
  formParameters: FormParameter[],
}

const selectBefore = (
  <Select defaultValue="GET" className={styles.selectBefore}>
    <Option value="POST"><b>POST</b></Option>
    <Option value="GET"><b>GET</b></Option>
  </Select>
);

/**
 * API Request
 *
 * @constructor
 */
const Request: React.FC = () => {
  const [requestBody, setRequestBody] = useState<RequestBody>({
    method: "GET",
    url: "",
    urlParameters: [],
    headers: [],
    parameterType: "none",
    jsonParameter: "",
    formParameters: [],
  });

  function handleMenuClick(e: any) {
    console.log('click', e);
  }

  function handleSendClick() {
    console.log('click', requestBody);
  }

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
          onClick={handleSendClick}
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