const clear = require('clear');
const file_utils = require('./files');
const {console_output} = require("./cli_output");
const cli_input = require('./cli_input');
const commands = require('./commands');
const files = require("./files");

let rapid_config = {
    "app_name":"",                      // React App name 
    "app_layout": "",                   // Layout for the app 
    "routes":[],                        // Routes to add in project (will be added on sidebar)
    "state":[],                         // Redux state for the app 
    "components":[],                    // Components to include in project 
    "dependencies":[                    // NPM packages to install 
        'redux',
        'react-redux',
        'react-router-dom',
        'redux-logger',
        'redux-thunk',
        'redux-persist',
        'react-router-last-location'
    ],  
    "login_type":"",                    // Standard (username,password) / federated (google,facebook)  
    'directories': {                    // Standard App directories 
        'app_root': './{}',
        'app_src': './{}/src',
        'app_components': './{}/src/Components',
        'app_routes': './{}/src/Routes',
        'app_state': "./{}/src/Redux",
        'app_apis': './{}/src/Apis',
        'app_assets': './{}/src/Assets',
        'app_utils': './{}/src/Utils'
    },
};

const console_colors = {
    'success': "green",
    "info": "cyan",
    "error": "red",
    "text": "white"
};

const create_react_component = (component_name,directory_path) => {
    // Create component directory
    let path = directory_path + "/" + component_name.capitalize();
    files.create_directory(path);

    // Create a jsx and css file 
    let jsx_file_path = path + "/" + component_name.capitalize() + ".jsx";
    let jsx_code = files.readFile('./templates/rfc_template.txt').toString();
    jsx_code = jsx_code.replaceAll("<component_name>",component_name);          // replace all occurences of placeholder

    let css_file_path = path + "/" + component_name.capitalize() + ".css";
    let css_code = files.readFile('./templates/css_template.txt');
    css_code = css_code.replace("<component_name>",component_name);             // replace the first occurence of placeholder

    // Populate jsx and css files with default code templates 
    files.writeFile(jsx_file_path,jsx_code);
    files.writeFile(css_file_path,css_code)
};


module.exports = {
    // Generates the config for the app 
    setup_config: async () => {
        // Clear the console and output CLI Name
        clear();
        console_output("auto-stack",'cyan', true);
        
        let common_components = files.list_files(__dirname + '/components');
        common_components = [...common_components,'all'];
        console.log(common_components);

        const app_name = await cli_input.askAppName();
        // Reaplce directory placeholder - {} with app name 
        Object.keys(rapid_config.directories).forEach(key => {
            rapid_config.directories[key] = rapid_config.directories[key].replace("{}",app_name['app_name']); 
        });
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

        const components = await cli_input.askAppComponents(common_components);
        let app_components = components['components']
        if(app_components.includes('all')){
            app_components = common_components;
        }
        rapid_config = {
            ...rapid_config,
            components: [
                ...rapid_config.components,
                ...app_components
           ]
        };
        console.log(rapid_config);

        const login_type = await cli_input.askLogin();
        rapid_config = {
            ...rapid_config,
            login_type: login_type
        };  

        console.log(rapid_config);

        const config_data = JSON.stringify(rapid_config,null, "\t");
        file_utils.writeFile('rapid-config.json',config_data);
        console_output("Generated config file successfully",'green');
    },

    // Creates the react app 
    create_react_app: () => {
        let command = commands.shell_commands.create_react_app + " " + rapid_config.app_name;
        try{
            commands.execute_command(command);
        }
        catch(err){
            console_output(err,console_colors.error);
        }
    },    

    // Create standard app directories
    create_app_directories: () => {
        let directories = ['app_components','app_state', 'app_routes', 'app_apis','app_assets','app_utils'];
        directories.forEach(directory => {
            let path = rapid_config.directories[directory];
            files.create_directory(path);
        });
    },

    // Cleanes default boilerplate provided by react
    clean_react_app: () => {
        let default_files = ['logo.svg', 'reportWebVitals.js','setupTests.js', 'App.test.js', 'App.js', 'App.css'];
        let src_path = rapid_config.directories.app_src + "/";

        // delete the auto-generated files 
        default_files.forEach(file => {
            let path = src_path + file;
            files.deleteFile(path);
        });

        // Replace app.js and app.css code with code from templates
        let app_js_code = files.readFile('./templates/app_js_template.txt');
        let app_css_code = files.readFile("./templates/css_template.txt");
        let app_js_path = src_path + "App.jsx";
        let css_path = src_path + "App.css";

        let app_js_imports = "";
        let app_js_routes = "";
        rapid_config.routes.forEach(route => {
            let route_name = route.capitalize();
            app_js_imports += `import ${route_name} from './Components/${route_name}/';\n`;
            app_js_routes += `<Route path='/${route.toLowerCase()}' component={${route_name}}/>\n`;
        });

        app_js_code = app_js_code.replace("<app_component_imports>",app_js_imports);
        app_js_code = app_js_code.replace("<app_routes>",app_js_routes);
        app_css_code = app_css_code.replace("<component_name>",'app');

        files.writeFile(app_js_path,app_js_code);
        files.writeFile(css_path,app_css_code);
    },

    // Generate the app routes
    generate_app_routes: () => {
        let routes = rapid_config.routes;
        let root_path = rapid_config.directories.app_routes;

        routes.forEach(route => {
            create_react_component(route,root_path);
        });
    },

    // Generate the app components
    generate_app_components: () => {
        let common_components = rapid_config.components;
        let root_path = rapid_config.directories.app_components;

        common_components.forEach(component => {
            let dest_dir_path = rapid_config.directories.app_components + "/common/" + component + '/';
            files.copy_directory(`./components/${component}`,dest_dir_path);
        });
    },

    // Generate the app state 
    generate_app_state: () => {
        let redux_files = ['reducer.js', 'actions.js', 'types.js']
        let root_files = ['rootReducer.js', 'index.js', 'store.js']
        let state_categories = rapid_config.state;
        let redux_path = rapid_config.directories.app_state + "/";

        // Create the state directories specified by user 
        state_categories.forEach(category => {
            let dir_path = redux_path + category.capitalize();
            files.create_directory(dir_path);

            redux_files.forEach(file => {
                let file_path = dir_path + "/" + file;
                files.writeFile(file_path);             // Writes empty string by default 
            })
        })

        // Create the root files 
        root_files.forEach(file => {
            let file_path = redux_path + file

            if(file === 'rootReducer.js'){
                let code_template = files.readFile('./templates/root_reducer_template.txt');
                let replace_identifiers = ["<import_state_category_reducers>","<state_category_reducer_key_values>"];
                let import_state_category_reducers = "";
                let state_category_reducer_key_values = "";

                state_categories.forEach(category => {
                    category_reducer = category.toLowerCase() + "Reducer"
                    import_state_category_reducers += `import ${category_reducer} from './${category.capitalize()}/reducer';\n`
                    state_category_reducer_key_values += `${category.toLowerCase()}:${category_reducer},\r`
                });
                
                code_template = code_template.replace(replace_identifiers[0], import_state_category_reducers)
                code_template = code_template.replace(replace_identifiers[1], state_category_reducer_key_values)

                files.writeFile(file_path,code_template);
            }
            else if(file == 'index.js'){
                let code_template = files.readFile("./templates/redux_index_template.txt");
                let replace_identifiers = ['<export_state_category_actions>'];
                let export_state_category_actions = ""

                state_categories.forEach(category => {
                    export_state_category_actions += `export * from './${category.capitalize()}/actions';\n`
                });

                code_template = code_template.replace(replace_identifiers[0], export_state_category_actions);

                files.writeFile(file_path,code_template);
            }
            else if(file == 'store.js'){
                let code_template = files.readFile('./templates/redux_store_template.txt');
                files.writeFile(file_path,code_template);
            }
        })            
    },

    // install npm packages
    install_dependencies: () => {
        let deps = "";
        rapid_config.dependencies.forEach(dep => {
            deps += dep + " ";
        });
        let command = commands.shell_commands.install_dependencies + " " + deps;

        try{
            commands.execute_command(command);
        }
        catch(err){
            console_output(err,console_colors.error);
        }
    },

    // Start dev server 
    start_server: () => {
        let command = commands.shell_commands.start_server;
        try{
            commands.execute_command(command);
        }
        catch(err){
            console_output(err,console_colors.error);
        }
    },
}