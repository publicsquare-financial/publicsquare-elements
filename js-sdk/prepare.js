const fs = require('fs');
const libPackage = require('./package.json');

// remove not required fields
delete libPackage.devDependencies;
delete libPackage['size-limit'];
delete libPackage.prettier;

// use only required temporary script in dist
libPackage.scripts = {
  postversion: 'cd .. && node bump.js',
};

// include all 'dist/*' files, but bundles
libPackage.files = ['*', '!*.bundle.js'];

// updates source flags removing 'dist' path
['main', 'module', 'types'].forEach((prop) => {
  libPackage[prop] = libPackage[prop].replace('dist/', '');
});

fs.mkdirSync('./dist', { recursive: true });
fs.copyFileSync('README.md', './dist/README.md');
fs.writeFileSync(
  './dist/package.json',
  JSON.stringify(libPackage, undefined, 2)
);