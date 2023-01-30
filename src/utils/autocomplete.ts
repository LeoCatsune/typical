import { ApplicationCommandOptionChoiceData } from "discord.js";

export function stringToOption(str: string): ApplicationCommandOptionChoiceData {
  return { name: str, value: str }
}
