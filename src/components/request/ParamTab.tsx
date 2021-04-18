import React, {useState} from "react";
import {Tabs} from "antd";
import styles from "./Request.module.less";
import BodyTab from "./BodyTab";
import {FormParameter, Parameter, RequestBody} from "./Request";
import EditableTable, {DataType} from "./EditableTable";

type ParamTabProps = {
  requestBody: RequestBody
  setRequestBody: (req: RequestBody) => void
}

export function dataTypesToParameters(data: DataType[]) {
  const parameters: Parameter[] = data.map(x => ({
    key: `${x.key}`,
    name: x.name,
    value: x.value,
    description: x.description
  }));
  return parameters;
}

const {TabPane} = Tabs;
const dataSourceDefault: DataType[] = [{key: -1, name: '', value: '', description: ''}]

const ParamTab: React.FC<ParamTabProps> = ({requestBody, setRequestBody}) => {
  const [paramCount, setParamCount] = useState<number>(0);
  const [headerCount, setHeaderCount] = useState<number>(0);
  const [paramDataSource, setParamDataSource] = useState<DataType[]>(dataSourceDefault);
  const [headerDataSource, setHeaderDataSource] = useState<DataType[]>(dataSourceDefault);

  const updateReqBody = (jsonParameter: string, formParameters: FormParameter[], parameterType: string) => {
    setRequestBody({...requestBody, jsonParameter, formParameters, parameterType} as RequestBody)
  }

  const updateUrlParam = (data: DataType[]) => {
    setParamDataSource(data);
    setRequestBody({...requestBody, urlParameters: dataTypesToParameters(data)})
  }

  const updateHeader = (data: DataType[]) => {
    setHeaderDataSource(data);
    setRequestBody({...requestBody, headers: dataTypesToParameters(data)})
  }

  function callback(key: any) {
    console.log(key);
  }

  return <div className={styles.param}>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Params" key="1">
        <div className={styles.panes}>
          <EditableTable
            dataOperation={{dataSource: paramDataSource, setDataSource: updateUrlParam}}
            countOperation={{count: paramCount, setCount: setParamCount}}
          />
        </div>
      </TabPane>
      <TabPane tab="Headers" key="2">
        <div className={styles.panes}>
          <EditableTable
            dataOperation={{dataSource: headerDataSource, setDataSource: updateHeader}}
            countOperation={{count: headerCount, setCount: setHeaderCount}}
          />
        </div>
      </TabPane>
      <TabPane tab="Body" key="3">
        <div className={styles.title}>
          <BodyTab setParameters={updateReqBody}/>
        </div>
      </TabPane>
    </Tabs>
  </div>

}

export default ParamTab;