import {EmbedBuilder} from "discord.js";

import Member from "../../blossom-web-backend/models/member.js"
import {Op} from "sequelize";

const roman = ['I', 'II', 'III'];

export const getMember = async (name) => {

    return await Member.findOne({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            }
        },
        raw: true
    }).then(result => {
        return result;
    });
};

const rank = [
    {
        icon: `<:rank_icon_01:1100354671207522396>`,
    }, {
        icon: `<:rank_icon_02:1100354674470694932>`,
    }, {
        icon: `<:rank_icon_03:1100354676236492842>`,
    }, {
        icon: `<:rank_icon_04:1100354679973621890>`,
    }, {
        icon: `<:rank_icon_05:1100354683341647912>`,
    }, {
        icon: `<:rank_icon_06:1100354684939681793>`,
    }, {
        icon: `<:rank_icon_07:1100354688194453544>`,
    }
];

const embed = (result) => new EmbedBuilder()
    .setColor(0x2ECC70)
    .setTitle(result.name)
    .setURL(`http://blossomstats.site/member/${result.id.replace("#", "")}`)
    .setDescription(result.id)
    .setThumbnail(`attachment://${result.profile_picture}.webp`)
    .addFields({
        name: "<:icon_trophy_small:1015938189057331211> 현재(최고) 트로피",
        value: `\`${result.trophy_current}개(${result.trophy_highest}개)\``
    }, {
        name: "<:icon_rank_solo_mode:1100354534263492619> 솔로 현재(최고) 랭크",
        value: `${rank[Math.floor(result.league_solo_current / 3)].icon}${roman[result.league_solo_current % 3]}(${rank[Math.floor(result.league_solo_highest / 3)].icon}${roman[result.league_solo_highest % 3]})`
    }, {
        name: "<:icon_rank_team_mode:1100354536184496198> 팀 현재(최고) 랭크",
        value: `${rank[Math.floor(result.league_team_current / 3)].icon}${roman[result.league_team_current % 3]}(${rank[Math.floor(result.league_team_highest / 3)].icon}${roman[result.league_team_highest % 3]})`
    },)
    .toJSON();

export default embed;