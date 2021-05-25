import { __ENV__ } from '../../config/env.config';
import { Environments } from '../../constants/environment.constants';
import { MOCK_USER_TOKEN } from '../../constants/storage.constants';
import { logger, LogTypes } from '../../utils/logger.utils';
import { users } from '../mock/data.service';

const fetchUsers = () => {
  if (__ENV__ === Environments.TEST) {
    return Promise.resolve(users);
  } else if (
    __ENV__ === Environments.DEVELOPMENT ||
    __ENV__ === Environments.PRODUCTION
  ) {
    logger.warn(LogTypes.Generic, 'No real users DB exists yet.');
    return Promise.resolve(users);
  }
};

export const getUsers = async () => {
  const results = await fetchUsers();
  return results;
};

export const loginUser = async (credentials: any) => {
  let results;
  if (__ENV__ === Environments.TEST) {
    const _users = await Promise.resolve(users);
    const res = _users.some(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password
    );
    if (res) {
      return MOCK_USER_TOKEN;
    } else {
      return false;
    }
  } else if (
    __ENV__ === Environments.DEVELOPMENT ||
    __ENV__ === Environments.PRODUCTION
  ) {
    const _users = await Promise.resolve(users);
    const res = _users.some(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password
    );
    if (res) {
      return MOCK_USER_TOKEN;
    } else {
      return false;
    }
  }

  return results;
};
