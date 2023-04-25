import {EmbedBuilder} from "discord.js";

import Member from "../../blossom-web-backend/models/member.js"
import {Op} from "sequelize";

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

const spacePlace = (text) => {
    const length = text.length;
    let space = ``;
    for (let i = 0; i < 10 - (length * 2); i++) {
        space += ` `;
    }
    return space;
}

const embed = (id, name) => new EmbedBuilder()
    .setColor(0x2ECC70)
    .setDescription(`**프로필**`)
    .addFields({
        name: name,
        value: id
    }).toJSON();

export default embed;