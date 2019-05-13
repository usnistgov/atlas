import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import UseCaseCatalogPage from './containers/UseCaseCatalogPage';
import InformationTypeCatalogPage from './containers/InformationTypeCatalogPage';
import GlossaryPage from './containers/GlossaryPage';

export default () => (
  <App>
    <div>
        <Switch>
            <Route exact path={routes.USE_CASE_CATALOG} component={UseCaseCatalogPage} />
            <Route exact path={routes.INFORMATION_TYPE_CATALOG} component={InformationTypeCatalogPage} />
            <Route exact path={routes.GLOSSARY} component={GlossaryPage} />
        </Switch>
    </div>
  </App>
);