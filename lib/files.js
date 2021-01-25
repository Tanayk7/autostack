const fs = require('fs');
const path = require('path');

module.exports = {
    getCurrentDirectoryBase: () => {
      return path.basename(process.cwd());
    },
  
    directoryExists: (filePath) => {
      return fs.existsSync(filePath);
    },

    readFile: (file_path) => {
      return fs.readFileSync(file_path);
    },

    writeFile: (file_path,content) => {
      try{
        fs.writeFileSync(file_path,content);
      }
      catch(err){
        console.log(err);
      }
    },

    deleteFile: (path) => {
      try {
        fs.unlinkSync(path)
      } catch(err) {
        console.error(err)
      }
    },
  };