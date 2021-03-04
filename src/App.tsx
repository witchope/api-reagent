import React from 'react';
import './App.less';
import {Layout} from "antd";
import SideBar from "./components/layout/SideBar";
import HeadBar from "./components/layout/Header";
import TabPage from "./components/page/TabPage";
import FootBar from "./components/layout/FootBar";

function App() {
  return (
    <div className="App">
      <Layout>
        <SideBar/>
        <Layout style={{
          flexDirection: 'column',
          background: 'white'
        }}>
          <HeadBar/>
          <Layout.Content
            style={{
              margin: '0 16px',
              overflow: 'initial',
              flex: '1 1 0',
              minHeight: 'auto',
              background: 'white'
            }}
          >
            <TabPage/>
          </Layout.Content>
          <FootBar/>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
