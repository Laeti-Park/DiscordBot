import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {memberService} from "../services/index.js";

import config from "../config/index.js";

const embed = (member) => {

    return new EmbedBuilder()
        .setColor(0x2ECC70)
        .setTitle(`${member.MEMBER_NM}`)
        .setURL(`http://blossomstats.site/brawler/${member.MEMBER_ID.replace("#", "")}`)
        .setDescription(member.MEMBER_ID)
        .setThumbnail(`attachment://brawler_${member.BRAWLER_ID}.webp`)
        .addFields({
            name: `브롤러 정보`,
            value: `${config.powerPoint} \`파워 레벨 : ${member.BRAWLER_PWR}\``
        }, {
            name: `${config.trophyEmoji} 현재 트로피(최고 트로피)`,
            value: `${config.trophyLeagueRank[parseInt(member.TROPHY_RNK) - 1].icon}\`${member.TROPHY_CUR}개(${member.TROPHY_HGH}개)\``
        }, {
            name: `${config.trophyLeagueEmoji} 트로피 리그 매치 및 승률`,
            value: `${config.accountEmoji}\`매치 : ${member.MATCH_CNT_TL}회 / 승률 : ${member.MATCH_CNT_VIC_TL > 0 ?
                Math.floor(member.MATCH_CNT_VIC_TL / (member.MATCH_CNT_VIC_TL + member.MATCH_CNT_DEF_TL) * 100) : 0}%\``
        }, {
            name: `${config.powerLeagueEmoji} 파워 리그 매치 및 승률`,
            value: `${config.accountEmoji}\`매치 : ${member.MATCH_CNT_PL}회 / 승률 : ${member.MATCH_CNT_VIC_PL > 0 ?
                Math.floor(member.MATCH_CNT_VIC_PL / (member.MATCH_CNT_VIC_PL + member.MATCH_CNT_DEF_PL) * 100) : 0}%\``
        }).toJSON();
};

const brawlerCommand = {
    data: new SlashCommandBuilder()
        .setName('브롤러')
        .setDescription('플레이어의 브롤러 정보를 보여준다.')
        .addStringOption((option) =>
            option
                .setName('닉네임')
                .setDescription('닉네임을 설정합니다.')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('브롤러')
                .setDescription('브롤러를 설정합니다.')
                .setRequired(true)).toJSON(),
    async execute(interaction) {
        const options = interaction.options;

        const name = options.getString("닉네임") !== null ? options.getString("닉네임") : "";
        const brawler = options.getString("브롤러") !== null ? options.getString("브롤러") : "%%";
        const memberBrawler = await memberService.selectMemberBrawler(name, brawler);
        console.log(memberBrawler)

        await interaction.reply({
            embeds: [await embed(memberBrawler)],
            files: [{
                attachment: `${config.public}/brawler_profile/${memberBrawler.BRAWLER_ID}.webp`,
                name: `brawler_${memberBrawler.BRAWLER_ID}.webp`
            }]
        });
    }
};

export default brawlerCommand;