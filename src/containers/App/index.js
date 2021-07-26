import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ZH_TW from 'antd/lib/locale/zh_TW';
import HomePage from 'containers/HomePage';
import ProductPage from 'containers/ProductPage';
import CategoryPage from 'containers/CategoryPage';

const App = () => (
  <ConfigProvider locale={ZH_TW}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/products" component={ProductPage} />
        <Route path="/categories" component={CategoryPage} />
      </Switch>
    </HashRouter>
  </ConfigProvider>
);

export default App;
