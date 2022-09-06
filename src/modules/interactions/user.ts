import ExtendedClient from "../../classes/Client";
import { UserCtxCommand } from "../../classes/Command";
import Module from "../../classes/Module";
import { publish } from "./publish";
import * as userCommands from "../../commands/user";
import { Interaction } from "discord.js";

export default class UserInteractionModule implements Module {
	public static id = "interactions.user";
	private commands: Map<string, UserCtxCommand> = new Map<string, UserCtxCommand>();

	constructor(client: ExtendedClient) {
		this.loadCommands();
		this.publishCommands();
		client.on("interactionCreate", (i) => this.handleInteraction(i, client));
	}

	private handleInteraction(interaction: Interaction, client: ExtendedClient) {
		if(!interaction.isUserContextMenuCommand()) return;
		let command = this.commands.get(interaction.commandName);
		command?.run(interaction, client);
	}

	private loadCommands() {
		// console.log("[🧩] Loading commands...");
		let loaded = 0;
		Object.values(userCommands).forEach((v) => {
			try {
				let command = new v.default();
				this.commands.set(command.data.name, command);
				loaded++;
				// console.log(`[🧩] Loaded command ${command.data.name}`);
			} catch (err) {
				console.log(`[⚠️] Failed to load command: ${err}`);
			}
		});
		// console.log(`[🧩] Loaded ${loaded} commands`);
	}

	private publishCommands() {
		this.commands.forEach(publish);
	}
}