import { Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import {
  validateEmail,
  validateName,
  validatePassword
} from '../../../utils/validations.utils';
import { useContext } from 'react';
import { Context } from '../../../store/store';
import { Routes } from '../../../router/router.config';
import Logo from '../../../components/logo/logo';
import { useInput } from '../../hooks/use-input';
import { logger, LogTypes } from '../../../utils/logger.utils';
import {
  INVALID_EMAIL,
  INVALID_NAME,
  INVALID_PASSWORD
} from '../../../constants/errors.constants';
import ErrorMessage from '../errors-message/error-message';
import '../auth-form.css';

function Signup({ setLoginOrSignup }: any) {
  const history = useHistory();
  const [state] = useContext(Context) as any;
  const {
    value: email,
    isFocused: isEmailFocused,
    bind: bindEmail,
    errors: emailErrors,
    setErrors: setEmailErrors
  } = useInput('');
  const {
    value: password,
    isFocused: isPasswordFocused,
    bind: bindPassword,
    errors: passwordErrors,
    setErrors: setPasswordErrors
  } = useInput('');

  const {
    value: username,
    isFocused: isUsernameFocused,
    bind: bindUsername,
    errors: usernameErrors,
    setErrors: setUsernameErrors
  } = useInput('');

  const {
    value: firstname,
    isFocused: isFirstnameFocused,
    bind: bindFirstname,
    errors: firstnameErrors,
    setErrors: setFirstnameErrors
  } = useInput('');

  const {
    value: lastname,
    isFocused: isLastnameFocused,
    bind: bindLastname,
    errors: lastnameErrors,
    setErrors: setLastnameErrors
  } = useInput('');
  const [serverErrors, setServerErrors] = useState<any[]>([]);

  const signupUser = (e: any) => {
    logger.error(LogTypes.Generic, 'Signup is not available yet.');
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isUsernameValid = validateName(username);
    const isPasswordValid = validatePassword(password);
    const isFirstnameValid = validateName(firstname);
    const isLastnameValid = validateName(lastname);

    if (!isEmailValid) {
      const errorsClone = [...emailErrors];
      const filteredErrors = errorsClone.filter(
        (err) => err.id === INVALID_EMAIL.ID
      );
      if (Array.isArray(filteredErrors) && filteredErrors.length > 0) {
      } else {
        errorsClone.push({
          id: INVALID_EMAIL.ID,
          message: INVALID_EMAIL.MESSAGE
        });
      }

      setEmailErrors(errorsClone);
    } else {
      setEmailErrors([]);
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

    if (!isFirstnameValid) {
      const errorsClone = [...firstnameErrors];
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

      setFirstnameErrors(errorsClone);
    } else {
      setFirstnameErrors([]);
    }

    if (!isLastnameValid) {
      const errorsClone = [...lastnameErrors];
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

      setLastnameErrors(errorsClone);
    } else {
      setLastnameErrors([]);
    }

    if (
      !isEmailValid ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isFirstnameValid ||
      !isLastnameValid
    ) {
      return;
    }
    try {
      signupUser({
        variables: { email, password, username, firstname, lastname }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getEmailInputFieldClasses = () => {
    if (isEmailFocused) {
      return 'form-input focused';
    } else {
      return 'form-input';
    }
  };

  const getEmailLabelClasses = () => {
    if (isEmailFocused) {
      return 'form-label focused';
    } else {
      if (email) {
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

  const getFirstnameInputFieldClasses = () => {
    if (isFirstnameFocused) {
      return 'form-input focused';
    } else {
      return 'form-input';
    }
  };
  const getFirstnameLabelClasses = () => {
    if (isFirstnameFocused) {
      return 'form-label focused';
    } else {
      if (firstname) {
        return 'form-label focused';
      } else {
        return 'form-label';
      }
    }
  };

  const getLastnameInputFieldClasses = () => {
    if (isLastnameFocused) {
      return 'form-input focused';
    } else {
      return 'form-input';
    }
  };
  const getLastnameLabelClasses = () => {
    if (isLastnameFocused) {
      return 'form-label focused';
    } else {
      if (lastname) {
        return 'form-label focused';
      } else {
        return 'form-label';
      }
    }
  };

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

  const handleLoginClick = () => {
    history.push(Routes.LOGIN);
  };
  if (state.token) {
    return <Redirect to={Routes.HOMEPAGE} />;
  }

  const emailLabelClasses = getEmailLabelClasses();
  const emailInputFieldClasses = getEmailInputFieldClasses();
  const passwordLabelClasses = getPasswordLabelClasses();
  const passwordInputFieldClasses = getPasswordInputFieldClasses();
  const usernameLabelClasses = getUsernameLabelClasses();
  const usernameInputFieldClasses = getUsernameInputFieldClasses();
  const firstnameLabelClasses = getFirstnameLabelClasses();
  const firstnameInputFieldClasses = getFirstnameInputFieldClasses();
  const lastnameLabelClasses = getLastnameLabelClasses();
  const lastnameInputFieldClasses = getLastnameInputFieldClasses();
  return (
    <div className="auth-page__container">
      <div className="form-wrapper">
        <Logo width={200} height={100} />
        <div className="form-box">
          <div className="form-title">sign up</div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className={emailLabelClasses} htmlFor="email-input">
                Email
              </label>
              <input
                className={emailInputFieldClasses}
                id="email-input"
                type="text"
                {...bindEmail}
              />
              <ErrorMessage>
                {' '}
                {emailErrors.map((err: any) => (
                  <div key={err.id}>{err.message}</div>
                ))}
              </ErrorMessage>
            </div>

            <div className="form-field">
              <label className={usernameLabelClasses} htmlFor="username-input">
                Username
              </label>
              <input
                className={usernameInputFieldClasses}
                id="username-input"
                type="text"
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
                id="password-input"
                type="password"
                {...bindPassword}
              />
              <ErrorMessage>
                {' '}
                {passwordErrors.map((err: any) => (
                  <div key={err.id}>{err.message}</div>
                ))}
              </ErrorMessage>
            </div>

            <div className="form-field">
              <label
                className={firstnameLabelClasses}
                htmlFor="firstname-input"
              >
                Firstname
              </label>
              <input
                className={firstnameInputFieldClasses}
                id="firstname-input"
                type="text"
                {...bindFirstname}
              />
              <ErrorMessage>
                {' '}
                {firstnameErrors.map((err: any) => (
                  <div key={err.id}>{err.message}</div>
                ))}
              </ErrorMessage>
            </div>
            <div className="form-field">
              <label className={lastnameLabelClasses} htmlFor="lastname-input">
                Lastname
              </label>
              <input
                className={lastnameInputFieldClasses}
                id="lastname-input"
                type="text"
                {...bindLastname}
              />
              <ErrorMessage>
                {' '}
                {lastnameErrors.map((err: any) => (
                  <div key={err.id}>{err.message}</div>
                ))}
              </ErrorMessage>
            </div>
            <div className="form-submit__container">
              <button className="form-submit" type="submit">
                Sign up
              </button>
              <ErrorMessage>
                {serverErrors.map((err: any) => (
                  <div key={err.id}>{err.message}</div>
                ))}
              </ErrorMessage>
            </div>
          </form>
          <div className="signup-link">
            <div className="signup-description">Have an account already ?</div>
            <div className="signup-btn" onClick={handleLoginClick}>
              login
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Signup;
