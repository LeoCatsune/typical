import { ApplicationCommandDataResolvable } from "discord.js";
import ExtendedClient from "../../classes/Client";
import { Command } from "../../classes/Command";
import Module from "../../classes/Module";

let commands: ApplicationCommandDataResolvable[] = [];
export function publish(command: Command) {
	commands.push(command.data);
}

export default class PublishCommandsModule implements Module {
	public static id = "interactions.publish";

	constructor(client: ExtendedClient) {
		client.on("ready", () => this.publish(client));
	}

	private publish(client: ExtendedClient) {
		client.application?.commands.set(commands);
		console.log(`[✅] Published ${commands.length} commands`);
	}
}