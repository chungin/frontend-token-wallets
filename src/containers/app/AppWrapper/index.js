import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import { namedRoutes } from '../../../routes';
import { logout, fetchUser } from '../../../redux/modules/app/app';

import Header from '../../../components/app/Header';
import Sidebar from '../../../components/app/Sidebar';

import Dashboard from '../Dashboard';
import Settings from '../Settings';

class AppWrapper extends Component {
  componentDidMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }

  render() {
    return (
      <div className="app">
        <Header {...this.props}/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Container fluid>
              <Switch>
                <Route exact path={namedRoutes.dashboard} component={Dashboard}/>
                <Route exact path={namedRoutes.settings} component={Settings}/>
                <Redirect from={namedRoutes.app} to={namedRoutes.dashboard}/>
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

const ConnectedComponent = connect(
  (state) => ({
    ...state.app.app.user
  }),
  {
    logout,
    fetchUser
  }
)(AppWrapper);
const ComponentWithRouter = withRouter(ConnectedComponent);
export default ComponentWithRouter;
