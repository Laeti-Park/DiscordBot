import {Op} from "sequelize";
import config from "../config/index.js";

const Brawler = await import (`${config.sequelize}/brawler.js`);

export class brawlerService {
    static selectBrawler = async (rarityOption, classOption, genderOption) => {

        return await Brawler.default.findAll({
            where: {
                rarity: {
                    [Op.like]: rarityOption,
                },
                class: {
                    [Op.like]: classOption,
                },
                gender: {
                    [Op.like]: genderOption,
                }
            },

        });
    }
}