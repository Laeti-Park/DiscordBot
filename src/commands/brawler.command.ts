import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { userService } from '~/services/user.service';

import config from '~/config/config';

const embed = (user) => {
  return new EmbedBuilder()
    .setColor(0x2ecc70)
    .setTitle(`${user.MEMBER_NM}`)
    .setURL(
      `https://blossomstats.site/brawler/${user.MEMBER_ID.replace('#', '')}`,
    )
    .setDescription(user.MEMBER_ID)
    .setThumbnail(`attachment://brawler_${user.BRAWLER_ID}.webp`)
    .addFields(
      {
        name: `브롤러 정보`,
        value: `${config.powerPoint} \`파워 레벨 : ${user.BRAWLER_PWR}\``,
      },
      {
        name: `${config.trophyEmoji} 현재 트로피(최고 트로피)`,
        value: `${
          config.trophyLeagueRank[parseInt(user.TROPHY_RNK) - 1].icon
        }\`${user.TROPHY_CUR}개(${user.TROPHY_HGH}개)\``,
      },
      {
        name: `${config.trophyLeagueEmoji} 트로피 리그 매치 및 승률`,
        value: `${config.accountEmoji}\`매치 : ${
          user.MATCH_CNT_TL
        }회 / 승률 : ${
          user.MATCH_CNT_VIC_TL > 0
            ? Math.floor(
                (user.MATCH_CNT_VIC_TL /
                  (user.MATCH_CNT_VIC_TL + user.MATCH_CNT_DEF_TL)) *
                  100,
              )
            : 0
        }%\``,
      },
      {
        name: `${config.powerLeagueEmoji} 파워 리그 매치 및 승률`,
        value: `${config.accountEmoji}\`매치 : ${
          user.MATCH_CNT_PL
        }회 / 승률 : ${
          user.MATCH_CNT_VIC_PL > 0
            ? Math.floor(
                (user.MATCH_CNT_VIC_PL /
                  (user.MATCH_CNT_VIC_PL + user.MATCH_CNT_DEF_PL)) *
                  100,
              )
            : 0
        }%\``,
      },
    )
    .toJSON();
};

export const brawlerCommand = {
  data: new SlashCommandBuilder()
    .setName('브롤러')
    .setDescription('플레이어의 브롤러 정보를 보여준다.')
    .addStringOption((option) =>
      option
        .setName('닉네임')
        .setDescription('닉네임을 설정합니다.')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('브롤러')
        .setDescription('브롤러를 설정합니다.')
        .setRequired(true),
    )
    .toJSON(),
  async execute(interaction) {
    const options = interaction.options;

    const name =
      options.getString('닉네임') !== null ? options.getString('닉네임') : '';
    const brawler =
      options.getString('브롤러') !== null ? options.getString('브롤러') : '%%';
    const userBrawler = await userService.selectUserBrawler(name, brawler);

    await interaction.reply({
      embeds: [embed(userBrawler)],
      files: [
        {
          attachment: `${config.cdnURL}/brawlers/profile/${userBrawler.id}.webp`,
          name: `${userBrawler.id}.webp`,
        },
      ],
    });
  },
};
