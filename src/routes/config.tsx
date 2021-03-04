import React from 'react';
import {AntdIconProps} from '@ant-design/icons/lib/components/AntdIcon';
import {
  DashboardOutlined,
} from '@ant-design/icons';
import AllComponents from "../components";
import {Route} from "react-router-dom";
import queryString from "query-string";
import {Tabs} from "antd";
import {Helmet} from "react-helmet";

export interface IFMenuBase {
  key: string;
  title: string;
  icon?: React.ForwardRefExoticComponent<AntdIconProps & React.RefAttributes<HTMLSpanElement>>;
  component?: string;
  query?: string;
  requireAuth?: string;
  route?: string;
  /* 是否登录校验，true不进行校验（访客） */
  login?: boolean;
}

export interface IFMenu extends IFMenuBase {
  subs?: IFMenu[];
}

const menus: {
  menus: IFMenu[];
  others: IFMenu[] | [];
  [index: string]: any;
} = {
  menus: [
    // 菜单相关路由
    {
      key: '/app/request',
      title: '首页',
      icon: DashboardOutlined,
      component: 'Request',
      login: false,
    }
  ],
  others: [], // 非菜单相关路由
};

export const createRoute = (key: string) => {
  return menus[key].map((r: IFMenu) => {
    const route = (r: IFMenuBase) => {
      const Component = r.component && AllComponents[r.component];
      return (
        <Route
          key={r.route || r.key}
          exact
          path={r.route || r.key}
          render={props => {
            const reg = /\?\S*/g;
            // 匹配?及其以后字符串
            const queryParams = window.location.hash.match(reg);
            // 去除?的参数
            const {params} = props.match;
            Object.keys(params).forEach(key => {
              params[key] =
                params[key] && params[key]?.replace(reg, '');
            });
            props.match.params = {...params};
            const merge = {
              ...props,
              query: queryParams
                ? queryString.parse(queryParams[0])
                : {},
            };
            return (
              <>
                <Tabs.TabPane>
                  <Helmet>
                    <title>{r.title}</title>
                  </Helmet>
                  <Component {...merge} />
                  <p>Content of Tab Pane 1</p>
                </Tabs.TabPane>
              </>
            );
          }}
        />
      );
    };
    const subRoute = (r: IFMenu): any =>
      r.subs &&
      r.subs.map((subR: IFMenu) =>
        subR.subs ? subRoute(subR) : route(subR)
      );

    return r.component ? route(r) : subRoute(r);
  });
};

export default menus;
