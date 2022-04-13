const replace = require('replace-in-file');
const pkg = require('../package');
const options = {
  files: ['lib/index.js', 'es/index.js'],
  from: '$$EMIT_BOX_VERSION$$',
  to: pkg.version,
};
return replace(options);