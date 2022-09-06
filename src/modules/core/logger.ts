import ExtendedClient from "../../classes/Client";
import Module from "../../classes/Module";

export default class LoggerModule implements Module {
	public static id = "core.logger";

	constructor(client: ExtendedClient) {
		client.on("ready", () => this.onReady(client));
		client.on("error", LoggerModule.error);
		client.on("warn", LoggerModule.warn);
		// client.on("debug", LoggerModule.debug);
	}

	private onReady(client: ExtendedClient) {
		console.log(`[📝] Logged in as ${client.user?.tag ?? "(unknown)"}`);
	}

	public static error(err: Error) {
		console.log(`[🛑] ${err.name}: ${err.message}`+err.stack?`\n\t${err.stack?.replaceAll("\n","\n\t")}`:"");
	}

	public static warn(msg: string) {
		console.log(`[⚠️] ${msg}`);
	}

	public static debug(msg: string) {
		console.log(`[🐛] ${msg}`);
	}
}