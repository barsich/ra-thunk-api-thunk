import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ServiceEditPage from './pages/ServiceEditPage';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/ra-thunk-api-thunk/services/:id" component={ServiceEditPage} />
        <Route path="/ra-thunk-api-thunk/services" component={ServicesPage} />
        <Route path="/ra-thunk-api-thunk" exact>
          <Redirect to="/ra-thunk-api-thunk/services" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
