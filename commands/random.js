import {EmbedBuilder} from "discord.js";

import Brawler from "../../blossom-web-backend/models/brawler.js"
import {Op} from "sequelize";

export const getBrawler = async (rarity, brawlerClass, gender) => {

    return await Brawler.findAll({
        where: {
            rarity: {
                [Op.like]: rarity,
            },
            class: {
                [Op.like]: brawlerClass,
            },
            gender: {
                [Op.like]: gender,
            }
        },
        raw: true
    }).then(result => {
        return result;
    });
}

const rarityList = [{
    name: `기본`,
    icon: `<:icon_brawler_trophy:1015949427338391624>`,
}, {
    name: `희귀`,
    icon: `<:icon_brawler_rare:1015949424280739870>`,
}, {
    name: `초희귀`,
    icon: `<:icon_brawler_super_rare:1015949426008793098>`,
}, {
    name: `영웅`,
    icon: `<:icon_brawler_epic:1015949418794582086>`,
}, {
    name: `신화`,
    icon: `<:icon_brawler_mythic:1015949422124863500>`,
}, {
    name: `전설`,
    icon: `<:icon_brawler_legend:1015949420682022962>`,
}, {
    name: `크로마틱`,
    icon: `<:icon_brawler_chromatic:1015949416546435113>`
}];

const classesList = [{
    name: `대미지 딜러`,
    icon: `⚔️`,
}, {
    name: `탱커`,
    icon: `🛡️`,
}, {
    name: `서포터`,
    icon: `💊`,
}, {
    name: `어쌔신`,
    icon: `🗡️`,
}, {
    name: `컨트롤러`,
    icon: `🪄`,
}, {
    name: `저격수`,
    icon: `🔫`,
}, {
    name: `투척수`,
    icon: `🧨`,
}];

const genderList = [{
    name: `남성`,
    icon: `♂️`,
}, {
    name: `여성`,
    icon: `♀️`,
}];

const spacePlace = (text) => {
    const length = text.length;
    let space = ``;
    for (let i = 0; i < 10 - (length * 2); i++) {
        space += ` `;
    }
    return space;
}

const embed = (id, name, rarity, brawlerClass, gender, icon) => new EmbedBuilder()
    .setColor(0x2ECC70)
    .setDescription(`<:reward_megabox:1015938099047583825> **랜덤 브롤러 뽑기**`)
    .setThumbnail(`attachment://${id}.webp`)
    .addFields({
        name: `${icon} ${name}`,
        value:
            `${rarityList.find((item) => {
                return item.name === rarity
            }).icon} \`${rarity}${spacePlace(rarity)}\`\n${classesList.find((item) => {
                return item.name === brawlerClass
            }).icon} \`${brawlerClass}${spacePlace(brawlerClass)}\`\n${genderList.find((item) => {
                return item.name === gender
            }).icon} \`${gender}${spacePlace(gender)}\``
    }).toJSON();

export default embed;