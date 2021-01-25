const isAlphaNumeric = (str) => {
    var code, i, len;
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code > 64 && code < 91) && // upper alpha (A-Z)
          !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
};

module.exports = { 
    print_obj: (obj) => {
        Object.keys(obj).forEach(key => {
            console_output(`${key} : ${obj[key]}`,'cyan');
        });
    },

    input_validator_default: (value) => {
        if(value.length){
            if(!isAlphaNumeric(value)){
                return "App name must not contain special characters or spaces";
            }
            else if(value != value.toLowerCase()){
                return "App name must be lowercase";
            }
            return true;
        }else{
            return "App name must not be empty";
        }
    },

    yes_no_validator: (value) => {
        if(value.length == 1 && value == 'y' || value == 'n' || value == 'Y' || value == 'N'){
            return true;
        } 
        return "Please enter 'y/Y' for yes and 'n/N' for no";
    }
};

 