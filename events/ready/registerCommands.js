const getApplicationCommands = require("../../utils/getApplicationCommands")
const getLocalCommands = require("../../utils/getLocalCommands")
const areCommandsDifferent = require("../../utils/areCommandsDifferent");

module.exports = async (client )=>{


    try {

    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client);

    for (const localCommand of localCommands){
        const { name , description , options} = localCommand;

       const existingCommand = await applicationCommands.find(
                (cmd) => cmd.name === name
            )
       if (existingCommand) {
    if (localCommand.delete) {
        await client.application.commands.delete(localCommand);
        console.log(`Deleted the command with the name ${existingCommand.name}`);
        continue;
    }

    if (areCommandsDifferent(existingCommand, localCommand)) {
        await client.application.commands.edit(existingCommand.id, {
      description,
      options,
    });
        console.log(`Edited the command with the name ${existingCommand.name}`);
    }

} else {
    if (localCommand.delete) {
        console.log(`Skipping adding command with name: ${name}`);
        continue;
    }

  await client.application.commands.create(localCommand);
    console.log(`Registered command with name ${name}`);
}


    }

        
    } catch (error) {
        console.error(error);
        
    }

    
}