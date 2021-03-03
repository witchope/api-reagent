import React from 'react';
import './App.less';
import {Layout} from "antd";
import SideBar from "./components/layout/SideBar";
import HeadBar from "./components/layout/Header";
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <Layout>
        <SideBar/>
        <Layout style={{flexDirection: 'column'}}>
          <HeadBar/>
          <Layout.Content
            style={{
              margin: '0 16px',
              overflow: 'initial',
              flex: '1 1 0',
              minHeight: 'auto',
            }}
          >
            <Routes auth={{}}/>
          </Layout.Content>
          <Layout.Footer style={{textAlign: 'center', background: '#f0f2f5'}}>
            API-REAGENT WebUI ©{new Date().getFullYear()} Power By
            <a href="mailto:guoxiaohan@rjmart.cn">
              &nbsp;guoxiaohan@rjmart.cn
            </a>
          </Layout.Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
