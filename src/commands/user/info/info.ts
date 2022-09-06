import { ApplicationCommandType, EmbedBuilder, GuildMember, UserApplicationCommandData, UserContextMenuCommandInteraction } from "discord.js";
import { UserCtxCommand } from "../../../classes/Command";

export default class UserInfoCtxCommand implements UserCtxCommand {
	data: UserApplicationCommandData = {
		type: ApplicationCommandType.User,
		name: "User Info",
		dmPermission: false
	};

	run(interaction: UserContextMenuCommandInteraction) {
		let member = interaction.targetMember as GuildMember;
		let embed = new EmbedBuilder()
			.setAuthor({name: member.displayName})
			.setThumbnail(member.displayAvatarURL())
			.setDescription("```yaml\n"+`ID: ${member.id}\nUsername: ${member.user.tag}`+"\n```")
			.setColor("Random")
			.setTimestamp();
		interaction.reply({
			embeds: [embed],
			ephemeral: true
		});
	}
}