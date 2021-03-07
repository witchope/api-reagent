import React, {useEffect, useState} from 'react';
import {Tabs} from "antd";
import Request from '../request/Request'

type TabPageProps = {};

type Panes = {
  title: string;
  content: any;
  key: string;
  closable?: boolean;
}

const TabPage: React.FC<TabPageProps> = props => {

  const [panes, setPanes] = useState<Panes[]>([]);
  const [activeKey, setActiveKey] = useState("");
  const [newTabIndex, setNewTabIndex] = useState(0);

  const add = () => {
    setNewTabIndex(newTabIndex + 1);
    const activeKey = `newTab${newTabIndex}`;
    const newPanes = [...panes];
    newPanes.push({title: 'New Request', content: <Request/>, key: activeKey});
    setPanes(newPanes);
    setActiveKey(activeKey)
  };

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setActiveKey(newActiveKey);
    setPanes(newPanes);
  };

  const actions: any = {add, remove}

  const onEdit = (targetKey: any, action: string) => {
    actions[action](targetKey);
  };

  const onChange = (activeKey: string) => {
    setActiveKey(activeKey);
  };

  return (
    <div>
      <Tabs
        style={{marginTop: 1}}
        type="editable-card"
        activeKey={activeKey}
        onEdit={onEdit}
        onChange={onChange}
      >
        {panes.map(pane => (
          <Tabs.TabPane
            style={{
              paddingLeft: 10,
              paddingRight: 10
            }}
            tab={pane.title}
            key={pane.key}
            closable={pane.closable}>
            {pane.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default TabPage;
