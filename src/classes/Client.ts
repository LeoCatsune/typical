import { Client, GatewayIntentBits } from "discord.js";
import config from "../config";
import * as modules from "../modules";
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
		Object.values(modules).forEach((v) => {
			try {
				new v.default(this);
			} catch (err) {
				logger.warn(`Failed to load module ${v.default.id}: ${err}`);
			}
		});
	}
}
