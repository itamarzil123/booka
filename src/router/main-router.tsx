import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from '../pages/auth/login/login';
import PrivateRoute from './private-route';
import Signup from '../pages/auth/signup/signup';
import Homepage from '../pages/homepage/homepage';
import { Routes } from './router.config';

function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to={Routes.HOMEPAGE} />
      </Route>
      <Route exact path={Routes.LOGIN}>
        <Login />
      </Route>
      <Route exact path={Routes.SIGNUP}>
        <Signup />
      </Route>
      <PrivateRoute
        Component={Homepage}
        path={Routes.HOMEPAGE}
        alternativePath={Routes.LOGIN}
      />
    </BrowserRouter>
  );
}
export default Router;
