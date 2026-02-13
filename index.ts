import { DiscordInterface } from "./interfaces/discordInterface.ts";
import { handleYippee } from "./handlers/yippeeHandler.ts";
import { handleConnorQuote } from "./handlers/connorQuoteHandler.ts";
import { handleOtherQuote } from "./handlers/otherQuoteHandler.ts";

import { spawn } from "node:child_process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const initialize = (): void => {
    const discordInterface = new DiscordInterface();
    handleYippee(discordInterface);
    handleConnorQuote(discordInterface);
    handleOtherQuote(discordInterface);

    const controlPanelProcess = spawn("npm.cmd", ["run", "dev"], {
        cwd: path.join(import.meta.dirname, "control-panel"),
        shell: true,
    });

    process.on("exit", () => {
        controlPanelProcess.kill();
    });
};

// run the actual function that will start the bot
initialize();
