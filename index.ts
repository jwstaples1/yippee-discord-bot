import { DiscordInterface } from "./interfaces/discordInterface.ts";
import { handleYippee } from "./handlers/yippeeHandler.ts";

const initialize = (): void => {
    const discordInterface = new DiscordInterface();
    handleYippee(discordInterface);
};

// run the actual function that will start the bot
initialize();
