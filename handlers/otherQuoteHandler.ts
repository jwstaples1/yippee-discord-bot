

import { ChatInputCommandInteraction, Events, Message } from "discord.js";
import { DiscordInterface } from "../interfaces/DiscordInterface.ts";

const othersQuotes: string[] = [];

export const loadOthersQuotes = async (discordInterface: DiscordInterface) => {
    const channelID: string = "766675071493603338";
    const channel = discordInterface.client.channels.cache.get(channelID);
    let messages: Map<string, Message>;
    let recentMsgID: string | undefined;

    if (channel!.isTextBased()) {
        do {
            messages = await channel.messages.fetch({ limit: 100, before: recentMsgID })

            for (const msg of messages.values()) {
                if (msg.content.match(/202/)) {
                    othersQuotes.push(msg.content);
                }
                recentMsgID = msg.id;
            }
        } while (messages.size == 100);
    }
}

export const handleOtherQuote = async (discordInterface: DiscordInterface) => {
    discordInterface.registerEventListener(
        Events.InteractionCreate,
        async (interaction) => {
            if (
                interaction.isChatInputCommand() &&
                isQuoteCommand(interaction)
            ) {
                let randIndex = Math.floor(Math.random() * othersQuotes.length);
                await interaction.reply(othersQuotes[randIndex]);
            }
        },
    )
}

const isQuoteCommand = (interaction: ChatInputCommandInteraction): boolean => {
    return interaction.commandName == "oquote";
}