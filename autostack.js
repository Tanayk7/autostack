#!/usr/bin/env node
const clui = require('clui');
const codegen = require('./lib/codegen');

(async () => {
    await codegen.setup_config();
})();


