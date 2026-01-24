import { ChatInputCommandInteraction, Client, EmbedBuilder, Events, GatewayIntentBits, Guild, MessageFlags, REST, Routes, SlashCommandBuilder } from "discord.js";

/** Discord token stored in .env file */
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

export const startDiscordClient = () => {
    const client = new Client({intents: [GatewayIntentBits.Guilds]});

    client.once(Events.ClientReady, async () => {
        console.log("Logged in!");
        if(client.user) {
            await Promise.all(client.guilds.cache.map((server: Guild) => 
                refreshServerCommands(client.user!.id, server.id)
            )).then(() => {
                console.log('All commands refreshed');
            });
        }
    })

    client.login(DISCORD_TOKEN);

    client.on(Events.InteractionCreate, async (interaction) => {
        if(interaction.isChatInputCommand() && isYippeeCommand(interaction)) {
            const yippeeGif = new EmbedBuilder().setImage("https://media.tenor.com/9BbBRWKXoFcAAAAi/autism-creature-tbh-creature.gif");

            await interaction.reply({embeds: [yippeeGif]});
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

const isYippeeCommand = (command: ChatInputCommandInteraction): boolean => {
    return command.commandName == "yippee";
}