import { REST, Routes } from "discord.js";
import dotenv from "../dotenv.js";
import commands from "./commands/index.js";
import * as http from 'http'

await dotenv();

const commandData = commands.map(command => command.data.toJSON());
const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN!);

await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), { body: commandData });
console.log("Successfully deployed commands");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // No server logic here
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
