import { DiscordInterface } from "./interfaces/DiscordInterface.ts";
import { handleYippee } from "./handlers/yippeeHandler.ts";
import { handleConnorQuote } from "./handlers/connorQuoteHandler.ts";
import { handleOtherQuote } from "./handlers/otherQuoteHandler.ts";
import { ControlPanelInterface } from "./interfaces/ControlPanelInterface.ts";

const initialize = (): void => {
    const discordInterface = new DiscordInterface();
    handleYippee(discordInterface);
    handleConnorQuote(discordInterface);
    handleOtherQuote(discordInterface);

    const controlPanelInterface = new ControlPanelInterface(discordInterface);
};


// run the actual function that will start the bot
initialize();
