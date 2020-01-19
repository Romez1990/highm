import { ServerResponse } from 'http';
import Router from 'next/router';
import RedirectionError from './RedirectionError';

async function redirectTo(
  url: string,
  res?: ServerResponse,
  replace = true,
): Promise<void> {
  if (process.browser) {
    if (replace) await Router.replace(url);
    else await Router.push(url);
  } else {
    if (typeof res === 'undefined')
      throw new RedirectionError('ServerResponse is required in the server');

    if (!replace)
      throw new RedirectionError('Cannot push history in the server');

    res.writeHead(302, {
      Location: url,
    });
    res.end();
  }
}

async function redirectToLogin(
  res?: ServerResponse,
  redirectBackUrl?: string,
  replace = true,
): Promise<void> {
  const url = resolveLoginPath(redirectBackUrl);
  await redirectTo(url, res, replace);
}

function resolveLoginPath(redirectBackUrl?: string): string {
  let url = '/login';
  if (
    typeof redirectBackUrl !== 'undefined' &&
    redirectBackUrl !== '/' &&
    !redirectBackUrl.startsWith('/login')
  ) {
    url += `?redirect-to=${redirectBackUrl}`;
  }
  return url;
}

export { redirectTo, redirectToLogin, resolveLoginPath };
