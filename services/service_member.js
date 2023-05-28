import {Op} from "sequelize";
import config from "../config/index.js";

const Member = await import (`${config.sequelize}/member.js`);

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
}