import { IncomingMessage, ServerResponse } from 'http';
import { parse, serialize } from 'cookie';
import { Option, fromNullable } from 'fp-ts/lib/Option';
import CookieError from './CookieError';

const CookieService = {
  get,
  set,
  remove,
};

function get(name: string, req?: IncomingMessage): Option<string> {
  checkServerArg(req);
  const cookies = parseCookie(req);
  return fromNullable(cookies[name]);
}

function set(name: string, value: string, res?: ServerResponse): void {
  checkServerArg(res);
  const cookie = serialize(name, value);
  updateCookie(cookie, res);
}

function remove(name: string, res?: ServerResponse): void {
  checkServerArg(res);
  const cookie = serialize(name, '', {
    maxAge: 0,
  });
  updateCookie(cookie, res);
}

function parseCookie(
  req: IncomingMessage | undefined,
): Record<string, string | undefined> {
  return parse(
    typeof req !== 'undefined' ? req.headers?.cookie ?? '' : document.cookie,
  );
}

function updateCookie(cookie: string, res: ServerResponse | undefined): void {
  if (typeof res !== 'undefined') {
    res.setHeader('Set-Cookie', cookie);
  } else {
    document.cookie = cookie;
  }
}

function checkServerArg(
  arg: IncomingMessage | ServerResponse | undefined,
): void {
  if (!process.browser && typeof arg === 'undefined')
    throw new CookieError('Second arg not passed on the server');
}

export default CookieService;
