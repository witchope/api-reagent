import React, {useState} from "react";
import {Tabs} from "antd";
import BodyTab from "../response/BodyTab";
import errorResponseImg from "../../img/emptyResponse.svg"
import styles from "./Response.module.less"

type ResponseProps = {}

const {TabPane} = Tabs;

const Response: React.FC<ResponseProps> = props => {
  const [response, setResponse] = useState("");

  return <>
    {
      response === '' ?
        <div className={styles.errorResponseViewer}>
          <span>Response</span>
          <div className={styles.errorResponseContent}>
            <img alt={"errormessage"} src={errorResponseImg}
                 style={{height: "120px", width: "120px"}}/>
            <div>Hit Send to get a response</div>
          </div>
        </div> :
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
    }
  </>

}

export default Response;