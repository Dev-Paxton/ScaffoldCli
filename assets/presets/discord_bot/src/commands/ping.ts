import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "../structures/Command";

export default new Command({
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    execute: async interaction => {
        await interaction.reply({ embeds: [
            new EmbedBuilder()
            .setTitle("🏓 Pong!")
            .setDescription(`Websocket ping: ${interaction.client.ws.ping}ms`)
        ]})
    }
})