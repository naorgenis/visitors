import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Users from "./Users/Pages/Users";
//import NewPlace from "./Places/pages/NewPlace";
import Layout from "./Layout/Layout";
//import UserPlaces from "./Places/pages/UserPlaces";
//import UpdatePlace from "./Places/pages/UpdatePlace";
//import Auth from "./Users/Pages/Auth";
import { AuthContext } from "./shared/context/Auth-context";
import React, { Suspense } from "react";
import { useAuth } from "./shared/Hooks/auth-hook";

const NewPlace = React.lazy(() => import("./Places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./Places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./Places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./Users/Pages/Auth"));

function App() {
  const { token, userId, login, logout } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/places/new" exact component={NewPlace} />
        <Route path="/places/:placeId" exact component={UpdatePlace} />
        <Route path="/:userId/places" exact component={UserPlaces} />

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" exact component={UserPlaces} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Layout>
        <Switch>
          <Suspense fallback={<div>Loading. . . </div>}>{routes}</Suspense>
        </Switch>
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
