const getAllFiles = require(`../utils/getAllFiles.js`);
const path = require(`path`);

module.exports = (client)=>{
        let eventFolders = getAllFiles(path.join( __dirname , `..`  , `events`) , true );
    

    for (const eventFolder of eventFolders){
        let eventName = eventFolder.split(`/`).pop();
        let eventFunctions = getAllFiles(eventFolder );
        eventFunctions.sort( (a,b)=> a> b );

        client.on(eventName , async (args)=>{
            for (const eventFunction of eventFunctions){
                const func = require(eventFunction);
                await func(client , args);
            }
        })

       

    }

}