import { Events } from "discord.js";
import Client from "../../classes/Client";
import Module from "../../classes/Module";

export default class LoggerModule implements Module {
	load(client: Client) {
		client.on(Events.ClientReady, () => this.onReady(client));
		client.on(Events.Error, LoggerModule.error);
		client.on(Events.Warn, LoggerModule.warn);
		// client.on(Events.Debug, LoggerModule.debug);
	}

	private onReady(client: Client) {
		console.log(`[📝] Logged in as ${client.user?.tag ?? "(unknown)"}`);
	}

	public static error(err: Error) {
		console.log(`[🛑] ${err.name}: ${err.message}` + err.stack ? `\n\t${err.stack?.replaceAll("\n", "\n\t")}` : "");
	}

	public static warn(msg: string) {
		console.log(`[⚠️] ${msg}`);
	}

	public static debug(msg: string) {
		console.log(`[🐛] ${msg}`);
	}
}
