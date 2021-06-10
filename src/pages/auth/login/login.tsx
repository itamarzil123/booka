import { SyntheticEvent, useContext } from 'react';
import { Context } from '../../../store/store';
import { Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import {
  validateName,
  validatePassword
} from '../../../utils/validations.utils';
import {
  INVALID_NAME,
  INVALID_PASSWORD,
  WRONG_CREDENTIALS
} from '../../../constants/errors.constants';
import { Routes } from '../../../router/router.config';
import Logo from '../../../components/logo/logo';
import { logger, LogTypes } from '../../../utils/logger.utils';
import { useInput } from '../../hooks/use-input';
import { useLogin } from '../hooks/use-login';
import ErrorMessage from '../errors-message/error-message';
import '../auth-form.css';

function Login() {
  const history = useHistory();
  const [state] = useContext(Context) as any;
  const {
    value: username,
    isFocused: isUsernameFocused,
    bind: bindUsername,
    errors: usernameErrors,
    setErrors: setUsernameErrors
  } = useInput('');
  const {
    value: password,
    isFocused: isPasswordFocused,
    bind: bindPassword,
    errors: passwordErrors,
    setErrors: setPasswordErrors
  } = useInput('');

  const [connectionErrors, setErrors] = useState<any[]>([]);
  const [wrongCredentialsErrors, setWrongCredentialsErrors] = useState<any[]>(
    []
  );

  const { loginUser } = useLogin({
    onCompleted: (results: any) => {},
    onError: () => {
      const errorsClone = [...wrongCredentialsErrors];
      const filteredErrors = errorsClone.filter(
        (err) => err.id === WRONG_CREDENTIALS.ID
      );
      if (Array.isArray(filteredErrors) && filteredErrors.length > 0) {
      } else {
        errorsClone.push({
          id: WRONG_CREDENTIALS.ID,
          message: WRONG_CREDENTIALS.MESSAGE
        });
      }
      setWrongCredentialsErrors(errorsClone);
    }
  });
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const isUsernameValid = validateName(username);
    const isPasswordValid = validatePassword(password);
    if (!isUsernameValid) {
      const errorsClone = [...usernameErrors];
      const filteredErrors = errorsClone.filter(
        (err) => err.id === INVALID_NAME.ID
      );
      if (Array.isArray(filteredErrors) && filteredErrors.length > 0) {
      } else {
        errorsClone.push({
          id: INVALID_NAME.ID,
          message: INVALID_NAME.MESSAGE
        });
      }

      setUsernameErrors(errorsClone);
    } else {
      setUsernameErrors([]);
    }
    if (!isPasswordValid) {
      const errorsClone = [...passwordErrors];
      const filteredErrors = errorsClone.filter(
        (err) => err.id === INVALID_PASSWORD.ID
      );
      if (Array.isArray(filteredErrors) && filteredErrors.length > 0) {
      } else {
        errorsClone.push({
          id: INVALID_PASSWORD.ID,
          message: INVALID_PASSWORD.MESSAGE
        });
      }

      setPasswordErrors(errorsClone);
    } else {
      setPasswordErrors([]);
    }
    if (!isPasswordValid || !isUsernameValid) {
      return;
    }
    try {
      loginUser({ username, password });
    } catch (e) {
      logger.error(LogTypes.Generic, e);
    }
  };

  const handleSignupClick = () => {
    history.push(Routes.SIGNUP);
  };
  if (state.token) {
    return <Redirect to={Routes.HOMEPAGE} />;
  }

  const getUsernameInputFieldClasses = () => {
    if (isUsernameFocused) {
      return 'form-input focused';
    } else {
      return 'form-input';
    }
  };
  const getUsernameLabelClasses = () => {
    if (isUsernameFocused) {
      return 'form-label focused';
    } else {
      if (username) {
        return 'form-label focused';
      } else {
        return 'form-label';
      }
    }
  };

  const getPasswordInputFieldClasses = () => {
    if (isPasswordFocused) {
      return 'form-input focused';
    } else {
      return 'form-input';
    }
  };
  const getPasswordLabelClasses = () => {
    if (isPasswordFocused) {
      return 'form-label focused';
    } else {
      if (password) {
        return 'form-label focused';
      } else {
        return 'form-label';
      }
    }
  };
  const usernameLabelClasses = getUsernameLabelClasses();
  const usernameInputFieldClasses = getUsernameInputFieldClasses();
  const passwordInputFieldClasses = getPasswordInputFieldClasses();
  const passwordLabelClasses = getPasswordLabelClasses();

  return (
    <div className="auth-page__container">
      <div className="form-wrapper">
        <Logo width={200} height={100} />
        <div className="form-box">
          <div className="form-title">sign in</div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className={usernameLabelClasses} htmlFor="username-input">
                Username
              </label>
              <input
                className={usernameInputFieldClasses}
                type="text"
                id="username-input"
                data-testid="username-input"
                {...bindUsername}
              />
              <ErrorMessage>
                {' '}
                {usernameErrors.map((err: any) => (
                  <div key={err.id}>{err.message}</div>
                ))}
              </ErrorMessage>
            </div>

            <div className="form-field">
              <label className={passwordLabelClasses} htmlFor="password-input">
                Password
              </label>
              <input
                className={passwordInputFieldClasses}
                type="password"
                id="password-input"
                data-testid="password-input"
                {...bindPassword}
              />
              <ErrorMessage>
                {passwordErrors.map((err: any) => (
                  <div key={err.id}>{err.message}</div>
                ))}
              </ErrorMessage>
            </div>

            <div className="forgot-password__link">
              <div className="forgot-password__description">
                {'Forgot Password ?'}
              </div>
              <div className="forgot-password__btn" onClick={handleSignupClick}>
                email me
              </div>
            </div>
            <div className="form-submit__container">
              <button className="form-submit" type="submit">
                Sign in
              </button>
              <ErrorMessage>
                {connectionErrors.map((err: any) => (
                  <div key={err.id}>{err.message}</div>
                ))}
              </ErrorMessage>
            </div>
            <ErrorMessage>
              {wrongCredentialsErrors.map((err: any) => (
                <div key={err.id}>{err.message}</div>
              ))}
            </ErrorMessage>
          </form>
        </div>
        {/* <Footer /> */}
        <div className="signup-link">
          <div className="signup-description">{"Haven't signed up yet ?"}</div>
          <div className="signup-btn" onClick={handleSignupClick}>
            sign up
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
