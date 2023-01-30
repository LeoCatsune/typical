import Module from "../classes/Module";

import LoggerModule from "./core/logger";
import StatusModule from "./core/status";
import AutocompleteModule from "./interactions/autocomplete";
import CommandModule from "./interactions/command";
import PublishModule from "./interactions/publish";

// Hack: apparently, typescript doesn't think Module[] is an appropriate type.
type Modules = { new(): Module; }[];
export const modules: Modules = [LoggerModule, StatusModule, CommandModule, AutocompleteModule, PublishModule];
