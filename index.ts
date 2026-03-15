import { handleYippee } from "./handlers/yippeeHandler.ts";
import { handleConnorQuote } from "./handlers/connorQuoteHandler.ts";
import { handleOtherQuote } from "./handlers/otherQuoteHandler.ts";
import { handleWheel } from "./handlers/wheelHandler.ts";
import { DiscordInterface } from "./interfaces/DiscordInterface.ts";
import { handlePlay } from "./handlers/playHandler.ts";

const initialize = (): void => {
    const discordInterface = new DiscordInterface();
    handleYippee(discordInterface);
    handleConnorQuote(discordInterface);
    handleOtherQuote(discordInterface);
    handleWheel(discordInterface);
    handlePlay(discordInterface);
};

// run the actual function that will start the bot
initialize();
