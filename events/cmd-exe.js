const command = require('../commands/command');

function commandsExecution(interaction) {
    if (!interaction.isCommand()) return;

    const {
        commandName
    } = interaction;

    if (commandName === '명령어') {
        interaction.channel.send({
            embeds: [command]
        });
    }
}

module.exports = commandsExecution;