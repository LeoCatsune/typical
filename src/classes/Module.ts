import ExtendedClient from "./Client";

export default class Module {
	public static id = "core.default";

	constructor(_client: ExtendedClient) {
		throw new Error("Module does not implement a constructor.");
	}
}
