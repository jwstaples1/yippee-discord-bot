import { ChatInputCommandInteraction } from "discord.js";
import { DiscordInterface } from "../interfaces/DiscordInterface.ts";
import { join } from "path";
import * as process from "process";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, type CreateVoiceConnectionOptions, joinVoiceChannel, type JoinVoiceChannelOptions } from "@discordjs/voice";

const isPlayCommand = (interaction: ChatInputCommandInteraction): boolean => {
    //code got mad at me because you added -dev to command names in the dev env,
    //but this still works so its chill
    return interaction.commandName.startsWith("play");
};


export const handlePlay = (discordInterface: DiscordInterface) => {

    discordInterface.registerEventListener("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand() || !isPlayCommand(interaction)) {
            return;
        };

        const userWhoSent = await interaction.guild.members.fetch(interaction.user.id);

        const usersVoiceChannel: CreateVoiceConnectionOptions & JoinVoiceChannelOptions = {
            channelId: userWhoSent.voice.channelId,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        }

        try {
            const connection = joinVoiceChannel(usersVoiceChannel);

            const player = createAudioPlayer();
            const resource = createAudioResource(join(process.cwd(), 'sounds', 'sus.wav'));

            connection.subscribe(player);
            player.play(resource);

            player.on(AudioPlayerStatus.Playing, () => {
                console.log('playing cool sound');
            })

            player.on(AudioPlayerStatus.Idle, () => {
                connection.disconnect();
            })
        } catch (error) {
            if (interaction.isCommand()) {
                interaction.reply("an error happened, oh no");
            }
        }
    })
    return;
}