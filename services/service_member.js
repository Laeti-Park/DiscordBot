import {Op} from "sequelize";
import config from "../config/index.js";

const Member = await import (`${config.sequelize}/table_member.js`);
const MemberBrawler = await import (`${config.sequelize}/table_member_brawler.js`);
const InfoBrawler = await import (`${config.sequelize}/view_info_brawler.js`);

export class memberService {
    static selectMember = async (name) => {
        return await Member.default.findOne({
            where: {
                MEMBER_NM: {
                    [Op.like]: `%${name}%`,
                }
            },
            order: [["TROPHY_CUR", "DESC"]]
        });
    };

    static async selectMemberBrawler(name, brawlerName) {
        const brawler = await InfoBrawler.default.findOne({
            attributes: ["BRAWLER_ID", "BRAWLER_NM", "BRAWLER_RRT"],
            where: {
                BRAWLER_NM: {
                    [Op.like]: `%${brawlerName}%`,
                }
            }
        });

        const member = await Member.default.findOne({
            attributes: ["MEMBER_ID", "MEMBER_NM"],
            where: {
                MEMBER_NM: {
                    [Op.like]: `%${name}%`,
                }
            }
        });

        return await MemberBrawler.default.findOne({
            where: {
                MEMBER_ID: {
                    [Op.like]: `%${member.MEMBER_ID}%`,
                },
                BRAWLER_ID: {
                    [Op.like]: `%${brawler.BRAWLER_ID}%`,
                }
            },
            group: ["MEMBER_ID", "BRAWLER_ID"]
        }).then(result => {
            result.MEMBER_NM = member.MEMBER_NM;
            result.BRAWLER_NM = brawler.BRAWLER_NM;
            result.BRAWLER_RRT = brawler.BRAWLER_RRT;
            return result;
        });
    };
}