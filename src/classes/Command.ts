import { ApplicationCommandDataResolvable, ChatInputApplicationCommandData, ChatInputCommandInteraction, Interaction, MessageApplicationCommandData, MessageContextMenuCommandInteraction, UserApplicationCommandData, UserContextMenuCommandInteraction } from "discord.js";
import ExtendedClient from "./Client";

export interface Command {
	data: ApplicationCommandDataResolvable;
	run(interaction: Interaction, client?: ExtendedClient): void | Promise<void>;
}

export interface ChatCommand extends Command {
	data: ChatInputApplicationCommandData;
	run(interaction: ChatInputCommandInteraction, client?: ExtendedClient): void | Promise<void>;
}

export interface UserCtxCommand extends Command {
	data: UserApplicationCommandData;
	run(interaction: UserContextMenuCommandInteraction, client?: ExtendedClient): void | Promise<void>;
}

export interface MessageCtxCommand extends Command {
	data: MessageApplicationCommandData;
	run(interaction: MessageContextMenuCommandInteraction, client?: ExtendedClient): void | Promise<void>;
}