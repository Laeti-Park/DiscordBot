import config from "../config/index.js";

const Rotation = await import (`${config.sequelize}/view_rotation.js`);
const InfoMap = await import (`${config.sequelize}/view_info_map.js`);

export class rotationService {

    static selectRotationMap = async (number) => {
        return await Rotation.default.findAll({
            attributes: ["MAP_ID"],
            where: {
                ROTATION_SLT_NO: number,
            },
            order: [["ROTATION_BGN_DT", "DESC"]]
        }).then(async result => {
            const currMap = await InfoMap.default.findOne({
                attributes: ["MAP_ID", "MAP_MD", "MAP_NM"],
                where: {
                    MAP_ID: result[0].MAP_ID
                }
            });

            const nextMap = await InfoMap.default.findOne({
                attributes: ["MAP_ID", "MAP_MD", "MAP_NM"],
                where: {
                    MAP_ID: result[result.length - 1].MAP_ID
                }
            });

            return [currMap, nextMap];
        });
    };
}