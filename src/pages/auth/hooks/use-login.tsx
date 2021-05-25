import { useContext } from 'react';
import { loginUser as _loginUser } from '../../../services/rest/user.service';
import { Context } from '../../../store/store';

export const useLogin = ({ onCompleted, onError }: any) => {
  const [state, dispatch] = useContext(Context) as any;

  const loginUser = async (credentials: any) => {
    const userToken = await _loginUser(credentials);
    if (userToken) {
      const payload = {
        username: credentials.username,
        password: credentials.password,
        token: userToken
      };
      dispatch({
        type: 'SET_LOGGED_IN_USER',
        payload
      });
      onCompleted();
    } else {
      onError();
    }
  };

  return { loginUser };
};
