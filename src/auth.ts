import { IncomingMessage, ServerResponse } from 'http';
import { createAxios } from './axios';
import { getCookie } from './cookies';
import { redirectToLogin } from './redirect';
import Profile, { User } from '../types/Profile';

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

type Permission =
  | 'IsAuthenticated'
  | 'IsStudent'
  | 'IsTeacher'
  | 'IsAdmin'
  ;

async function applyPermission(
  profile: Profile | undefined,
  permission: Permission,
  req?: IncomingMessage,
  res?: ServerResponse,
): Promise<void> {
  if (!hasPermission(profile, permission))
    await redirect(req, res);
}

function hasPermission(user: Profile | User | undefined, permission: Permission): boolean {
  if (!user) return false;
  return user.type === 'admin' ||
    permission === 'IsAuthenticated' ||
    user.type === 'teacher' && permission === 'IsTeacher' ||
    user.type === 'student' && permission === 'IsStudent';
}

async function redirect(
  req?: IncomingMessage,
  res?: ServerResponse,
): Promise<void> {
  if (process.browser || !req)
    throw new Error('redirecting from the browser is unacceptable');
  await redirectToLogin(res, req.url);
}

export {
  getToken,
  authenticate,
  applyPermission,
  hasPermission,
};
