import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {memberService} from "../services/index.js";

import config from "../config/index.js";

const embed = (member) => {
    const roman = ['I', 'II', 'III'];

    return new EmbedBuilder()
        .setColor(0x2ECC70)
        .setTitle(member.name)
        .setURL(`http://blossomstats.site/member/${member.id.replace("#", "")}`)
        .setDescription(member.id)
        .setThumbnail(`attachment://${member.profile_picture}.webp`)
        .addFields({
            name: `${config.trophyLeagueMode} 현재(최고) 트로피`,
            value: `\`${member.trophy_current}개(${member.trophy_highest}개)\``
        }, {
            name: `${config.powerLeagueSoloMode} 솔로 현재(최고) 랭크`,
            value: `${config.powerLeagueRank[Math.floor(member.league_solo_current / 3)].icon}${roman[member.league_solo_current % 3]}(${config.powerLeagueRank[Math.floor(member.league_solo_highest / 3)].icon}${roman[member.league_solo_highest % 3]})`
        }, {
            name: `${config.powerLeagueTeamMode}팀 현재(최고) 랭크`,
            value: `${config.powerLeagueRank[Math.floor(member.league_team_current / 3)].icon}${roman[member.league_team_current % 3]}(${config.powerLeagueRank[Math.floor(member.league_team_highest / 3)].icon}${roman[member.league_team_highest % 3]})`
        }).toJSON();
}

const profileCommand = {
    data: new SlashCommandBuilder().setName('프로필')
        .setDescription('플레이어의 프로필 정보를 보여준다.')
        .addStringOption((option) =>
            option
                .setName('닉네임')
                .setDescription('닉네임을 설정합니다.')
                .setRequired(true))
        .toJSON(),
    async execute(interaction) {
        const options = interaction.options;

        const name = options.getString("닉네임") !== null ? options.getString("닉네임") : "";
        const member = await memberService.selectMember(name);

        await interaction.reply({
            embeds: [await embed(member)],
            files: [{
                attachment: `${config.public}/profile_pictures/${member.profile_picture}.webp`,
                name: `${member.profile_picture}.webp`
            }]
        });
    }
}

export default profileCommand;