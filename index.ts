import { DiscordInterface } from "./interfaces/discordInterface.ts";
import { handleYippee } from "./handlers/yippeeHandler.ts";
import { handleConnorQuote } from "./handlers/connorQuoteHandler.ts";
import { handleOtherQuote } from "./handlers/otherQuoteHandler.ts";
const initialize = (): void => {
    const discordInterface = new DiscordInterface();
    handleYippee(discordInterface);
    handleConnorQuote(discordInterface);
    handleOtherQuote(discordInterface);
};

// run the actual function that will start the bot
initialize();
