import { DISCORD_TOKEN, startDiscordClient } from "./interfaces/discordInterface.ts";

const initialize = (): void => {
    console.log("hello world", DISCORD_TOKEN);
    startDiscordClient();
}

// run the actual function that will start the bot
initialize();