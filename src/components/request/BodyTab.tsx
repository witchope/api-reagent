import React from "react";
import MonacoEditor from 'react-monaco-editor';
import styles from "./Request.module.less";

type BodyTabProps = {}

const BodyTab: React.FC<BodyTabProps> = props => {

  return <div >
    <MonacoEditor
      width="1000"
      height="300"
      language="json"
      theme="vs"
      value={''}
      options={{selectOnLineNumbers: true, language: "json"}}
    />
  </div>

}

export default BodyTab;