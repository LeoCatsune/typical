import { ApplicationCommandDataResolvable, Events } from "discord.js";
import ExtendedClient from "../../classes/Client";
import { Command } from "../../classes/Command";
import Module from "../../classes/Module";

let commands: ApplicationCommandDataResolvable[] = [];
export function publish(command: Command) {
	commands.push(command.data);
}

export default class PublishModule implements Module {
	load(client: ExtendedClient) {
		client.on(Events.ClientReady, () => this.publish(client));
	}

	private publish(client: ExtendedClient) {
		client.application?.commands.set(commands);
		console.log(`[✅] Published ${commands.length} commands`);
	}
}
