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
    <div style={{minHeight: '11vh'}}>
      <Header className={classNames('nav-bar')} style={{background: '#f0f0f0', borderBottom: '1px #d8d8d8 solid'}}>
      </Header>
    </div>
  );
};

export default HeadBar;
