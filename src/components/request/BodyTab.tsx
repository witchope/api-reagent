import {Radio} from "antd";
import React, {useState} from "react";
import MonacoEditor from 'react-monaco-editor';
import EditableTable, {DataType} from "./EditableTable";
import {FormParameters} from "./Request";

type BodyTabProps = {
  setParameters: (jsonParameter: string, formParameters: FormParameters[]) => void
}

const BodyTab: React.FC<BodyTabProps> = props => {
  const {setParameters} = props;
  const [editorValue, setEditorValue] = useState<string>("");
  const [currentRadio, setCurrentRadio] = useState<string>("none");
  const [lang, setLang] = useState<string>("json");
  const [count, setCount] = useState<number>(0);
  const [dataSource, setDataSource] = useState<DataType[]>([{key: -1, name: '', value: '', description: ''}]);

  const beautify = (val: string) => {
    try {
      const res = JSON.parse(val);
      const beautifyJson = JSON.stringify(res, null, 2);
      setEditorValue(beautifyJson);
    } catch {
    }
  }

  const displayTab = () => {
    switch (currentRadio) {
      case 'none':
        return <div style={{textAlign: 'center'}}>This request does not have a body!</div>
      case 'json':
      case 'xml':
        return (<div style={{border: '1px solid #d8d8d8', borderRadius: "5px"}}>
          < MonacoEditor
            height="190"
            language={lang}
            theme="vs"
            value={editorValue}
            onChange={(value, e) => {
              setEditorValue(value);
              setParameters(value, []);
            }}
            options={{
              selectOnLineNumbers: true,
              language: "json",
              minimap: {
                enabled: false
              }
            }}
          />
        </div>)
      case 'form-data':
      case 'x-www-form-urlencoded':
        return <EditableTable
          dataSource={dataSource}
          count={count}
          setDataSource={setDataSource}
          setCount={setCount}
        />
    }
  }

  return <div>
    <Radio.Group
      defaultValue="none"
      style={{marginBottom: 10}}
      onChange={(e) => {
        let value = e.target.value;
        if (value === 'xml' || value == 'json') {
          setLang(value);
        }
        setCurrentRadio(value)
      }}>
      <Radio value="none">none</Radio>
      <Radio value="form-data">form-data</Radio>
      <Radio value="x-www-form-urlencoded">x-www-form-urlencoded</Radio>
      <Radio value="json">json</Radio>
      <Radio value="xml">xml</Radio>
    </Radio.Group>
    <a onClick={() => beautify(editorValue)}><b>Beautify</b></a>
    <div style={{borderTop: '1px solid #d8d8d8'}}>
      {displayTab()}
    </div>
  </div>

}

export default BodyTab;