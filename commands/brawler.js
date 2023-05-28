import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {memberService} from "../services/index.js";

import config from "../config/index.js";

const embed = (member) => {

    return new EmbedBuilder()
        .setColor(0x2ECC70)
        .setTitle(`${member.member_name}`)
        .setURL(`http://blossomstats.site/brawler/${member.member_id.replace("#", "")}`)
        .setDescription(member.member_id)
        .setThumbnail(`attachment://brawler_${member.brawler_id}.webp`)
        .addFields({
            name: `브롤러 정보`,
            value: `${config.powerPoint} \`파워 레벨 : ${member.power}\``
        }, {
            name: `${config.trophyEmoji} 현재 트로피(최고 트로피)`,
            value: `${config.trophyLeagueRank[parseInt(member.trophy_rank) - 1].icon}\`${member.trophy_current}개(${member.trophy_highest}개)\``
        }, {
            name: `${config.trophyLeagueEmoji} 트로피 리그 매치 및 승률`,
            value: `${config.accountEmoji}\`매치 : ${member.match_trophy}회 / 승률 : ${member.victory_trophy > 0 ?
                Math.floor(member.victory_trophy / (member.victory_trophy + member.defeat_trophy) * 100) : 0}%\``
        }, {
            name: `${config.powerLeagueEmoji} 파워 리그 매치 및 승률`,
            value: `${config.accountEmoji}\`매치 : ${member.match_league}회 / 승률 : ${member.victory_league > 0 ?
                Math.floor(member.victory_league / (member.victory_league + member.defeat_league) * 100) : 0}%\``
        }).toJSON();
}

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
                attachment: `${config.public}/brawler_profile/${memberBrawler.brawler_id}.webp`,
                name: `brawler_${memberBrawler.brawler_id}.webp`
            }]
        });
    }
}

export default brawlerCommand;