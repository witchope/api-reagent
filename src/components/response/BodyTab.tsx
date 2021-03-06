import {Radio} from "antd";
import React, {useState} from "react";
import MonacoEditor from 'react-monaco-editor';

type BodyTabProps = {}

const BodyTab: React.FC<BodyTabProps> = props => {
  const [editorValue, setEditorValue] = useState<string>("");
  const [currentRadio, setCurrentRadio] = useState<string>("Pretty");
  const [lang, setLang] = useState<string>("json");

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
      case 'Raw':
        return <div style={{textAlign: 'center'}}>This request does not have a body!</div>
      case 'Pretty':
        return (<div style={{border: '1px solid #d8d8d8', borderRadius: "5px"}}>
          < MonacoEditor
            height="198"
            language={lang}
            theme="vs"
            value={editorValue}
            onChange={(value, e) => {
              setEditorValue(value);
            }}
            options={{
              readOnly: true,
              selectOnLineNumbers: true,
              language: "json",
              minimap: {
                enabled: false
              }
            }}
          />
        </div>)
      case 'Preview':
    }
  }

  return <div>
    <Radio.Group defaultValue="Pretty" buttonStyle="solid" style={{marginBottom: 10}}>
      <Radio.Button value="Pretty">Pretty</Radio.Button>
      <Radio.Button value="Raw">Raw</Radio.Button>
      <Radio.Button value="Preview">Preview</Radio.Button>
    </Radio.Group>
    <div style={{borderTop: '1px solid #d8d8d8'}}>
      {displayTab()}
    </div>
  </div>

}

export default BodyTab;