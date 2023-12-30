import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import commands from '~/commands/index';

import config from '~/config/config';

export const client = async () => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });
  const [commandsDefinition, commandsExecution] = commands();
  client['commands'] = commandsExecution;

  const rest = new REST().setToken(config.discordToken);

  await (async () => {
    try {
      await rest.put(Routes.applicationCommands(config.clientID), {
        body: commandsDefinition,
      });
    } catch (error) {
      console.error(error);
    }
  })();

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client['commands'].get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error, new Date().toLocaleString('ko-KR'));
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: '해당 명령에 오류가 있습니다. 관리자에게 알려주세요! 😵',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: '해당 명령에 오류가 있습니다. 관리자에게 알려주세요! 😵',
          ephemeral: true,
        });
      }
    }
  });

  client
    .login(config.discordToken)
    .then(() => {
      console.log('🌸BLOSSOM BOT LOGIN SUCCESS!');
    })
    .catch((err) => {
      console.log(
        '🌸BLOSSOM BOT LOGIN FAILED!',
        new Date().toLocaleString('ko-KR'),
      );
      console.log(err);
    });
};
