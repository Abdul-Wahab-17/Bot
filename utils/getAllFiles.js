const path = require(`path`);
const fs = require(`fs`);

module.exports = ( directory , onlyFolders = false )=>{
        let fileNames = fs.readdirSync(directory , {withFileTypes:true});
        let filePaths = [];

        for (const file of fileNames){
            
            if (onlyFolders){
                if (file.isDirectory()){
                    filePaths.push( path.join(directory , file.name));
                }
            }
            else {
                if (file.isFile()){
                    filePaths.push(path.join(directory , file.name));
                }
            }

        }

        return filePaths;
}