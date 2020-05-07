import React, { Component, Fragment } from "react";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import RootComponent from "./components/RootComponent";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "./App.css";

const navWidthCollapsed = 64;
const navWidthExpanded = 240;

export class App extends Component {
  state = {
    selected: "",
    expanded: false,
    searchData: {},
    error: null,
    isLoading: true,
  };

  fetchStoresData() {
    // Where we're fetching data from
    fetch(`/stores_data.json`)
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) =>
        this.setState({
          searchData: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchStoresData();
  }

  lastUpdateTime = new Date().toISOString();

  onToggle = (expanded) => {
    this.setState({ expanded: expanded });
  };

  render() {
    const { expanded, selected } = this.state;

    return (
      <Router expanded={expanded}>
        <Route
          render={({ location, history }) => (
            <Fragment>
              <SideNav
                style={{
                  minWidth: expanded ? navWidthExpanded : navWidthCollapsed,
                }}
                onToggle={this.onToggle}
                onSelect={(selected) => {
                  const to = "/" + selected;
                  if (location.pathname !== to) {
                    history.push(to);
                  }
                }}
              >
                <Toggle />
                <Nav defaultSelected={selected}>
                  <NavItem eventKey="">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-home"
                        style={{ fontSize: "1.75em" }}
                      />
                    </NavIcon>
                    <NavText>Home</NavText>
                  </NavItem>
                  <NavItem eventKey="about">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-user"
                        style={{ fontSize: "1.75em" }}
                      />
                    </NavIcon>
                    <NavText>About</NavText>
                  </NavItem>
                  <NavItem eventKey="settings"> 
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-cogs"
                        style={{ fontSize: "1.75em" }}
                      />
                    </NavIcon>
                    <NavText>Settings</NavText>
                  </NavItem>
                </Nav>
              </SideNav>
              <main
                style={{
                  marginLeft: expanded ? navWidthExpanded : navWidthCollapsed,
                  position: "relative",
                  padding: "0 1rem",
                }}
              >
                <Route
                  path="/"
                  exact
                  component={(props) => (
                    <RootComponent searchData={this.state.searchData} />
                  )}
                />
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/settings">
                  <Settings />
                </Route>
              </main>
            </Fragment>
          )}
        />
      </Router>
    );
  }
}

function About() {
  return <h2 className="mt-3 title_head">About</h2>;
}

function Settings() {
  return <h2 className="mt-3 title_head">Settings</h2>;
}

export default App;
