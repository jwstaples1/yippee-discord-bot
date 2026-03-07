import * as http from "node:http";
import * as path from "node:path";
import { type ChildProcess, spawn } from "node:child_process";
import { DiscordInterface } from "./DiscordInterface.ts";
import { Guild } from "discord.js";

export class ControlPanelInterface {
    private _controlPanelAppProcess: ChildProcess;
    private _httpServer: http.Server;
    private _discordInterface: DiscordInterface;

    public constructor(discordInterface: DiscordInterface) {
        const localhost = "127.0.0.1";
        const reactAppPort = 3000;
        const httpServerPort = 3001;

        this._discordInterface = discordInterface;

        // Run an HTTP server for the control panel to communicate with the bot itself
        this._httpServer = http.createServer((request, response) => {
            // set the CORS policy
            // response.setHeader("Access-Control-Allow-Origin", `http://${localhost}:${reactAppPort}`);
            // response.setHeader('Access-Control-Allow-Methods', 'GET, POST, UPDATE, OPTIONS');
            // response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            // if (request.method === 'OPTIONS') {
            //     response.writeHead(204);
            //     response.end();
            //     return;
            // }

            // handle any other requests
            this._handleRequest(request, response);
        });

        this._httpServer.listen(httpServerPort, localhost, () => {
            console.log(`http server running at ${localhost}:${httpServerPort}`);
        });

        // Start the control panel React app
        this._controlPanelAppProcess = spawn("npm.cmd", ["run", "dev", "--", "--port", String(reactAppPort)], {
            cwd: `${process.cwd()}\\control-panel`,
            shell: true
        });

        this._controlPanelAppProcess.on("error", () => {
            console.error("An error occured trying to start the control panel");
        })

        // When the bot process stops, make sure the react app and http server are also shut down
        process.on("exit", () => {
            this.shutdown();
        });
    }

    /** Shuts down the http server and control panel process */
    public shutdown() {
        this._httpServer.close();
        this._controlPanelAppProcess.kill();
    }

    private _handleRequest(request: http.IncomingMessage, response: http.ServerResponse) {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");

        if (request.url) {
            const incomingUrl = new URL(request.url, `http://${request.headers.host}`);
            const messageParam = incomingUrl.searchParams.get("message");

            if (messageParam)
                this._discordInterface.sendAStupidMessage(messageParam);
        }
        response.end("message sent");
    }
}