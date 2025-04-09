module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;

        const words = message.content.trim().split(' ');

        if (words[0] === "I'm") {
            var mas = message.content.substring(4);
            await message.channel.send(`Hi ${mas}, I'm dad.`);
        }
    });
};
