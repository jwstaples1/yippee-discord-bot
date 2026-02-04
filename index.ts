import { DiscordInterface } from "./interfaces/discordInterface.ts";
import { handleYippee } from "./handlers/yippeeHandler.ts";
import { handleQuote } from "./handlers/quoteHandler.ts";
const initialize = (): void => {
    const discordInterface = new DiscordInterface();
    handleYippee(discordInterface);
    handleQuote(discordInterface);
};

// run the actual function that will start the bot
initialize();
