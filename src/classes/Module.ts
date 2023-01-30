import ExtendedClient from "./Client";

export default interface Module {
	load(client: ExtendedClient): void | Promise<void>;
}
