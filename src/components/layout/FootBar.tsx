import React, {memo} from 'react';
import {Layout} from 'antd';

const {Footer} = Layout;

type SideBarProps = {
  popoverHide?: () => void;
  collapsed?: boolean;
};

const SideBar: React.FC<SideBarProps> = (props) => {
  return (
    <div style={{minHeight: '10vh'}}>
      <Footer>
        <a href="mailto:guoxiaohan@rjmart.cn">
          &nbsp;guoxiaohan@rjmart.cn
        </a>
      </Footer>
    </div>
  );
};

export default memo(SideBar);
