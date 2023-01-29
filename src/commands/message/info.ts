import { ApplicationCommandType, EmbedBuilder, MessageApplicationCommandData, MessageContextMenuCommandInteraction } from "discord.js";
import { Command, CommandType } from "../../classes/Command";

export default class UserInfoCtxCommand implements Command {
  type = CommandType.MESSAGE;
  data: MessageApplicationCommandData = {
    type: ApplicationCommandType.Message,
    name: "Message Info",
    dmPermission: false
  };

  run(interaction: MessageContextMenuCommandInteraction) {
    let embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setDescription(interaction.targetMessage.cleanContent)
      .setThumbnail(interaction.targetMessage.member?.displayAvatarURL() ?? interaction.targetMessage.author.displayAvatarURL())
      .addFields({ name: "Information", value: "```yaml\n" + `ID: ${interaction.targetId}\nSent: ${interaction.targetMessage.createdAt.toUTCString()}\nEdited: ${interaction.targetMessage.editedAt?.toUTCString() ?? "(never)"}` + "\n```" })
      .setColor("Random")
      .setTimestamp();
    interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
}
