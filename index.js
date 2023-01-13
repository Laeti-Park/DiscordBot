const {
    Client, GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

require('dotenv').config();
const {
    clientID,
    guildID,
    discordToken,
} = {
    clientID: process.env.CLIENT_ID,
    guildID: process.env.GUILD_ID,
    discordToken: process.env.DISCORD_TOKEN,
};

const commandDefinition = require('./events/cmd-def');
const commandExecution = require('./events/cmd-exe');

commandDefinition(clientID, guildID, discordToken);
client.on('interactionCreate', async interaction => {
    commandExecution(interaction);
});

client.login(discordToken)
    .then(() => {
        console.log('[System] Blossom Bot Login Success!');
        console.log('[System] Blossom Bot is running, es laetus :)');
    })
    .catch(r => {
        console.log('[System] Blossom Bot Login Failed!');
        console.log(r);
    });