import { ChatInputCommandInteraction, EmbedBuilder, Events } from "discord.js";
import { DiscordInterface } from "../interfaces/DiscordInterface.ts";

export const handleWheel = (discordInterface: DiscordInterface) => {
    discordInterface.registerEventListener(
        Events.InteractionCreate,
        async (interaction) => {
            if (
                interaction.isChatInputCommand() &&
                isWheelCommand(interaction)
            ) {
                //I can absolutely do this in one line probably but this
                //looks alot cleaner and it makes sense to me so
                const names = interaction.options.data;
                const argsCount = names.length;
                const winnerIndex = Math.floor(Math.random() * argsCount);
                const winner = names[winnerIndex];
                await interaction.reply(`And the winner is...\n${winner.value}!`);
            }
        },
    );
};

const isWheelCommand = (interaction: ChatInputCommandInteraction): boolean => {
    return interaction.commandName.startsWith("wheel");
};
