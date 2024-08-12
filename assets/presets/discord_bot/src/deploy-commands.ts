import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js'
import fs from 'fs';
import path from 'path';
import Command from './structures/Command';
import Config from './utils/Config';
import { logger } from './utils/logger';

(async () => {
const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
const commandDirPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandDirPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

for (const file of commandFiles) {
		const command = (await import(path.join(commandDirPath, file))).default as Command;
		commands.push(command.data.toJSON());
}

const rest = new REST().setToken(Config.bot.token);

try {
    logger.info(`Started refreshing ${commands.length} application (/) commands.`);

    const data: RESTPostAPIChatInputApplicationCommandsJSONBody[] = await rest.put(
        Routes.applicationCommands(Config.bot.id),
        { body: commands }
    ) as RESTPostAPIChatInputApplicationCommandsJSONBody[];

    // const data = await rest.put(
    // 	Routes.applicationGuildCommands(clientId, guildId),
    // 	{ body: commands },
    // );

    logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
} catch (error) {
    logger.info(error);
}
})();