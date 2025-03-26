```javascript
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const cloneAndSquash = require('./cloneAndSquash');

if (!argv.source || !argv.dest) {
    console.log('Both source (--source) and destination (--dest) must be provided as arguments.');
    process.exit(1);
}

cloneAndSquash(argv.source, argv.dest);
```
