import { Client, GatewayIntentBits } from "discord.js";
import config from "../config";
import { modules } from "../modules";
import logger from "../modules/core/logger";

export default class ExtendedClient extends Client {
	constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildModeration,
				GatewayIntentBits.GuildMembers,
			]
		});
	}

	start() {
		console.log("[✨] Starting Bot...");
		this.loadModules();
		this.login(config.TOKEN);
	}

	loadModules() {
		modules.forEach((v) => {
			try {
				new v().load(this);
			} catch (err) {
				logger.warn(`Failed to load ${v.name}: ${err}`);
			}
		});
	}
}
