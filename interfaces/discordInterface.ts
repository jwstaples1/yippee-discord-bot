import { Client, Events, GatewayIntentBits } from "discord.js";

/** Discord token stored in .env file */
export const DISCORD_TOKEN: string | undefined = process.env.DISCORD_TOKEN;

export const startDiscordClient = () => {
    const client = new Client({intents: [GatewayIntentBits.Guilds]});

    client.once(Events.ClientReady, () => {
        console.log("Logged in!");
    })

    client.login(DISCORD_TOKEN);
}