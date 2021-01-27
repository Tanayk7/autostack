const child_process = require('child_process');

module.exports = {
    shell_commands: {
        create_react_app: "create-react-app",
        start_server: "npm start",
        install_dependencies: "npm install",
    },

    execute_command : (command) => {
        const options = {
            // detached: true,
            // stdio: 'ignore',
            stdio: 'inherit',
            shell: true
        }
        const process = child_process.spawnSync(command,options);
    
        if(process.status == 0){
            console.log("Process executed successfully");
        }
        else{
            throw "Exception: Some error occured while executing process"; 
        }
    }
};

