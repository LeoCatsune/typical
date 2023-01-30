import { ActivityOptions, ActivityType, Events } from "discord.js";
import Client from "../../classes/Client";
import Module from "../../classes/Module";

const activities: ActivityOptions[] = [
	{ type: ActivityType.Watching, name: "over the chats." },
	{ type: ActivityType.Listening, name: "various beeps and boops." }
]

export default class StatusModule implements Module {
	load(client: Client): void {
		client.on(Events.ClientReady, () => this.onReady(client));
	}

	private onReady(client: Client) {
		client.user?.setActivity({ type: ActivityType.Watching, name: "myself start up..." });
		let act = 0;
		setInterval(() => {
			client.user?.setActivity(activities[act]);
			if (++act >= activities.length) act = 0;
		}, 30_000);
	}
}
