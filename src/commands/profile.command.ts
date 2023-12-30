import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { userService } from '~/services/user.service';

import config from '~/config/config';

const embed = (user) => {
  const roman = ['I', 'II', 'III'];

  return new EmbedBuilder()
    .setColor(0x2ecc70)
    .setTitle(user.name.replace(/<\(.*\)>/, ''))
    .setURL(`https://brawlstats.me/brawlian/${user.id.replace('#', '')}`)
    .setDescription(user.id)
    .setThumbnail(`attachment://${user.profileIcon}.webp`)
    .addFields(
      {
        name: `${config.trophyLeagueEmoji} 현재(최고) 트로피`,
        value: `\`${user.currentTrophies}개(${user.highestTrophies}개)\``,
      },
      {
        name: `${config.powerLeagueSoloMode} 솔로 현재(최고) 랭크`,
        value: `${
          config.powerLeagueRank[Math.floor(user.currentSoloPL / 3)].icon
        }${roman[user.currentSoloPL % 3]}(${
          config.powerLeagueRank[Math.floor(user.highestSoloPL / 3)].icon
        }${roman[user.highestSoloPL % 3]})`,
      },
      {
        name: `${config.powerLeagueTeamMode} 팀 현재(최고) 랭크`,
        value: `${
          config.powerLeagueRank[Math.floor(user.currentTeamPL / 3)].icon
        }${roman[user.currentTeamPL % 3]}(${
          config.powerLeagueRank[Math.floor(user.highestTeamPL / 3)].icon
        }${roman[user.highestTeamPL % 3]})`,
      },
    )
    .toJSON();
};

export const profileCommand = {
  data: new SlashCommandBuilder()
    .setName('프로필')
    .setDescription('플레이어의 프로필 정보를 보여준다.')
    .addStringOption((option) =>
      option
        .setName('태그')
        .setDescription('태그를 설정합니다.')
        .setRequired(true),
    )
    .toJSON(),
  async execute(interaction) {
    const options = interaction.options;

    const name =
      options.getString('태그') !== null ? options.getString('태그') : '';
    const result = await userService.selectUser(name);
    const member = result.profile;

    await interaction.reply({
      embeds: [embed(member)],
      files: [
        {
          attachment: `${config.cdnURL}/brawlian/profile/${member.profileIcon}.webp`,
          name: `${member.profileIcon}.webp`,
        },
      ],
    });
  },
};
