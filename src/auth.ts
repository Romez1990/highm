import { IncomingMessage } from 'http';
import { createAxios } from './axios';
import { getCookie } from './cookies';
import Profile from '../types/Profile';

function getToken(req?: IncomingMessage): string | undefined {
  return getCookie('token', req);
}

async function authenticate(req?: IncomingMessage): Promise<Profile | undefined> {
  const token = getToken(req);
  if (!token) return;

  const axios = createAxios(req);
  let response;
  try {
    response = await axios.get('/auth/profile/');
  } catch (err) {
    return;
  }
  return response.data;
}

export {
  getToken,
  authenticate,
};
