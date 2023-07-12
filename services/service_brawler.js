import {Op} from "sequelize";
import config from "../config/index.js";

const InfoBrawler = await import (`${config.sequelize}/view_info_brawler.js`);

export class brawlerService {
    static selectBrawler = async (rarityOption, classOption, genderOption) =>
        await InfoBrawler.default.findAll({
            where: {
                BRAWLER_RRT: {
                    [Op.like]: rarityOption,
                },
                BRAWLER_CL: {
                    [Op.like]: classOption,
                },
                BRAWLER_GNDR: {
                    [Op.like]: genderOption,
                }
            },
        });
}