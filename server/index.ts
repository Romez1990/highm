import express from 'express';
import next from 'next';

(async () => {
  const port = process.env.PORT || '3000';
  const dev = process.env.NODE_ENV !== 'production';

  const app = next({ dev });
  const handle = app.getRequestHandler();
  await app.prepare();
  const server = express();

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
