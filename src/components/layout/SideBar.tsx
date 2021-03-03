import React, {memo} from 'react';
import {Layout} from 'antd';

const {Sider} = Layout;

type SideBarProps = {
  popoverHide?: () => void;
  collapsed?: boolean;
};

const SideBar: React.FC<SideBarProps> = (props) => {
  return (
    <Sider
      trigger={null}
      breakpoint="lg"
      collapsed={false}
      width={256}
      className="sider-bar"
    >
      <div className="mini-logo">
        <a href="/">
        </a>
      </div>
    </Sider>
  );
};

export default memo(SideBar);
