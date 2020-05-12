const fs = require('fs').promises;

async function main() {
  await fs.copyFile(
    'scripts/patch-formik/formik.esm.js',
    'node_modules/formik/dist/formik.esm.js',
  );
}

main();
