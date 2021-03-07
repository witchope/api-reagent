import React from 'react';
import {Layout, Menu} from 'antd';
import classNames from 'classnames';

const {Header} = Layout;

type HeaderProps = {};

/**
 *
 * @param props
 * @desc app header
 */
const HeadBar: React.FC<HeaderProps> = props => {

  return (
    <div>
      <Header
        className={classNames('nav-bar')}
        style={{
          background: '#f0f0f0',
          borderBottom: '1px #d8d8d8 solid',
          height: 48,
        }}
      >
      </Header>
    </div>
  );
};

export default HeadBar;
