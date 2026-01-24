import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    Events,
    GatewayIntentBits,
    Guild,
    MessageFlags,
    REST,
    Routes,
    SlashCommandBuilder,
} from "discord.js";

/** Discord token stored in .env file */
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const YIPPEE_GIF = new EmbedBuilder().setImage(
    "https://media.tenor.com/9BbBRWKXoFcAAAAi/autism-creature-tbh-creature.gif",
);

export const startDiscordClient = () => {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    });

    client.once(Events.ClientReady, async () => {
        console.log("Logged in!");
        if (client.user) {
            await Promise.all(
                client.guilds.cache.map((server: Guild) =>
                    refreshServerCommands(client.user!.id, server.id),
                ),
            ).then(() => {
                console.log("All commands refreshed");
            });
        }
    });

    client.login(DISCORD_TOKEN);

    client.on(Events.InteractionCreate, async (interaction) => {
        if (interaction.isChatInputCommand() && isYippeeCommand(interaction)) {
            await interaction.reply({ embeds: [YIPPEE_GIF] });
        }
    });

    client.on(Events.MessageCreate, async (message) => {
        if (message.author.bot) return;

        const yippeePattern: RegExp = /y+i+p+p+e+e+$/i;
        const words = message.content.split(" ");

        if (words.find((word) => yippeePattern.test(word))) {
            message.reply({ embeds: [YIPPEE_GIF] });
        }
    });

    client.on(Events.GuildMemberAdd, (member) => {
        refreshServerCommands(client.application!.id, member.guild.id).then(() => {
            console.log(`Commands added to new server: ${member.guild.name}`)
        });
    })
};

export const refreshServerCommands = async (
    clientId: string,
    serverId: string,
) => {
    const restAPI = new REST().setToken(DISCORD_TOKEN!);
    const commands: SlashCommandBuilder[] = [];
    commands.push(
        new SlashCommandBuilder().setName("yippee").setDescription("yippee"),
    );

    try {
        await restAPI.put(Routes.applicationGuildCommands(clientId, serverId), {
            body: commands,
        });
    } catch (e) {
        console.error(e);
    }
};

const isYippeeCommand = (command: ChatInputCommandInteraction): boolean => {
    return command.commandName == "yippee";
};
