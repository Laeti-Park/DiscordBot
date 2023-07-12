import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {memberService} from "../services/index.js";

import config from "../config/index.js";

const embed = (member) => {
    const roman = ["I", "II", "III"];

    return new EmbedBuilder()
        .setColor(0x2ECC70)
        .setTitle(member.MEMBER_NM)
        .setURL(`https://blossomstats.site/member/${member.MEMBER_ID.replace("#", "")}`)
        .setDescription(member.MEMBER_ID)
        .setThumbnail(`attachment://${member.MEMBER_PROFILE}.webp`)
        .addFields({
            name: `${config.trophyLeagueEmoji} 현재(최고) 트로피`,
            value: `\`${member.TROPHY_CUR}개(${member.TROPHY_HGH}개)\``
        }, {
            name: `${config.powerLeagueSoloMode} 솔로 현재(최고) 랭크`,
            value: `${config.powerLeagueRank[Math.floor(member.PL_SL_CUR / 3)].icon}${roman[member.PL_SL_CUR % 3]}(${config.powerLeagueRank[Math.floor(member.PL_SL_HGH / 3)].icon}${roman[member.PL_SL_HGH % 3]})`
        }, {
            name: `${config.powerLeagueTeamMode} 팀 현재(최고) 랭크`,
            value: `${config.powerLeagueRank[Math.floor(member.PL_TM_CUR / 3)].icon}${roman[member.PL_TM_CUR % 3]}(${config.powerLeagueRank[Math.floor(member.PL_TM_HGH / 3)].icon}${roman[member.PL_TM_HGH % 3]})`
        }).toJSON();
};

const profileCommand = {
    data: new SlashCommandBuilder().setName("프로필")
        .setDescription("플레이어의 프로필 정보를 보여준다.")
        .addStringOption((option) =>
            option
                .setName("닉네임")
                .setDescription("닉네임을 설정합니다.")
                .setRequired(true))
        .toJSON(),
    async execute(interaction) {
        const options = interaction.options;

        const name = options.getString("닉네임") !== null ? options.getString("닉네임") : "";
        const member = await memberService.selectMember(name);

        await interaction.reply({
            embeds: [await embed(member)],
            files: [{
                attachment: `${config.public}/profile_pictures/${member.MEMBER_PROFILE}.webp`,
                name: `${member.MEMBER_PROFILE}.webp`
            }]
        });
    }
};

export default profileCommand;