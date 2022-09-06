import { Client } from "discord.js";
import config from "../config";
import * as modules from "../modules";

export default class ExtendedClient extends Client {
	constructor() {
		super({
			intents: [
				"Guilds",
				"GuildBans",
				"GuildMembers"
			]
		});
	}

	start() {
		console.log("[✨] Starting Bot...");
		this.loadModules();
		this.login(config.TOKEN);
	}

	loadModules() {
		// console.log("[🧩] Loading modules...");
		let loaded = 0;
		Object.values(modules).forEach((v) => {
			try {
				new v.default(this);
				loaded++;
				// console.log(`[🧩] Loaded module ${v.default.id}`);
			} catch (err) {
				console.log(`[⚠️] Failed to load module ${v.default.id}: ${err}`);
			}
		});
		// console.log(`[🧩] Loaded ${loaded} modules`);
	}
}