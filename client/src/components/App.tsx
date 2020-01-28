import React from 'react';
import { Route, Switch } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import LandingPage from '../pages/LandingPage';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
