import { ChatInputCommandInteraction, EmbedBuilder, Events } from "discord.js";
import { DiscordInterface } from "../interfaces/DiscordInterface.ts";

const isWheelCommand = (command: ChatInputCommandInteraction): boolean => {
    return command.commandName.startsWith("wheel");
};

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
