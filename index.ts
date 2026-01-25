import { DiscordInterface } from "./interfaces/discordInterface.ts";
import { handleYippee } from "./handlers/yippeeHandler.ts";
//import { handleQuote } from "./handlers/quoteHandler.ts"; //at some point when there is something to handle 
const initialize = (): void => {
    const discordInterface = new DiscordInterface();
    handleYippee(discordInterface);
    //handleQuote(discordInterface); //probably? I know nothing
};

// run the actual function that will start the bot
initialize();
