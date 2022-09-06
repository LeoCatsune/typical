import { ChatInputApplicationCommandData, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import ExtendedClient from "../../../classes/Client";
import { ChatCommand } from "../../../classes/Command";

export default class PingCommand implements ChatCommand {
	data: ChatInputApplicationCommandData = {
		name: "ping",
		description: "Displays the bot's API Latency."
	};

	async run(interaction: ChatInputCommandInteraction, client: ExtendedClient) {
		let embed = new EmbedBuilder()
			.setTitle("🏓 Ping")
			.setDescription("```yaml\nAPI Latency: "+client.ws.ping+"ms\n```")
			.setColor("Random")
			.setTimestamp()
		interaction.reply({embeds: [embed]})
	}
}