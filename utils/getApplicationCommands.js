module.exports = async (client)=>{
        let globalCommands = await client.application.commands.fetch();
        return globalCommands;
}