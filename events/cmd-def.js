function commandDefinition(clientID, guildID, discordToken) {
    const {
        SlashCommandBuilder
    } = require('@discordjs/builders');
    const {
        REST
    } = require('@discordjs/rest');
    const {
        Routes
    } = require('discord-api-types/v10');

    const commands = [
        new SlashCommandBuilder().setName('명령어')
            .setDescription('블라썸봇 전체 명령어 목록'),
    ].map(command => command.toJSON());

    const rest = new REST({
        version: '10'
    }).setToken(discordToken);

    rest.put(Routes.applicationGuildCommands(clientID, guildID), {
        body: commands
    })
        .then(() => console.log('Successfully registered application commands_definition.'))
        .catch(console.error);
}

module.exports = commandDefinition;