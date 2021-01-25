const figlet = require('figlet');
const chalk = require('chalk');

const figlet_options = { 
    horizontalLayout: 'full',
    // font: 'Ghost',
    // width: 80
};

const output_colors = {
    'white': chalk.white,
    "green": chalk.green,
    'cyan': chalk.cyan,
    'yellow': chalk.yellow,
    'red': chalk.red
}

module.exports = {
    console_output: (text="",color="white",use_figlet=false,options=figlet_options) => {
        if(!Object.keys(output_colors).includes(color)){
            console.log("Invalid color specified!");
            return;
        }
        if(use_figlet){
            console.log(output_colors[color](figlet.textSync(text,options)));
        }
        else{
            console.log(output_colors[color](text));
        }
    }  
};