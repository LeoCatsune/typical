import { ActivityOptions, ActivityType, Events } from "discord.js";
import ExtendedClient from "../../classes/Client";
import Module from "../../classes/Module";

const activities: ActivityOptions[] = [
	{ type: ActivityType.Watching, name: "over the chats." },
	{ type: ActivityType.Listening, name: "various beeps and boops." }
]

export default class LoggerModule implements Module {
	public static id = "core.status";

	constructor(client: ExtendedClient) {
		client.on(Events.ClientReady, () => this.onReady(client));
	}

	onReady(client: ExtendedClient) {
		client.user?.setActivity({ type: ActivityType.Watching, name: "myself start up..." });
		let act = 0;
		setInterval(() => {
			client.user?.setActivity(activities[act]);
			if (++act >= activities.length) act = 0;
		}, 30_000);
	}
}
