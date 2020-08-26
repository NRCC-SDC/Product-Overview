import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import App from './App';

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: 'p',
  productionPrefix: 'o',
});

const AppContainer = () => (
  <StylesProvider generateClassName={generateClassName}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route
        path="/:productId"
        render={(props) => {
          const { productId } = props.match.params || { productId: 1 };
          return (<App productId={productId} />);
        }}
      />
    </Switch>
  </StylesProvider>
);

AppContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.number.isRequired,
  }).isRequired,
};

export default AppContainer;
