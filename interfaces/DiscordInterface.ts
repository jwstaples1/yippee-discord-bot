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

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

export class DiscordInterface {
    private _discordClient: Client;
    private _commands: SlashCommandBuilder[];

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
        ];

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

        this._onReady();

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
    }

    private async _refreshServerCommands(clientId: string, serverId: string) {
        const restAPI = new REST().setToken(DISCORD_TOKEN!);

        try {
            await restAPI.put(
                Routes.applicationGuildCommands(clientId, serverId),
                {
                    body: this._commands,
                },
            );
        } catch (e) {
            console.error(e);
        }
    }
}
