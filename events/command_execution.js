import command from "../commands/command.js";
import randomEmbed, {getBrawler} from "../commands/random.js";
import profileEmbed, {getMember} from "../commands/profile.js";

const commandsExecution = async (commandName, userName, options) => {

    if (commandName === '명령어') {
        return {
            embeds: [command]
        }
    } else if (commandName === '뽑기') {
        const rarity = options.getString("희귀도") !== null ? options.getString("희귀도") : "%%";
        const brawlerClass = options.getString("역할군") !== null ? options.getString("역할군") : "%%";
        const gender = options.getString("성별") !== null ? options.getString("성별") : "%%";

        const result = await getBrawler(rarity, brawlerClass, gender);
        const randomNum = Math.floor(Math.random() * result.length + 1);
        const randomBrawler = result[randomNum];

        return {
            embeds: [await randomEmbed(randomBrawler.id,
                randomBrawler.name,
                randomBrawler.rarity,
                randomBrawler.class,
                randomBrawler.gender,
                randomBrawler.icon)],
            files: [{
                attachment: `../blossom-web-frontend/public/images/brawler_profile/${randomBrawler.id}.webp`,
                name: `${randomBrawler.id}.webp`
            }]
        };
    } else if (commandName === '프로필') {
        const name = options.getString("닉네임") !== null ? options.getString("닉네임") : "";
        const result = await getMember(name);

        return {
            embeds: [await profileEmbed(result.id, result.name)]
        };
    }
}

export default commandsExecution;