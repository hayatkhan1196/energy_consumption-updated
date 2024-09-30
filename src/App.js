import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/page-route.jsx";
import { PageSettings } from "./config/page-settings.js";
import "./App.css";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Login from "./components/auth/authLogin/authLogin.js";
import SignUp from "./components/auth/SignUp/signUp.js";

class App extends React.Component {
  static contextType = PageSettings;
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signUp" component={SignUp} />
            <>
              <Navbar />
              <Sidebar />
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
