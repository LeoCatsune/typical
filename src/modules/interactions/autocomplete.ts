import { AutocompleteInteraction, BaseInteraction, Events } from "discord.js";
import logger from "../core/logger";
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
      try {
        if (completion !== undefined) {
          completion(interaction)?.catch((e: unknown) => this.handleError(interaction, e));
        } else {
          interaction.respond([]).catch((e: unknown) => this.handleError(interaction, e));
        }
      } catch (err) {
        this.handleError(interaction, err);
      }
    }
  }

  private handleError(interaction: AutocompleteInteraction, err: unknown) {
    logger.warn(`Error Autocompleting ${interaction.commandName}: ${err}`);
    if (!interaction.responded) interaction.respond([]).catch((e: unknown) => logger.warn(`Failover, unable to reply: ${e}`));
  }
}
