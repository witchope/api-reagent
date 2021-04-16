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
const dataSourceDefault: DataType[] = [{key: -1, name: '', value: '', description: ''}]

const ParamTab: React.FC<ParamTabProps> = props => {

  const [paramCount, setParamCount] = useState<number>(0);
  const [paramDataSource, setParamDataSource] = useState<DataType[]>(dataSourceDefault);
  const [headerDataSource, setHeaderDataSource] = useState<DataType[]>(dataSourceDefault);
  const [headerCount, setHeaderCount] = useState<number>(0);

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
            dataOperation={{dataSource: paramDataSource, setDataSource: setParamDataSource}}
            countOperation={{count: paramCount, setCount: setParamCount}}
          />
        </div>
      </TabPane>
      <TabPane tab="Headers" key="2">
        <div className={styles.panes}>
          <EditableTable
            dataOperation={{dataSource: headerDataSource, setDataSource: setHeaderDataSource}}
            countOperation={{count: headerCount, setCount: setHeaderCount}}
          />
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