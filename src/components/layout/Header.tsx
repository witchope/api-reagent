import React from 'react';
import {Badge, Dropdown, Layout, Menu} from 'antd';
import {
  NotificationOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';

const {Header} = Layout;
const MenuItemGroup = Menu.ItemGroup;

type HeaderProps = {};

/**
 *
 * @param props
 * @desc app header
 */
const HeadBar: React.FC<HeaderProps> = props => {

  return (
    <div style={{minHeight: '12vh'}}>
      <Header className={classNames('nav-bar')}>
        <MenuFoldOutlined
          className="menu-toggle"
        />
      </Header>
    </div>
  );
};

export default HeadBar;
