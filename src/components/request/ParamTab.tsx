import React from "react";
import {Tabs} from "antd";
import EditableTable from "./EditableTable";
import styles from "./Request.module.less";
import BodyTab from "./BodyTab";

type ParamTabProps = {}

const {TabPane} = Tabs;

const ParamTab: React.FC<ParamTabProps> = props => {

  function callback(key: any) {
    console.log(key);
  }

  return <div className={styles.param}>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Params" key="1">
        <EditableTable/>
      </TabPane>
      <TabPane tab="Headers" key="2">
        <EditableTable/>
      </TabPane>
      <TabPane tab="Body" key="3">
        <div className={styles.title}>
          <BodyTab/>
        </div>
      </TabPane>
    </Tabs>
  </div>

}

export default ParamTab;