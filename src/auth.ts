import { IncomingMessage } from 'http';
import { getCookie } from './cookies';

function getToken(req?: IncomingMessage): string | undefined {
  return getCookie('token', req);
}

export {
  getToken,
};
