import Event from "../structures/Event"
import { logger } from "../utils/logger"

export default new Event({
    name: "interactionCreate",
    once: false,
    execute: (client, interaction) => {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName)

            if (command === undefined) {
                logger.debug(`Command ${interaction.commandName} does not exist`)
                if (interaction.replied || interaction.deferred) interaction.followUp({ content: "This command does not exist!", ephemeral: true })
                else interaction.reply({ content: "This command does not exist!", ephemeral: true })
                return
            }

            try {
                command.execute(interaction)
            } catch (error) {
                logger.error(error)
                if (interaction.replied || interaction.deferred) interaction.followUp({ content: "There was an error while executing this command", ephemeral: true })
                else interaction.reply({ content: "There was an error while executing this command!", ephemeral: true })
            }
        }
    }
})