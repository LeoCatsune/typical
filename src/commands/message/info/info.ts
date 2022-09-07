import { ApplicationCommandType, EmbedBuilder, GuildMember, MessageApplicationCommandData, MessageContextMenuCommandInteraction } from "discord.js";
import { MessageCtxCommand } from "../../../classes/Command";

export default class UserInfoCtxCommand implements MessageCtxCommand {
	data: MessageApplicationCommandData = {
		type: ApplicationCommandType.Message,
		name: "Message Info",
		dmPermission: false
	};

	run(interaction: MessageContextMenuCommandInteraction) {
		let embed = new EmbedBuilder()
			.setAuthor({name: interaction.user.tag})
			.setDescription(interaction.targetMessage.cleanContent)
			.setThumbnail(interaction.targetMessage.member?.displayAvatarURL() ?? interaction.targetMessage.author.displayAvatarURL())
			.addFields({name: "Information", value: "```yaml\n"+`ID: ${interaction.targetId}\nSent: ${interaction.targetMessage.createdAt.toUTCString()}\nEdited: ${interaction.targetMessage.editedAt?.toUTCString() ?? "(never)"}`+"\n```"})
			.setColor("Random")
			.setTimestamp();
		interaction.reply({
			embeds: [embed],
			ephemeral: true
		});
	}
}