const scriptName = process.argv[2];

// eslint-disable-next-line import/no-dynamic-require
require(`../../scripts/${scriptName}`);
