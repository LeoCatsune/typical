import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import Client from "../../classes/Client";
import { Command, CommandType } from "../../classes/Command";
import Fuse from 'fuse.js';
import { stringToOption } from "../../utils/autocomplete";

const colors = ["Red", "Green", "Blue"];
const completions = new Fuse<string>(colors);

export default class AutocompleteCommand implements Command {
  type = CommandType.CHAT;
  data: ChatInputApplicationCommandData = {
    name: "autocomplete",
    description: "Test command for autocomplete feature.",
    dmPermission: true,
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: "color",
        nameLocalizations: {
          "en-GB": "colour",
        },
        description: "The color to select.",
        descriptionLocalizations: {
          "en-GB": "The colour to select."
        },
        autocomplete: true,
        required: true
      }
    ]
  }

  async run(interaction: ChatInputCommandInteraction, _client: Client) {
    await interaction.reply({ content: interaction.options.getString("color", true), ephemeral: true });
  }

  async autocomplete(interaction: AutocompleteInteraction) {
    let text = interaction.options.getFocused();
    if (text.length == 0) return await interaction.respond(colors.map(stringToOption));
    let matches = completions.search(text);
    await interaction.respond(matches.map(v => stringToOption(v.item)));
  }
}
