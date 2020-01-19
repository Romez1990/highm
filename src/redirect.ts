import { ServerResponse } from 'http';
import Router from 'next/router';

async function redirectTo(
  url: string,
  res?: ServerResponse,
  replace: boolean = true,
): Promise<void> {
  if (process.browser) {
    if (replace)
      await Router.replace(url);
    else
      await Router.push(url);
  } else {
    if (!res)
      throw new Error('redirectTo without ServerResponse cannot be called in the server');

    if (!replace)
      throw new Error('cannot push history in the server');

    res.writeHead(302, {
      Location: url,
    });
    res.end();
  }
}

async function redirectToLogin(
  res?: ServerResponse,
  redirectBackUrl?: string,
  replace: boolean = true,
): Promise<void> {
  let url = '/login';
  if (redirectBackUrl)
    url += `?redirect-to=${redirectBackUrl}`;
  await redirectTo(url, res, replace);
}

export {
  redirectTo,
  redirectToLogin,
};
