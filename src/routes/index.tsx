import React from 'react';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import AllComponents from '../components';
import routesConfig, {IFMenuBase, IFMenu} from './config';
import queryString from 'query-string';

type CRouterProps = {
  auth: any;
};

const CRouter: React.FC<CRouterProps> = props => {

  const createRoute = (key: string) => {
    return routesConfig[key].map((r: IFMenu) => {
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
              // 重新包装组件
              const wrappedComponent = (
                <>
                  <Helmet>
                    <title>{r.title}</title>
                  </Helmet>
                  <Component {...merge} />
                </>
              );
              return wrappedComponent;
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

  return (
    <Router>
      <Switch>
        {Object.keys(routesConfig).map(key => createRoute(key))}
        <Route render={() => <Redirect to="/404"/>}/>
      </Switch>
    </Router>
  );
};

export default CRouter;
