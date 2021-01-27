#!/usr/bin/env node
const codegen = require('./lib/codegen');

(async () => {
    await codegen.setup_config();
    codegen.create_react_app();
    codegen.clean_react_app();
    codegen.create_app_directories();
    codegen.generate_app_routes();
    codegen.generate_app_components();
    codegen.generate_app_state();
    codegen.install_dependencies();
    codegen.start_server();
})();


