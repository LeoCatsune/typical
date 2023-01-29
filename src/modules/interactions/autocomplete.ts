import { BaseInteraction, Events } from "discord.js";
import Client from "../../classes/Client";
import Module from "../../classes/Module"
import { chatCommands } from "./command";

export default class AutocompleteModule implements Module {
  public static id = "interactions.autocomplete";
  constructor(client: Client) {
    client.on(Events.InteractionCreate, (i) => this.handleInteraction(i));
  }

  private handleInteraction(interaction: BaseInteraction) {
    if (interaction.isAutocomplete()) {
      let completion = chatCommands.get(interaction.commandName)?.autocomplete;
      if (completion !== undefined) {
        completion.call(null, interaction);
      } else {
        interaction.respond([]);
      }
    }
  }
}
