import clientLoader from "./client.js";
import sequelizeLoader from "./sequelize.js";

export default async () => {
    await clientLoader();
    await sequelizeLoader;
}