const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const cloneAndSquash = require('./cloneAndSquash');

if (!argv.source || !argv.dest) {
    console.log('Both source (--source) and destination (--dest) must be provided as arguments.');
    process.exit(1);
}

const skipClone = !!argv.skipClone;

cloneAndSquash(argv.source, argv.dest, skipClone);
