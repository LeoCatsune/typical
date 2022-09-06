import { Interaction } from "discord.js";
import ExtendedClient from "../../classes/Client";
import { ChatCommand } from "../../classes/Command";
import Module from "../../classes/Module";
import * as chatCommands from "../../commands/chat";
import { publish } from "./publish";

export default class ChatInteractionModule implements Module {
	public static id = "interactions.chat";
	private commands: Map<string, ChatCommand> = new Map<string, ChatCommand>();

	constructor(client: ExtendedClient) {
		this.loadCommands();
		this.publishCommands();
		client.on("interactionCreate", (i) => this.handleInteraction(i, client));
	}

	private handleInteraction(interaction: Interaction, client: ExtendedClient) {
		if(!interaction.isChatInputCommand()) return;
		let command = this.commands.get(interaction.commandName);
		command?.run(interaction, client);
	}

	private loadCommands() {
		// console.log("[🧩] Loading commands...");
		let loaded = 0;
		Object.values(chatCommands).forEach((v) => {
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