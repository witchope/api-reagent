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
  concatUrl: string,
  url: string;
  urlParameters: UrlParameter[];
  headers: RequestHeader[];
  parameterType: ParameterType;
  jsonParameter: string,
  formParameters: FormParameter[],
}


/**
 * API Request
 *
 * @constructor
 */
const Request: React.FC = () => {
  const [requestBody, setRequestBody] = useState<RequestBody>({
    method: "GET",
    concatUrl: "",
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

  function handleRequestBody(reqBody: RequestBody) {
    setRequestBody({...reqBody})
  }

  function handleSelectorClick(value: any) {
    setRequestBody({...requestBody, method: value})
  }

  const selectBefore = (
    <Select defaultValue="GET" className={styles.selectBefore} onChange={handleSelectorClick}>
      <Option value="POST"><b>POST</b></Option>
      <Option value="GET"><b>GET</b></Option>
    </Select>
  );

  function concatParam() {
    return requestBody.urlParameters
      .filter(x => x.name !== '')
      .map(x => (`${x.name}=${x.value}`))
      .reduce((acc, next, i) => i === 0 ? `${acc}${next}` : `${acc}&${next}`, '?');
  }

  function changeUrl(event: any) {
    debugger;
    let targetUrl: string = event.target.value;
    // let url = targetUrl.split('?')[0];
    setRequestBody({...requestBody, url: targetUrl})
    // setRequestBody({...requestBody, concatUrl: concatParam() === '?' ? url : url + concatParam()})
  }

  const menu = (
    <Menu onClick={handleMenuClick} color={"black"}>
      <Menu.Item key="1">Send and Download</Menu.Item>
    </Menu>
  );

  return <div>
    <Row gutter={8}>
      <Col span={21}>
        <Input
          style={{fontFamily: 'monospace'}}
          addonBefore={selectBefore}
          size="large"
          value={requestBody.url}
          onInput={changeUrl}
          placeholder={"Enter request URL"}
        />
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
        <ParamTab requestBody={requestBody} setRequestBody={handleRequestBody}/>
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