import { Events, Interaction } from "discord.js";
import logger from "../core/logger";
import ExtendedClient from "../../classes/Client";
import { Command, CommandType } from "../../classes/Command";
import Module from "../../classes/Module";
import * as commands from "../../commands";
import { publish } from "./publish";

export const chatCommands: Map<string, Command> = new Map<string, Command>();
export const messageCommands: Map<string, Command> = new Map<string, Command>();
export const userCommands: Map<string, Command> = new Map<string, Command>();

export default class CommandInteractionModule implements Module {
  public static id = "interactions.chat";

  constructor(client: ExtendedClient) {
    this.loadCommands();
    this.publishCommands();
    client.on(Events.InteractionCreate, (i) => this.handleInteraction(i, client));
  }

  private handleInteraction(interaction: Interaction, client: ExtendedClient) {
    if (interaction.isChatInputCommand())
      chatCommands.get(interaction.commandName)?.run(interaction, client);
    else if (interaction.isMessageContextMenuCommand())
      messageCommands.get(interaction.commandName)?.run(interaction, client);
    else if (interaction.isUserContextMenuCommand())
      userCommands.get(interaction.commandName)?.run(interaction, client);
  }

  private loadCommands() {
    Object.values(commands).forEach((v) => {
      try {
        let command = new v.default();
        switch (command.type) {
          case CommandType.CHAT:
            chatCommands.set(command.data.name, command as Command);
            break;
          case CommandType.MESSAGE:
            messageCommands.set(command.data.name, command as Command);
            break;
          case CommandType.USER:
            userCommands.set(command.data.name, command as Command);
            break;
        }
      } catch (err) {
        logger.warn(`Failed to load command: ${err}`);
      }
    });
  }

  private publishCommands() {
    chatCommands.forEach(publish);
    messageCommands.forEach(publish);
    userCommands.forEach(publish);
  }
}
