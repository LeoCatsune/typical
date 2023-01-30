import { Command } from "../classes/Command";
type Commands = { new(): Command; }[];

import c_ping from "./chat/ping";
import c_autocomplete from "./chat/autocomplete";
export const chat: Commands = [c_ping, c_autocomplete];

import m_info from "./message/info";
export const message: Commands = [m_info];

import u_info from "./user/info";
export const user: Commands = [u_info];
