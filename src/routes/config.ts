import React from 'react';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import {
    AreaChartOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    ProfileOutlined,
} from '@ant-design/icons';

export interface IFMenuBase {
    key: string;
    title: string;
    icon?: React.ForwardRefExoticComponent<
        AntdIconProps & React.RefAttributes<HTMLSpanElement>
    >;
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
        },
        {
            key: '/app/service/register',
            title: '服务注册',
            icon: AreaChartOutlined,
            component: 'ServiceRegister',
            login: false,
        },
        {
            key: '/app/conf/center',
            title: '配置中心',
            icon: ProfileOutlined,
            component: 'ConfigCenter',
            login: false,
        },
    ],
    others: [], // 非菜单相关路由
};

export default menus;
