import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {brawlerService} from "../services/index.js";

import config from "../config/index.js";


const embed = (brawler) => {
    const spacePlace = (text) => {
        const length = text.length;
        let space = ``;
        for (let i = 0; i < 10 - (length * 2); i++) {
            space += ` `;
        }
        return space;
    }

    return new EmbedBuilder()
        .setColor(0x2ECC70)
        .setDescription(`${config.megaboxEmoji} **랜덤 브롤러 뽑기**`)
        .setThumbnail(`attachment://${brawler.id}.webp`)
        .addFields({
            name: `${brawler.icon} ${brawler.name}`,
            value:
                `${config.rarityList.find((item) => {
                    return item.name === brawler.rarity
                }).icon} \`${brawler.rarity}${spacePlace(brawler.rarity)}\`\n${config.classesList.find((item) => {
                    return item.name === brawler.class
                }).icon} \`${brawler.class}${spacePlace(brawler.class)}\`\n${config.genderList.find((item) => {
                    return item.name === brawler.gender
                }).icon} \`${brawler.gender}${spacePlace(brawler.gender)}\``
        }).toJSON();
}

const randomCommand = {
    data: new SlashCommandBuilder()
        .setName('뽑기')
        .setDescription('랜덤 브롤러 뽑기')
        .addStringOption((option) =>
            option
                .setName('희귀도')
                .setDescription('희귀도를 설정합니다.')
                .addChoices(
                    {name: "희귀", value: "희귀"},
                    {name: "초희귀", value: "초희귀"},
                    {name: "영웅", value: "영웅"},
                    {name: "신화", value: "신화"},
                    {name: "전설", value: "전설"},
                    {name: "크로마틱", value: "크로마틱"})
                .setRequired(false))
        .addStringOption((option) =>
            option
                .setName('역할군')
                .setDescription('역할군을 설정합니다.')
                .addChoices(
                    {name: "대미지 딜러", value: "대미지 딜러"},
                    {name: "탱커", value: "탱커"},
                    {name: "투척수", value: "투척수"},
                    {name: "저격수", value: "저격수"},
                    {name: "컨트롤러", value: "컨트롤러"},
                    {name: "어쌔신", value: "어쌔신"},
                    {name: "서포터", value: "서포터"})
                .setRequired(false))
        .addStringOption((option) =>
            option
                .setName('성별')
                .setDescription('성별을 설정합니다.')
                .addChoices(
                    {name: "남성", value: "남성"},
                    {name: "여성", value: "여성"})
                .setRequired(false)
        ).toJSON(),
    async execute(interaction) {
        const options = interaction.options;

        const rarityOption = options.getString("희귀도") !== null ? options.getString("희귀도") : "%%";
        const classOption = options.getString("역할군") !== null ? options.getString("역할군") : "%%";
        const genderOption = options.getString("성별") !== null ? options.getString("성별") : "%%";

        const result = await brawlerService.selectBrawler(rarityOption, classOption, genderOption);
        const randomNumber = Math.floor(Math.random() * result.length + 1);
        const randomBrawler = result[randomNumber];

        await interaction.reply({
            embeds: [await embed(randomBrawler)],
            files: [{
                attachment: `${config.public}/brawler_profile/${randomBrawler.id}.webp`,
                name: `${randomBrawler.id}.webp`
            }]
        });
    }
}

export default randomCommand;