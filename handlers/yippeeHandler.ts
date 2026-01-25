import { ChatInputCommandInteraction, EmbedBuilder, Events } from "discord.js";
import { DiscordInterface } from "../interfaces/discordInterface.ts";

const YIPPEE_GIF = new EmbedBuilder().setImage(
    "https://media.tenor.com/9BbBRWKXoFcAAAAi/autism-creature-tbh-creature.gif",
);

const isYippeeCommand = (command: ChatInputCommandInteraction): boolean => {
    return command.commandName == "yippee";
};

export const handleYippee = (discordInterface: DiscordInterface) => {
    discordInterface.registerEventListener(
        Events.InteractionCreate,
        async (interaction) => {
            if (
                interaction.isChatInputCommand() &&
                isYippeeCommand(interaction)
            ) {
                await interaction.reply({ embeds: [YIPPEE_GIF] });
            }
        },
    );

    discordInterface.registerEventListener(
        Events.MessageCreate,
        async (message) => {
            if (message.author.bot) return;

            const yippeePattern: RegExp = /y+i+p+p+e+e+/i;
            const words = message.content.split(" ");

            if (words.find((word) => yippeePattern.test(word))) {
                message.reply({ embeds: [YIPPEE_GIF] });
            }
        },
    );
};
