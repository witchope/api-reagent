import React from 'react';
import {Layout} from 'antd';
import styles from './FootBar.module.less';

const {Footer} = Layout;

type FootBarProps = {
  popoverHide?: () => void;
  collapsed?: boolean;
};

const FootBar: React.FC<FootBarProps> = (props) => {
  return (
    <div className={styles.footer}>
      <Footer>
        API-REAGENT WebUI ©{new Date().getFullYear()} Power By
        <a href="mailto:guoxiaohan@rjmart.cn">
          &nbsp;guoxiaohan@rjmart.cn
        </a>
      </Footer>
    </div>
  );
};

export default FootBar;
