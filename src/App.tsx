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
      <Layout style={{
        height: "100vh",
        overflow: "hidden"
      }}>
        <SideBar/>
        <Layout style={{
          flexDirection: 'column',
          background: '#fff'
        }}>
          <HeadBar/>
          <Layout.Content
            style={{
              overflow: 'initial',
              flex: '1 1 0',
              minHeight: 'auto',
              background: '#fff'
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
