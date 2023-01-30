import { ApplicationCommandData, AutocompleteInteraction, BaseInteraction } from "discord.js";
import ExtendedClient from "./Client";

export enum CommandType {
	CHAT,
	MESSAGE,
	USER,
}

export interface Command {
	type: CommandType;
	data: ApplicationCommandData;
	run(interaction: BaseInteraction, client?: ExtendedClient): void | Promise<void>;
	autocomplete?(interaction: AutocompleteInteraction): void | Promise<void>;
}
