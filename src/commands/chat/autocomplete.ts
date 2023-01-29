import { ApplicationCommandOptionType, AutocompleteInteraction, CacheType, ChatInputApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import Client from "../../classes/Client";
import { Command, CommandType } from "../../classes/Command";
import Fuse from 'fuse.js';

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
        autocomplete: true
      }
    ]
  }

  run(interaction: ChatInputCommandInteraction, _client: Client) {
    interaction.reply({ content: interaction.options.getString("color", true), ephemeral: true });
  }

  autocomplete(interaction: AutocompleteInteraction<CacheType>) {
    let matches = completions.search(interaction.options.getString("color", true));
    interaction.respond(matches.map((v) => { return { name: v.item, value: v.item }; }));
  }
}
