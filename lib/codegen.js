const clear = require('clear');
const file_utils = require('./files');
const {console_output} = require("./cli_output");
const cli_input = require('./cli_input');

module.exports = {
    // Generates the config for the app 
    setup_config: async () => {
        let rapid_config = {
            "app_name":"",              // React App name 
            "app_layout": "",           // Layout for the app 
            "routes":[],                // Routes to add in project (will be added on sidebar)
            "state":[],                 // Redux state for the app 
            "components":[],            // Components to include in project 
            "dependencies":[],          // NPM packages to install 
            "login_type":""             // Standard (username,password) / federated (google,facebook)  
        };
    
        clear();
        console_output("auto-stack",'cyan', true);
    
        const app_name = await cli_input.askAppName();
        rapid_config = { ...rapid_config, ...app_name };

        const routes = await cli_input.askAppRoutes();
        rapid_config = {
            ...rapid_config, 
            routes: [
                 ...rapid_config.routes,
                 ...routes
            ]
        };

        const app_state = await cli_input.askAppState();
        rapid_config = {
            ...rapid_config,
            state: [
                ...rapid_config.state,
                ...app_state['state']
            ]
        };

        const app_layout = await cli_input.askAppLayout();
        rapid_config = {
            ...rapid_config,
            app_layout: app_layout['layout']
        };

        const components = await cli_input.askAppComponents();
        rapid_config = {
            ...rapid_config,
            components: [
                ...rapid_config.components,
                ...components['components']
           ]
        };

        const login_type = await cli_input.askLogin();
        rapid_config = {
            ...rapid_config,
            login_type: login_type
        };

        const config_data = JSON.stringify(rapid_config,null, "\t");
        file_utils.writeFile('rapid-config.json',config_data);
        console_output("Generated config file successfully",'green');
    },

    // Creates the react app 
    create_react_app: async () => {

    },

    // Cleanes default boilerplate provided by react
    clean_react_app: async () => {

    },

    // Generate the app routes
    generate_app_routes: async () => {

    },

    // Generate the app components
    generate_app_components: async () => {

    },

    // Generate the app state 
    generate_app_state: async () => {

    },

    // install npm packages
    install_dependencies: async () => {

    },

    // Start dev server 
    start_server: async () => {
    
    },
}



