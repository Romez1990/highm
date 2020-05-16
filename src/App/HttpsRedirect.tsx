function HttpsRedirect(): null {
  if (!process.browser) return null;
  const { protocol, host, pathname, search } = window.location;
  if (process.env.USE_HTTPS && protocol === 'http:') {
    window.location.replace(`https://${host}${pathname}${search}`);
  }
  return null;
}

export default HttpsRedirect;
