import {Op} from "sequelize";
import config from "../config/index.js";

const Brawler = await import (`${config.sequelize}/brawler.js`);

export class brawlerService {
    static selectBrawler = async (rarity, brawlerClass, gender) => {
        console.log(Brawler);

        return await Brawler.default.findAll({
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
        });
    }
}