const inquirer = require("inquirer");
const utils = require('./utils');

const state_list = ['ui',"login",'profile'];
const component_list = ['Checkbox','PasswordInput','Modal','Sidebar','Navbar','RadioGroup','all'];
const layout_list = ['sidebar_topbar_content','topbar_content','landingpage','empty'];
const dependencies = ['redux','react-redux','react-router-dom','redux-logger','redux-thunk','redux-persist','react-router-last-location'];

module.exports = {
    askAppName: () => {
        const question = {
            name: "app_name",
            type: "input",
            message: "Enter App name:",
            validate: utils.input_validator_default
        }
        return inquirer.prompt(question);
    },

    askAppRoutes: async () => {
        let add_more_routes = true;
        let output = [];

        const question = {
            name: "app_route",
            type: "input",
            message: "Enter route name: ",
            validate: utils.input_validator_default   
        };
        const question2 = {
            name: "yes_no",
            type: "input",
            message: "Add more routes (y/n): ",
            validate: utils.yes_no_validator
        };

        while(add_more_routes){
            let route_response = await inquirer.prompt(question);
            output.push(route_response['app_route']);

            let yes_no_response = await inquirer.prompt(question2);
            add_more_routes = yes_no_response['yes_no'] === 'y' || yes_no_response['yes_no'] === 'Y' ? true : false; 
        }
        return output;
    },

    askAppState: () => {
        const question = {
            type: 'checkbox',
            name: 'state',
            message: 'Select the redux app state you want to add (use space to select & enter to continue) :',
            choices: state_list,
            default: ['ui', 'login']
        }
        return inquirer.prompt(question);
    },

    askAppLayout: () => {
        const question = {
            type: "list",
            name: "layout",
            message: "Select app layout: ",
            choices: layout_list,  
        };
        return inquirer.prompt(question);
    },

    askAppComponents: () => {
        const question = {
            type: 'checkbox',
            name: 'components',
            message: 'Select the components you want to include in your project (use space to select & enter to continue) :',
            choices: component_list,
            default: ['all']
        }
        return inquirer.prompt(question);
    },

    askLogin: async () => {
        const question = {
            name: "add_login",
            type: "input",
            message: "Do you want to add a login system ? (y/n)",
            validate: utils.yes_no_validator
        };

        const question2 = {
            type: "list",
            name: "login_type",
            message: "Select login type: ",
            choices: ['standard','federated'],  
        };

        let yes_no_response = await inquirer.prompt(question);
        let add_login = yes_no_response['add_login'] === 'y' || yes_no_response['add_login'] === 'Y' ? true : false; 

        if(add_login){
            let login_type = await inquirer.prompt(question2);
            return login_type['login_type'];
        }

        return "none";
    }

  };