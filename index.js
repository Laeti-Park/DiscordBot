import {
    Client, GatewayIntentBits
} from "discord.js";
import {config} from "dotenv";
import {REST} from "@discordjs/rest";
import {Routes} from "discord-api-types/v10";

import {
    sequelize
} from '../blossom-web-backend/models/index.js';

import commandDefinition from "./events/command_definition.js";
import commandExecution from "./events/command_execution.js";

config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const {
    clientID,
    guildID,
    discordToken,
} = {
    clientID: process.env.CLIENT_ID,
    guildID: process.env.GUILD_ID,
    discordToken: process.env.DISCORD_TOKEN,
};

const rest = new REST({
    version: '10'
}).setToken(discordToken);

rest.put(Routes.applicationGuildCommands(clientID, guildID), {
    body: commandDefinition
}).then(() => {
    console.log('Successfully registered application commands_definition.')
}).catch(err => {
    console.error(err)
});

sequelize.sync({
    force: false
}).then(() => {
    console.log("DB 연결 성공");
}).catch((err) => {
    console.error(err);
});

client.on('interactionCreate', async interaction => {
    const {options} = interaction;

    if (interaction.isChatInputCommand()) {
        interaction.reply(await commandExecution(interaction.commandName, interaction.user.username, options));
    }
}).login(discordToken).then(() => {
    console.log('[System] Blossom Bot Login Success! es laetus :)');
}).catch(err => {
    console.log('[System] Blossom Bot Login Failed!');
    console.log(err);
});