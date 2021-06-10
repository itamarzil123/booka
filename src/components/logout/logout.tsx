import { useContext, useState } from 'react';
import { Context } from '../../store/store';
import { clearLoggedInUser, clearToken } from '../../utils/storage.utils';
import { Routes } from '../../router/router.config';
import { Redirect } from 'react-router-dom';
import './logout.css';

function Logout() {
  const [state, dispatch] = useContext<any>(Context);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggedOut(true);
    clearToken();
    clearLoggedInUser();
    dispatch({ type: 'SET_TOKEN', payload: null });
    try {
    } catch (e) {
      console.error(e);
    }
  };
  if (!isLoggedOut) {
    return <div onClick={handleLogout}>Logout</div>;
  } else {
    return <Redirect to={Routes.HOME} />;
  }
}

export default Logout;
