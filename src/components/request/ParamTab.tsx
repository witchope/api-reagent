import React, {useState} from "react";
import {Tabs} from "antd";
import styles from "./Request.module.less";
import BodyTab from "./BodyTab";
import {FormParameters, RequestBody} from "./Request";
import EditableTable, {DataType} from "./EditableTable";

type ParamTabProps = {
  requestBody: RequestBody
  setRequestBody: (req: RequestBody) => void
}

const {TabPane} = Tabs;

const ParamTab: React.FC<ParamTabProps> = props => {

  const [count, setCount] = useState<number>(0);
  const [dataSource, setDataSource] = useState<DataType[]>([{key: -1, name: '', value: '', description: ''}]);
  const [count1, setCount1] = useState<number>(0);
  const [dataSource1, setDataSource1] = useState<DataType[]>([{key: -1, name: '', value: '', description: ''}]);

  const updateBody = (jsonParameter: string, formParameters: FormParameters[]) => {
    console.log("json", jsonParameter);
    console.log("form", formParameters);
  }

  function callback(key: any) {
    console.log(key);
  }

  return <div className={styles.param}>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Params" key="1">
        <div className={styles.panes}>
          <EditableTable
            count={count}
            setCount={setCount}
            dataSource={dataSource}
            setDataSource={setDataSource}/>
        </div>
      </TabPane>
      <TabPane tab="Headers" key="2">
        <div className={styles.panes}>
          <EditableTable
            count={count1}
            setCount={setCount1}
            dataSource={dataSource1}
            setDataSource={setDataSource1}/>
        </div>
      </TabPane>
      <TabPane tab="Body" key="3">
        <div className={styles.title}>
          <BodyTab setParameters={updateBody}/>
        </div>
      </TabPane>
    </Tabs>
  </div>

}

export default ParamTab;