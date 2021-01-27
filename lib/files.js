const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

module.exports = {
    getCurrentDirectoryBase: () => {
      return path.basename(process.cwd());
    },
  
    directoryExists: (filePath) => {
      return fs.existsSync(filePath);
    },

    list_files: (dir_path) => {
      try{
        let file_names = fs.readdirSync(dir_path);
        return file_names;
      }
      catch(err){
        console.log(err);
        return err;
      }
    },

    copy_directory: (srcDir,destDir) => {
      try{
        fse.copySync(srcDir, destDir,{ overwrite: true });
      }
      catch(err){
        console.log(err);
      }
    },

    move_directory: (srcDir,destDir) => {
      try{
        fse.moveSync(srcDir, destDir,{ overwrite: true });
      }
      catch(err){
        console.log(err)
      }
    },

    create_directory: (dir_path) => {
      try{
        fs.mkdirSync(dir_path);
      }
      catch(err){
        console.log(err);
      }
    },

    delete_directory: (dir_path) => {
      try{
        fs.rmdirSync(dir_path, {recursive: true});
      }
      catch(err){
        console.log(err);
      }
    },

    readFile: (file_path) => {
      return fs.readFileSync(file_path,{encoding:'utf8'});
    },

    writeFile: (file_path,content="") => {
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