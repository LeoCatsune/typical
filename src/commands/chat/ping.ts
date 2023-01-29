import { ChatInputApplicationCommandData, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import Client from "../../classes/Client";
import { Command, CommandType } from "../../classes/Command";

export default class PingCommand implements Command {
	type = CommandType.CHAT;
	data: ChatInputApplicationCommandData = {
		name: "ping",
		description: "Displays the bot's API Latency."
	};

	async run(interaction: ChatInputCommandInteraction, client: Client) {
		let embed = new EmbedBuilder()
			.setTitle("🏓 Ping")
			.setDescription("```yaml\nAPI Latency: " + client.ws.ping + "ms\n```")
			.setColor("Random")
			.setTimestamp()
		await interaction.reply({ embeds: [embed] })
	}
}
