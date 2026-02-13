import {
    Client,
    type ClientEvents,
    Events,
    GatewayIntentBits,
    Guild,
    REST,
    Routes,
    SlashCommandBuilder,
} from "discord.js";
import { loadConnorsQuotes } from "../handlers/connorQuoteHandler.ts";
import { loadOthersQuotes } from "../handlers/otherQuoteHandler.ts";
import blacklistFile from "../blacklistedCommands.json" with { type: "json" };

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

export class DiscordInterface {
    private _discordClient: Client;
    private _commands: SlashCommandBuilder[];
    private _blacklist: Map<string, string[]>;

    constructor() {
        this._discordClient = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        });
        this._commands = [
            new SlashCommandBuilder()
                .setName("yippee")
                .setDescription("yippee"),
            new SlashCommandBuilder()
                .setName("cquote")
                .setDescription("your daily quote, served up Connor's way"), //i think i did this right I hope
            new SlashCommandBuilder()
                .setName("oquote")
                .setDescription("your daily quote, served up the other's way"),
        ];

        this._blacklist = new Map<string, string[]>();
        this._loadBlacklist();

        this._discordClient.on(Events.GuildMemberAdd, (member) => {
            this._refreshServerCommands(
                this._discordClient.application!.id,
                member.guild.id,
            ).then(() => {
                console.log(
                    `Commands added to new server: ${member.guild.name}`,
                );
            });
        });

        this._discordClient.on(Events.ClientReady, () => this._onReady());

        this._discordClient.login(DISCORD_TOKEN);
    }

    get client(): Client {
        return this._discordClient;
    }

    public registerEventListener<Event extends keyof ClientEvents>(
        event: Event,
        handler: (...args: ClientEvents[Event]) => void,
    ) {
        this._discordClient.on(event, handler);
    }

    private async _onReady() {
        console.log("Logged in!");
        if (this._discordClient.user) {
            await Promise.all(
                this._discordClient.guilds.cache.map((server: Guild) =>
                    this._refreshServerCommands(
                        this._discordClient.user!.id,
                        server.id,
                    ),
                ),
            ).then(() => {
                console.log("All commands refreshed");
            });
        }
        //load connor quotes upon start up
        await loadConnorsQuotes(this);
        //load others quotes upon start up
        await loadOthersQuotes(this);
    }

    private async _refreshServerCommands(clientId: string, serverId: string) {
        const restAPI = new REST().setToken(DISCORD_TOKEN!);

        const blacklistedCommands: Set<string> = new Set<string>(
            this._blacklist.get(serverId),
        );
        const filteredCommands = this._commands.filter(
            (command) => !blacklistedCommands.has(command.name),
        );

        try {
            await restAPI.put(
                Routes.applicationGuildCommands(clientId, serverId),
                {
                    body: filteredCommands,
                },
            );
        } catch (e) {
            console.error(e);
        }
    }

    private _loadBlacklist() {
        const blacklist = new Map<string, string[]>();
        blacklistFile.blacklist.forEach(({ serverID, commands }) => {
            blacklist.set(serverID, commands);
        });

        this._blacklist = blacklist;
    }
}
