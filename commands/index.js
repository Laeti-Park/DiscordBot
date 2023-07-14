import {Collection} from "discord.js";
import helpCommand from "./help.js";
import randomCommand from "./random.js";
import profileCommand from "./profile.js";
import brawlerCommand from "./brawler.js";
import rotationCommand from "./rotation.js";

export default () => {
    const commandsDefinition = []
    const commandsExecution = new Collection();

    commandsDefinition.push(helpCommand.data);
    commandsDefinition.push(randomCommand.data);
    commandsDefinition.push(profileCommand.data);
    commandsDefinition.push(brawlerCommand.data);
    commandsDefinition.push(rotationCommand.data);

    commandsExecution.set(helpCommand.data.name, helpCommand);
    commandsExecution.set(randomCommand.data.name, randomCommand);
    commandsExecution.set(profileCommand.data.name, profileCommand);
    commandsExecution.set(brawlerCommand.data.name, brawlerCommand);
    commandsExecution.set(rotationCommand.data.name, rotationCommand);

    return [commandsDefinition, commandsExecution]
};