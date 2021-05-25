import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../store/store';

type Props = {
  Component: any;
  path: string;
  alternativePath: string;
};
const PrivateRoute = ({
  Component,
  path,
  alternativePath,
  ...props
}: Props) => {
  const [state] = useContext<any>(Context);
  return (
    <Route
      {...props}
      render={(props) => {
        if (!state.token) {
          return <Redirect to={alternativePath} />;
        }
        return <Component />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
