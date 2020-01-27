import { isTokenStale } from 'sn-front.api-endpoints/src/api';
import { pipe } from 'sn-front.redux-utils/src/funcs';
import { mountPath } from './app-config';


const goToFolder = () => pipe(
  `${mountPath}/folder`,
  path => path.replace(/\/+/g, '/'),
  path => global.location.replace(path)
);

const checkSession = () => next => action => {
  if (isTokenStale()) {
    return goToFolder();
  }
  return next(action);
};

export default checkSession;
