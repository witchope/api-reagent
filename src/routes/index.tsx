import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import routesConfig, {createRoute} from './config';
import {Tabs} from "antd";

type CRouterProps = {
  auth: any;
};

const CRouter: React.FC<CRouterProps> = props => {

  return (
    <Router>
      <div style={{minHeight: "80vh"}}>
        {/*<Tabs*/}
        {/*  type="editable-card"*/}
        {/*>*/}
        {/*  <Switch>*/}
        {/*    {Object.keys(routesConfig).map(key => createRoute(key))}*/}
        {/*    <Route render={() => <Redirect to="/404"/>}/>*/}
        {/*  </Switch>*/}
        {/*</Tabs>*/}
      </div>
    </Router>
  );
};

export default CRouter;
