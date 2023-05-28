import {Collection} from "discord.js";
import helpCommand from "./help.js";
import randomCommand from "./random.js";
import profileCommand from "./profile.js";

export default () => {
    const commandsDefinition = []
    const commandsExecution = new Collection();

    commandsDefinition.push(helpCommand.data);
    commandsDefinition.push(randomCommand.data);
    commandsDefinition.push(profileCommand.data);

    commandsExecution.set(helpCommand.data.name, helpCommand);
    commandsExecution.set(randomCommand.data.name, randomCommand);
    commandsExecution.set(profileCommand.data.name, profileCommand);

    return [commandsDefinition, commandsExecution]
};