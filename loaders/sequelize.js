import config from "../config/index.js";

const {sequelize} = await import (`${config.sequelize}/index.js`);

export default sequelize.sync({
    force: false
}).then(() => {
    console.log("🌸BLOSSOM BOT DATABASE CONNECTED");
}).catch((err) => {
    console.log('🌸BLOSSOM BOT DATABASE ERROR',
        new Date().toLocaleString('ko-KR')
    );
    console.error(err);
});