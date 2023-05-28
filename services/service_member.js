import {Op} from "sequelize";
import config from "../config/index.js";

const Member = await import (`${config.sequelize}/member.js`);
const MemberBrawler = await import (`${config.sequelize}/member_brawler.js`);
const Brawler = await import (`${config.sequelize}/brawler.js`);

export class memberService {
    static selectMember = async (name) => {
        return await Member.default.findOne({
            where: {
                name: {
                    [Op.like]: `%${name}%`,
                }
            }
        });
    }

    static async selectMemberBrawler(name, brawlerName) {
        const brawler = await Brawler.default.findOne({
            attributes: ["id", "name", "rarity"],
            where: {
                name: {
                    [Op.like]: `%${brawlerName}%`,
                }
            }
        });

        const member = await Member.default.findOne({
            attributes: ["id", "name"],
            where: {
                name: {
                    [Op.like]: `%${name}%`,
                }
            }
        });

        return await MemberBrawler.default.findOne({
            where: {
                member_id: {
                    [Op.like]: `%${member.id}%`,
                },
                brawler_id: {
                    [Op.like]: `%${brawler.id}%`,
                }
            },
            group: ["member_id", "brawler_id"]
        }).then(result => {
            result.member_name = member.name;
            result.brawler_name = brawler.name;
            result.rarity = brawler.rarity;
            return result;
        });
    }
}