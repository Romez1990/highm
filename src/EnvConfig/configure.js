const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({
  path: fs.existsSync('./.env') ? './.env' : './.env.example',
});
