import { Client, Events, GatewayIntentBits, Guild, MessageFlags, REST, Routes, SlashCommandBuilder } from "discord.js";

/** Discord token stored in .env file */
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

export const startDiscordClient = () => {
    const client = new Client({intents: [GatewayIntentBits.Guilds]});

    client.once(Events.ClientReady, async () => {
        console.log("Logged in!");
        if(client.user) {
            await Promise.all(client.guilds.cache.map((server: Guild) => {
                return refreshServerCommands(client.user!.id, server.id);
            })).then(() => {
                console.log('All commands refreshed');
            });
        }
    })

    client.login(DISCORD_TOKEN);

    client.on(Events.InteractionCreate, async (interaction) => {
        if(interaction.isChatInputCommand()) {
            await interaction.reply({content: `${interaction.commandName}`, flags: MessageFlags.Ephemeral});
        }
    })
}

export const refreshServerCommands = async (clientId: string, serverId: string) => {
    const restAPI = new REST().setToken(DISCORD_TOKEN!);
    const commands: SlashCommandBuilder[] = [];
    commands.push(new SlashCommandBuilder().setName("yippee").setDescription("yippee"));

    try {
        await restAPI.put(Routes.applicationGuildCommands(clientId, serverId), {body: commands});
    } catch(e) {
        console.error(e);
    }
}