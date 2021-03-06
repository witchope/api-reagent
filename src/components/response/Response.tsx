import React from "react";
import {Tabs} from "antd";
import styles from "../request/Request.module.less";
import BodyTab from "../response/BodyTab";
import MonacoEditor from "react-monaco-editor";

type ResponseProps = {}

const {TabPane} = Tabs;

const Response: React.FC<ResponseProps> = props => {

  return <>
    <Tabs defaultActiveKey="1">
      <TabPane tab="Body" key="1">
        <div>
          <BodyTab/>
        </div>
      </TabPane>
      <TabPane tab="Cookies" key="2">
        <div>
        </div>
      </TabPane>
      <TabPane tab="Headers" key="3">
        <div>
        </div>
      </TabPane>
    </Tabs>

  </>

}

export default Response;